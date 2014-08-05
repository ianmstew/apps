var uuid = require( 'node-uuid' );
var async = require( 'async' );

module.exports = exports = {
	create: function( req, res ) {
		req.app.db.models.OAuthApp.create( 
			{
				name: 'New APINetwork App',
				clientId: uuid.v4(),
				clientSecret: uuid.v4(),
				owner: req.user._id
			},
			function( err, newApp ) {
				if( err )
					res.json( err.toString() );
				else
				{
					newApp.save( function( err, newApp ) {
						if( err )
							res.json( err.toString() );
						else
							res.json( newApp );
					});

				}
			}
		);
	},

	list: function( req, res ) {
		req.app.db.models.OAuthApp.find(
			{ owner: req.user._id },
			function( err, apps ) {
				if( err )
					res.json( err.toString() );
				else
					res.json( apps );
			}
		);
	},

	destroy: function( req, res ) {
		req.app.db.models.OAuthApp.remove( 
			{ 
				owner: req.user._id,
				_id: req.query.id
			},
			function( err, product ) {
				if( err )
					res.json( err.toString() );
				else
				{
					if( product > 0 )
						res.send( 200 );
					else
					{
						res.json( new Error( 'Not Found' ).toString() );
					}
				}
			}
		);
	},

	auth: function( req, res ) {
		if( !req.query.client_id )
			res.send( 400, "Missing client_id parameter" );
		else
		{
			req.app.db.models.OAuthApp.findOne( 
				{ clientId: req.query.client_id },
				function( error, clientApp ) {
					if( error )
						res.json( 400, error.toString() );
					else
					{
						if( clientApp )
						{
							req.app.db.models.OAuthToken.findOne( 
								{ clientId: req.query.client_id, user: req.user._id },
								function( error, token ) {
									if( error )
										res.send( 500, error );
									else
									{
										// No real approval to be done here - if you don't want to use this, don't sign up.
										if( token )
										{
											req.session[ 'apiNetworkToken' ] = token.token;
											req.session.save( function( error ) {
												if( error )
													res.send( 500, error.toString() );
												else
													res.redirect( '/oauth/app/subauth' );
											});
										}
										else
										{
											req.app.db.models.OAuthToken.create( 
												{
													token: uuid.v4(),
													clientId: req.query.client_id,
													user: req.user._id
												},
												function( err, newToken ) {
													if( err )
														res.json( err.toString() );
													else
													{
														newToken.save( function( err, newToken ) {
															if( err )
																res.json( err.toString() );
															else
															{
																// Put the apiNetworkToken in the session.
																req.session[ 'apiNetworkToken' ] = newToken.token;
																req.session.save( function( error ) {
																	if( error )
																		res.send( 500, error.toString() );
																	else
																		res.redirect( '/oauth/app/subauth' );
																});
															}
														});

													}
												}
											)
										}
									}
								}
							);
						}
						else
							res.send( 404, "Invalid client_id" );
					}
				}
			);
		}
	},

	authRemotes: function( req, res ) {
		req.app.db.models.OAuthToken.findOne( 
			{ token: req.session.apiNetworkToken },
			function( error, token ) {
				if( error )
					res.send( 500, error.toString() );
				else
				{
					if( token )
					{
						req.app.db.models.OAuthApp.findOne( 
							{ clientId: token.clientId },
							function( error, clientApp ) {
								if( error )
									res.send( 500, error.toString() );
								else if( clientApp )
								{

									req.app.db.models.ApiConnection.find( 
										{ app: clientApp._id },
										function( error, connections ) {
											if( error )
												res.send( 500, error.toString() );
											else
											{
												if( connections )
												{
													// Search through all the connections until we find one for which we have tokens.
													async.forEachSeries( connections, 
														function( connection, done ) {
															req.app.db.models.ApiTokens.findOne(
																{ 
																	user: req.user._id,
																	apiConnection: connection._id
																},
																function( error, tokens ) {
																	if( !tokens || 
																		( new Date().getTime() - tokens.timestamp ) > 30000 )
																	{
																		done( connection );
																	}
																	else
																	{
																		done();
																	}
																}
															);
														},
														function( unauthenticated ) {
															if( unauthenticated )
															{
																// Authenticate that one, its callback should send us to oauth/app/subauth/callback.
																req.session.apiNetworkCurrentRemote = unauthenticated._id;
																req.session.save( function( error ) {
																	if( error )
																		console.trace( error );

																	req.app.passport.authenticate( 'remote', {
																		type: unauthenticated.type,
																		clientApp: clientApp._id,
																		connectionData: unauthenticated.connectionData,
																		callback: '/oauth/app/subauth/callback'
																	} )( req, res );
																} );
															}
															else
															{
																// If we don't find any, send us to the calling application.
																res.send( "TODO: All APIs authenticated, go back to app callback, with token: " + req.session.apiNetworkToken );
															}
														}
													);
												}
												else
												{
													res.send( "TODO: No connected APIs, go back to app callback, with token: " + req.session.apiNetworkToken );
												}
											}
										}
									);
									// TODO: Get the list of data sources we need to authenticate with, and when we last authenticated.
									// Hit the next one that we haven't authenticated with in the last minute.
									// If we've got them all, then redirect to the app final callback.
								}
								else
									res.send( 404, "Token corresponds to nonexistent app." );
							}
						);
					}
					else
					{
						res.send( 400, "Invalid Token" );
					}
				}
			}
		);
	},

	remoteAuthCallback: function( req, res ) {

		// Check for existence of an API connection to help prevent abuse.
		req.app.db.models.ApiConnection.findOne( 
			{ _id: req.session.apiNetworkCurrentRemote },
			function( error, connection ) {
				if( error )
					res.send( 500, error.toString() );
				else
				{
					if( connection )
					{
						// See if we already have a token set for this connection.
						req.app.db.models.ApiTokens.findOne(
							{
								apiConnection: connection._id,
								user: req.user._id
							},
							function( error, tokens ) {
								if( error )
									res.send( 500, error.toString() );
								else
								{
									if( tokens )
									{
										tokens.timestamp = new Date().getTime(),
										tokens.tokenSet = req.session.apiNetworkCurrentRemoteTokens;
										tokens.save( function( error ) {
											if( error )
												res.send( 500, error.toString() );
											else
												res.redirect( '/oauth/app/subauth' );
										});
									}
									else
									{
										var tokenData = {
											apiConnection: connection._id,
											user: req.user._id,
											timestamp: new Date().getTime(),
											tokenSet: req.session.apiNetworkCurrentRemoteTokens
										}

										req.app.db.models.ApiTokens.create( 
											tokenData,
											function( error, tokens ) {
												if( error )
													res.send( 500, error.toString() );
												else
													tokens.save( function( error ) {
														if( error )
															res.send( 500, error.toString );
														else
															res.redirect( '/oauth/app/subauth' );
													});
											}
										);

									}
								}
							}
						);

					}
					else
					{
						res.send( 404, 'No connection found!: ' + req.session.apiNetworkCurrentRemote );
					}
				}
			}
		);

		
	}
};