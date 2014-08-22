define(function (require) {
  var EntitiesModule = require('modules/entities/entities.module'),
      // UserModel = require('modules/entities/user/user.model'),
      // AppModel = require('modules/entities/app/app.model'),
      AppCollection = require('modules/entities/app/apps.collection'),
      channels = require('channels');

  describe('Entities', function () {
    var entities = new EntitiesModule();
    entities.start();

    describe('Apps', function () {
      it('Request should immediately return a collection', function () {
        return channels.entities.request('apps')
          .should.be.an.instanceOf(AppCollection);
      });

      it('Request with {fetch:true} should eventually resolve to a collection', function () {
        return channels.entities.request('apps', { fetch: true })
          .should.eventually.be.an.instanceOf(AppCollection);
      });

      // it('Create app', function (done) {
      //   function fetchedApps(apps) {
      //     var app = apps.create({});
      //     apps.once('sync', function () {
      //       console.log('synced!', app);
      //     });
      //   }
      //   channels.entities.request('fetch:apps')
      //     .then(fetchedApps, _.partial(fetchFailed, done));
      // });
    });

    // describe('Current User', function () {
    //   function fetchFailed(done) {
    //     done(new Error('Fetch failed'));
    //   }

    //   it('Fetch user', function (done) {
    //     function fetchedUser(user) {
    //       user.should.be.an.instanceOf(UserModel);
    //     }
    //     channels.entities.request('fetch:user')
    //       .then(fetchedUser, _.partial(fetchFailed, done));
    //   });
    // });
  });
});
