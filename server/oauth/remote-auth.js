var FacebookStrategy = require( 'passport-facebook' ).Strategy;

module.exports = exports = {
	strategies: function( passport ) {

/*		TODO: I think we need a wrapper strategy here which will load 
		      strategies on the fly to passport and call them appropriately
		      (since each app has its own set of tokens for each API).

		passport.use( 'facebook', new FacebookStrategy( 
			{
				clientID: TokenStore.tokens.facebook.clientID,
				clientSecret: TokenStore.tokens.facebook.clientSecret,
		    	callbackURL: "http://local.apinetwork.co:3000/oauth/callback/facebook",
		    	enableProof: false,
		    	passReqToCallback: true
			},
			function( req, accessToken, refreshToken, profile, done ) {
				// Need to get the original user here, so we can add our new item to the session.
				var allUserData = req.user ? req.user : {};
				allUserData[ 'facebook' ] = {
					owner: 'facebook:' + profile.id,
					accessToken: accessToken
				};
				console.trace( '** Facebook strategy!' );
				return done( null, allUserData );
			}
		));*/

	  passport.use( 'remote', new ( require( 'multi-passport' ).Strategy )( 
	    function( username, password, done ) {
	      return done( new Error( 'Unimplemented' ) );
	    }
	  )); 
	},

	callbacks: function( passport, app ) {
		// TODO: 
		app.get( '/oauth/callback/facebook',
			passport.authenticate( 'facebook', { failureRedirect: '#auth-failure' } ),
			function( req, res ) {
				if( req.session[ 'auth-return' ] )
					res.redirect( req.session[ 'auth-return' ]);
				else
					res.redirect( '/' );
			}
		);

	}
}