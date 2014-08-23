define(function (require) {
  var Apps = require('modules/entities/app/apps.collection');
  var App = require('modules/entities/app/app.model');
  var User = require('modules/entities/user/user.model');
  var apiData = require('test/data/api-data');

  describe('API', function () {

    describe('Apps', function () {
      var app1 = new App(apiData.apps[0]);
      var app2 = new App(apiData.apps[1]);
      var app1Id;
      var app2Id;
      var startingAppsCount;

      it('Get all apps', function () {
        var apps = new Apps();

        return apps.fetch().then(function (data) {
          startingAppsCount = apps.size();
        });
      });

      it('Create app1', function () {
        return app1.save().then(function (attrs) {
          app1Id = app1.get('_id');
          should.exist(app1Id);
        });
      });

      it('Create app2', function () {
        return app2.save().then(function (attrs) {
          app2Id = app1.get('_id');
          should.exist(app2Id);
        });
      });

      it('Get all apps should return 2 additional', function () {
        var apps = new Apps();

        return apps.fetch().then(function (data) {
          apps.size().should.equal(startingAppsCount + 2);
        });
      });

      it('Update app1', function () {
        var newName = 'App one updated';
        var appData = _.extend({}, apiData.apps[0], {
          _id: app1.get('_id'),
          name: newName
        });
        var app = new App(appData);

        return app.save().then(function (data) {
          data.name.should.equal(newName);
        });
      });

      it('Get all apps should return unchanged number of apps', function () {
        var apps = new Apps();

        return apps.fetch().then(function (data) {
          apps.size().should.equal(startingAppsCount + 2);
        });
      });

      it('Get app1', function () {
        var apps = new App({
          _id: app1.get('_id')
        });

        return apps.fetch().should.be.fulfilled;
      });

      it('Delete app1', function () {
        return app1.destroy().should.be.fulfilled;
      });

      it('Delete app2', function () {
        return app2.destroy().should.be.fulfilled;
      });

      it('Get app1 should fail', function () {
        var app = new App({
          _id: app1Id
        });

        return app.fetch().should.be.rejected;
      });

      it('Get all apps should return original number of apps', function () {
        var apps = new Apps();

        return apps.fetch().then(function (data) {
          apps.size().should.equal(startingAppsCount);
        });
      });
    });

    describe('User', function () {

      it('Get current user', function () {
        var user = new User();

        return user.fetch({ url: '/api/users/current' }).should.be.fulfilled;
      });
    });
  });
});
