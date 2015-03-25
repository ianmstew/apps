define(function (require) {
  require('appstrap');
  var mocha = require('mocha');
  var chai = require('chai');
  var chaiAsPromised = require('chai-as-promised');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');

  var Radio = require('backbone.radio');
  var Logger = require('lib/util/logger');
  var debugRadio = require('lib/util/debug-radio');

  function setupTestHelpers() {
    before(function () {
      Logger.enable();
      debugRadio.enable();
      Radio.comply('notify', 'add:entityError', console.log.bind(console));
      Radio.comply('notify', 'add:userError', console.log.bind(console));
    });

    beforeEach(function () {
      this.sinon = sinon.sandbox.create();
      window.stub = _.bind(this.sinon.stub, this.sinon);
      window.spy  = _.bind(this.sinon.spy, this.sinon);
    });

    afterEach(function () {
      this.sinon.restore();
      delete window.stub;
      delete window.spy;
    });
  }

  window.expect = chai.expect;
  window.should = chai.should();
  window.sinon = sinon;

  mocha.setup('bdd');
  mocha.checkLeaks();
  mocha.globals(['stub', 'spy']);
  chai.use(sinonChai);
  chai.use(chaiAsPromised);
  chai.should();
  setupTestHelpers();

  require([
    'spec/api.js',
    'spec/services.js'
  ], function () {
    mocha.run();
  });
});
