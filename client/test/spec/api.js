define(function (require, exports, module) {
  var Apps = require('entities/app/apps');
  var App = require('entities/app/app');
  var User = require('entities/user/user');
  var testData = require('test/data/test-data');
  var logger = require('lib/util/logger')(module);

  describe('API', function () {

    describe('Apps', function () {
      var app1 = new App(testData.apps[0], { parse: true });
      var app2 = new App(testData.apps[1], { parse: true });
      var startingAppsCount;
      var app1Id;
      var app2Id;

      it('Get all should return X apps.', function () {
        var apps = new Apps();

        return apps.fetch().then(function (attrs) {
          startingAppsCount = apps.size();
        });
      });

      it('Create app1 should succeed.', function () {
        return app1.save().then(function (attrs) {
          app1Id = app1.get('_id');
          should.exist(app1Id);
        });
      });

      it('Create app2 should succeed.', function () {
        return app2.save().then(function (attrs) {
          app2Id = app1.get('_id');
          should.exist(app2Id);
        });
      });

      it('Get all should return X + 2 apps.', function () {
        var apps = new Apps();

        return apps.fetch().then(function (attrs) {
          apps.size().should.equal(startingAppsCount + 2);
        });
      });

      it('Update app1 name should succeed.', function () {
        var newName = 'App one updated';
        var attrs = {
          _id: app1.get('_id'),
          name: newName
        };
        var app = new App(attrs);

        return app.save().then(function (attrs) {
          attrs.name.should.equal(newName);
        });
      });

      it('Get all apps should return X + 2 apps (unchanged).', function () {
        var apps = new Apps();

        return apps.fetch().then(function (attrs) {
          apps.size().should.equal(startingAppsCount + 2);
        });
      });

      it('Get app1 should succeed.', function () {
        var apps = new App({
          _id: app1.get('_id')
        });

        return apps.fetch().should.be.fulfilled;
      });

      it('Destroy app1 should succeed.', function () {
        return app1.destroy().should.be.fulfilled;
      });

      it('Destroy app2 should succeed.', function () {
        return app2.destroy().should.be.fulfilled;
      });

      it('Get app1 should fail, because it was deleted.', function () {
        var app = new App({
          _id: app1Id
        });

        return app.fetch().should.be.rejected;
      });

      it('Get all apps should once again return X apps.', function () {
        var apps = new Apps();

        return apps.fetch().then(function (attrs) {
          apps.size().should.equal(startingAppsCount);
        });
      });
    });

    describe('Services', function () {
      var app = new App(testData.apps[0], { parse: true });
      var services = app.services;
      var service1;
      var service2;
      var service1Id;
      var service2Id;

      it('Create parent app should succeed.', function () {
        return app.save().then(function (attrs) {
          should.exist(app.get('_id'));
        });
      });

      it('Newly created parent app should contain 0 nested services.', function () {
        services.size().should.equal(0);
      });

      it('Standalone services fetch should maintain 0 services', function () {
        return services.fetch().then(function () {
          services.size().should.equal(0);
        });
      });

      it('Create service1 should succeed.', function () {
        var promise = new Promise(function (resolve, reject) {
          service1 = services.create(testData.services[0]);
          service1.once('sync', resolve);
        });

        return promise.then(function () {
          service1Id = service1.get('_id');
          should.exist(service1Id);
        }).catch(logger.error.bind(logger));
      });

      it('Create service2 should succeed.', function () {
        var promise = new Promise(function (resolve, reject) {
          service2 = services.create(testData.services[0]);
          service2.once('sync', resolve);
        });

        return promise.then(function () {
          service2Id = service2.get('_id');
          should.exist(service2Id);
        }).catch(logger.error.bind(logger));
      });

      it('Parent app should contain 2 services.', function () {
        return services.fetch().then(function (attrs) {
          services.size().should.equal(2);
        });
      });

      it('Update service1 type should succeed.', function () {
        var originalSize = services.size();
        var newType = 'gmail';
        var attrs = {
          _id: service1Id,
          type: newType
        };
        var service = services.set(attrs, { remove: false });

        return service.save().then(function () {
          services.size().should.equal(originalSize);
          services.get(service1Id).get('type').should.equal(newType);
        });
      });

      it('Destroy service1 should succeed.', function () {
        return services.get(service1).destroy().should.be.fulfilled;
      });

      it('Parent app fetch should reflect 1 nested service.', function () {
        return app.fetch().then(function () {
          services.size().should.equal(1);
        });
      });

      it('Standalone services fetch should maintain 1 service', function () {
        return services.fetch().then(function () {
          services.size().should.equal(1);
        });
      });

      it('Destroy parent app should succeed.', function () {
        return app.destroy().should.be.fulfilled;
      });

      it('Services should be empty, because app is deleted.', function () {
        return services.size().should.equal(0);
      });

      it('Standalone services fetch should maintain 0 services', function () {
        return services.fetch().then(function () {
          services.size().should.equal(0);
        });
      });
    });

    describe('User', function () {

      it('Get current user', function () {
        var user = new User();
        return user.fetch().should.be.fulfilled;
      });
    });
  });
});
