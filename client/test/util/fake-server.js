// TODO: Update to make consistent with server's method of saving services individually
// with app id's.
define(function (require) {
  var sinon = require('sinon');
  var database = require('test/data/database');

  var server = sinon.fakeServer.create();
  var CONTENT_JSON = { 'Content-Type': 'application/json' };
  var lastAppId = 0;

  server.autoRespond = true;
  server.autoRespondAfter = 1000;
  server.xhr.useFilters = true;
  server.xhr.addFilter(function (method, url, async, user, pass) {
    var passThrough = !url.match('^/?api/');
    if (!passThrough) console.log('Faking ' + method + ' on ' + url);
    return passThrough;
  });

  server.respondWith('GET', '/api/apps', function (xhr) {
    var apps = _.filter(database.apps, function (app) {
      return !!app;
    });
    var response = JSON.stringify(apps);
    xhr.respond(200, CONTENT_JSON, response);
  });

  server.respondWith('POST', '/api/apps', function (xhr) {
    var app = JSON.parse(xhr.requestBody);
    var response;
    app._id = ++lastAppId;

    database.apps.push(app);

    response = JSON.stringify(app);
    xhr.respond(200, CONTENT_JSON, response);
  });

  server.respondWith('PUT', /\/api\/apps\/(\d)/, function (xhr, appId) {
    var app = JSON.parse(xhr.requestBody);
    var response;

    database.apps[appId - 1] = app;

    response = JSON.stringify(database.apps[appId - 1]);
    xhr.respond(200, CONTENT_JSON, response);
  });

  server.respondWith('DELETE', /\/api\/apps\/(\d)/, function (xhr, appId) {
    var app = database.apps[appId - 1];
    var response;

    if (app) {
      delete database.apps[appId - 1];
      response = JSON.stringify(app);
      xhr.respond(200, CONTENT_JSON, response);
    } else {
      xhr.respond(404);
    }
  });

  server.respondWith('GET', /\/api\/apps\/(\d)/, function (xhr, appId) {
    var app = database.apps[appId - 1];
    var response;

    if (app) {
      response = JSON.stringify(app);
      xhr.respond(200, CONTENT_JSON, response);
    } else {
      xhr.respond(404);
    }
  });

  server.respondWith('GET', '/api/users/current', function (xhr) {
    var user = {
      _id: 1,
      name: 'Ian',
      avatar: 'http://placekitten.com/g/50/50',
      email: 'ian@apinetwork.co'
    };
    var response = JSON.stringify(user);
    xhr.respond(200, CONTENT_JSON, response);
  });
});
