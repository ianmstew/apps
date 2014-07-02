define(function (require) {
  var Module = require('lib/module/module'),
      AppmgrController = require('modules/appmgr/appmgr.controller');

  var AppmgrModule = Module.extend({
    moduleControllerClass: AppmgrController
  });

  var appmgr = require('app').module('appmgr', AppmgrModule);
  return appmgr;
});
