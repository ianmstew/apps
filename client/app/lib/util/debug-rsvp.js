define(function (require) {
  var RSVP = require('rsvp');

  RSVP.on('error', function (error) {
    throw error;
  });
});
