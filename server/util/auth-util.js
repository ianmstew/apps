var authUtil = {

  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.set('X-Auth-Required', 'true');
    req.session.returnUrl = req.originalUrl;
    res.redirect('/login/');
  },

  ensureAdmin: function (req, res, next) {
    if (req.user.canPlayRoleOf('admin')) {
      return next();
    }
    res.redirect('/');
  },

  ensureAccount: function (req, res, next) {
    if (req.user.canPlayRoleOf('account')) {
      if (req.app.config.requireAccountVerification
          && req.user.roles.account.isVerified !== 'yes'
          && !/^\/account\/verification\//.test(req.url)) {
        return res.redirect('/account/verification/');
      }
      return next();
    }
    res.redirect('/');
  }
};

module.exports = authUtil;
