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
		)
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
	}
};