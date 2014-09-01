define(function (require) {
  var Radio = require('backbone.radio');
  var EntitiesModule = require('entities/entities.module');
  // var UserModel = require('entities/user/user.model');
  // var AppModel = require('entities/app/app.model');
  var AppCollection = require('entities/app/apps.collection');

  describe('Entities', function () {
    var entitiesChannel = Radio.channel('entities');
    var entities = new EntitiesModule();
    entities.start();

    describe('Apps', function () {
      it('Request "fetch:apps" should eventually resolve to a collection', function () {
        return entitiesChannel.request('fetch:apps')
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
