/* jshint -W030 */ // Ignore "expected assignment, saw expression"
define(function (require, exports, module) {
  var Radio = require('backbone.radio');
  var EditorService = require('modules/editor/editor.service');
  var ManagerService = require('modules/manager/manager.service');
  var testData = require('test/data/test-data');

  describe('Services', function () {

    describe('ManagerService', function () {
      var channel = Radio.channel('manager');
      var managerService = new ManagerService();
      var apps;
      var newApp;
      var originalAppsCount;
      managerService.start();

      it('Should return X apps.', function () {
        apps = channel.request('apps');
        return apps.syncing.then(function () {
          originalAppsCount = apps.size();
        });
      });

      it('Should create new app.', function () {
        var attrs = testData.apps[0];
        newApp = channel.request('new:app', attrs);
        should.not.exist(newApp.validationError);
        return newApp.syncing.then(function () {
          newApp.isNew().should.be.false;
        });
      });

      it('Should return X + 1 apps.', function () {
        apps = channel.request('apps');
        return apps.syncing.then(function () {
          apps.size().should.equal(originalAppsCount + 1);
        });
      });

      it('Should update new app.', function () {
        var updatedName = 'Updated name';
        var attrs = {
          name: updatedName
        };
        var updatedApp;
        channel.command('update:app', newApp.id, attrs);
        updatedApp = apps.get(newApp.id);
        should.not.exist(updatedApp.validationError);
        return updatedApp.syncing.then(function () {
          updatedApp.get('name').should.equal(updatedName);
        });
      });

      it('Should destroy new app.', function () {
        channel.command('destroy:app', newApp.id);
        should.not.exist(apps.get(newApp.id));
      });

      it('Should return X apps.', function () {
        apps = channel.request('apps');
        return apps.syncing.then(function () {
          apps.size().should.equal(originalAppsCount);
        });
      });
    });

    describe('EditorService', function () {
      var managerChannel = Radio.channel('manager');
      var channel = Radio.channel('editor');
      var editorService = new EditorService();
      var appId;
      var app;
      var services;
      var newService;
      editorService.start();

      it('Manager should create a new app.', function () {
        var attrs = testData.apps[0];
        var app = managerChannel.request('new:app', attrs);
        should.not.exist(app.validationError);
        return app.syncing.then(function () {
          appId = app.id;
        });
      });

      it('Should return an app with no ID', function () {
        app = channel.request('app');
        should.not.exist(app.id);
      });

      it('Should return 0 services.', function () {
        services = channel.request('services');
        return services.syncing.then(function () {
          services.size().should.equal(0);
        });
      });

      it('Should fail to create new service; no App ID set.', function () {
        var attrs = testData.services[0];
        channel.request.bind(channel, 'new:service', attrs)
          .should.throw(Error, /^Must set an App ID$/);
      });

      it('Should set an app ID', function () {
        channel.command('set:appId', appId);
        channel.request('appId').should.equal(app.id);
        return app.syncing;
      });

      it('Should create new service.', function () {
        // debugger;
        var attrs = testData.services[0];
        newService = channel.request('new:service', attrs);
        should.not.exist(newService.validationError);
        return newService.syncing.then(function () {
          newService.isNew().should.be.false;
        });
      });

      it('Should return 1 service.', function () {
        services.size().should.equal(1);
      });

      it('Should update new service.', function () {
        var updatedName = 'Updated name';
        var attrs = {
          name: updatedName
        };
        var updatedService;
        channel.command('update:service', newService.id, attrs);
        updatedService = services.get(newService.id);
        should.not.exist(updatedService.validationError);
        return updatedService.syncing.then(function () {
          updatedService.get('name').should.equal(updatedName);
        });
      });

      it('Should destroy new service.', function () {
        channel.command('destroy:service', newService.id);
        should.not.exist(services.get(newService.id));
      });

      it('Should return X services.', function () {
        services = channel.request('services');
        return services.syncing.then(function () {
          services.size().should.equal(0);
        });
      });

      it('Should destroy new app.', function () {
        managerChannel.command('destroy:app', appId);
        return app.fetch().should.be.rejected;
      });
    });
  });
});
