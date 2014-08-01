'use strict'

exports = module.exports = function( app, mongoose ) {
	var apiTokensSchema = new mongoose.Schema( {
		apiConnection: String,
		user: String,
		timestamp: Number,
		tokenSet: Object
	});

	apiTokensSchema.index( { app: 1 } );
	apiTokensSchema.index( { user: 1 } );

	apiTokensSchema.set( 'autoIndex', ( app.get( 'env' ) === 'development' ));
	app.db.model( 'ApiTokens', apiTokensSchema );
}