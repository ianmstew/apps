'use strict';

exports = module.exports = function( app, mongoose ) {
	var apiConnectionSchema = new mongoose.Schema( {
		app: String,
		owner: String,
		type: String,
		connectionData: Object
	});

	apiConnectionSchema.index( { app: 1 } );
	apiConnectionSchema.index( { owner: 1 } );

	apiConnectionSchema.set( 'autoIndex', ( app.get( 'env' ) === 'development' ));
	app.db.model( 'ApiConnection', apiConnectionSchema );
}