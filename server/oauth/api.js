module.exports = exports = {
	connect: function( req, res ) {
		try {
			if( req.query.app && req.query.type )
			{
				var data = {
					app: req.query.app,
					owner: req.user._id,
					type: req.query.type
				};
				if( req.query.connectionDataJson )
					data.connectionData = JSON.parse( connectionDataJson );

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