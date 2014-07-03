var uuid = require( 'node-uuid' );

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
											res.redirect( '/oauth/app/subauth?token=' + token.token );
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
																res.redirect( '/oauth/app/subauth?token=' + newToken.token );
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
		console.log( req.query );
		req.app.db.models.OAuthToken.findOne( 
			{ token: req.query.token },
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
									res.send( 500, "Unimplemented, authenticate remote data sources for app: " + clientApp.clientId );

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
	}
};