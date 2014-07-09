module.exports = exports = {
	connect: function( req, res ) {
		try {
			if( req.body.app && req.body.type )
			{
				var data = {
					app: req.body.app,
					owner: req.user._id,
					type: req.body.type
				};
				if( req.body.connectionData )
					data.connectionData = req.body.connectionData;

				req.app.db.models.ApiConnection.create( 
					data,
					function( error, newApiConnection ) {
						if( error )
							res.send( 500, err.toString() );
						else
						{
							newApiConnection.save( function( error, newApiConnection ) {
								if( error )
									res.send( 500, error.toString );
								else
									res.json( newApiConnection );
							});
						}
					}
				);

			}
			else
				res.send( 400, "Must include both app ID and connection type" );

		} catch( error ) {
			res.json( 500, error.toString() );
		}
	},

	update: function( req, res ) {
		try {
			if( req.body.app && req.body.type )
			{
				var data = {
					_id: req.body._id,
					app: req.body.app,
					owner: req.user._id,
					type: req.body.type
				};
				if( req.body.connectionData )
					data.connectionData = req.body.connectionData;

				req.app.db.models.ApiConnection.update( 
				{ 
					_id: data._id,
					owner: data.owner
				},
				data,
				function( error, numberAffected ) {
					if( error )
						res.send( 500, error.toString() );
					else
					{
						if( numberAffected == 1 )
							res.json( data );
						else
							res.json( 404 );
					}
				} );
			}
		} catch( error ) {

		}
	},

	list: function( req, res ) {
		if( req.query.id )
		{
			req.app.db.models.ApiConnection.find( 
				{ 
					owner: req.user._id,
					app: req.query.id
				},
				function( error, connections ) {
					if( error )
						res.send( 500, error.toString() );
					else
						res.json( connections );
				}
			);
		}
		else
			res.send( 400, "App ID not specified." );
	},

	disconnect: function( req, res ) {
		if( req.query.id )
		{
			req.app.db.models.ApiConnection.remove(
				{
					owner: req.user._id,
					_id: req.query.id
				},
				function( error, product ) {
					if( error )
						res.send( 500, error.toString() );
					else
					{
						if( product > 0 )
							res.send( 200 );
						else
							res.send( 404 );
					}
				}
			);
		}
		else
			res.send( 400, "Connection ID not specified" );

	}
}