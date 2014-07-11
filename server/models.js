'use strict';

exports = module.exports = function(app, mongoose) {
  //embeddable docs first
  require('./schema/Note')(app, mongoose);
  require('./schema/Status')(app, mongoose);
  require('./schema/StatusLog')(app, mongoose);
  require('./schema/Category')(app, mongoose);

  //then regular docs
  require('./schema/User')(app, mongoose);
  require('./schema/Admin')(app, mongoose);
  require('./schema/AdminGroup')(app, mongoose);
  require('./schema/Account')(app, mongoose);
  require('./schema/LoginAttempt')(app, mongoose);

  // Things we added to Drywall
  require( './schema/OAuthApp' )( app, mongoose );
  require( './schema/OAuthToken' )( app, mongoose );
  require( './schema/ApiConnection' )( app, mongoose );
  require( './schema/ApiTokens')( app, mongoose );
};
