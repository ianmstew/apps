'use strict'

exports = module.exports = function( app, mongoose ) {
	var serviceTokenSchema = new mongoose.Schema( {
		service: String,
		user: String,
		timestamp: Number,
		tokenSet: Object
	});

	serviceTokenSchema.index( { apiConnection: 1 } );
	serviceTokenSchema.index( { user: 1 } );

	serviceTokenSchema.set( 'autoIndex', ( app.get( 'env' ) === 'development' ));
	app.db.model( 'ServiceToken', serviceTokenSchema );
}