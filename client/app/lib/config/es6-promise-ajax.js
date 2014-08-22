define(function (require) {
  var Backbone = require('backbone');

  Backbone.ajax = function () {
    var ajaxArgs = arguments;

    return new Promise(function (resolve, reject) {
      Backbone.$.ajax.apply(Backbone.$, ajaxArgs)
        .done(function ajaxResolved(data) {
          resolve(data);
        })
        .error(function ajaxRejected(jqXHR, status, error) {
          reject(new Error(error));
        });
    });
  };
});
