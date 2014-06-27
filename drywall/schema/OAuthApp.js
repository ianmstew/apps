'use strict';

exports = module.exports = function( app, mongoose ) {
	var oauthAppSchema = new mongoose.Schema( {
		name: String,
		clientId: { type: String, unique: true },
		clientSecret: { type: String },
		owner: Number
	});

	oauthAppSchema.index( { clientId: 1 }, { unique: true });
	oauthAppSchema.index( { owner: 1 } );

	oauthAppSchema.set('autoIndex', (app.get('env') === 'development'));
	app.db.model( 'OAuthApp', oauthAppSchema );
}