// TODO: Update to make consistent with server's method of saving services individually
// with app id's.
define(function (require) {
  var sinon = require('sinon');
  var server = sinon.fakeServer.create();
  var CONTENT_JSON = { 'Content-Type': 'application/json' };

  server.autoRespond = true;
  server.autoRespondAfter = 1000;
  server.xhr.useFilters = true;
  server.xhr.addFilter(function (method, url, async, user, pass) {
    var passThrough = !url.match('^/?api/users');
    if (!passThrough) console.log('Faking ' + method + ' on ' + url);
    return passThrough;
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
