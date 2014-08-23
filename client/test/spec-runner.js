define(function (require) {
  require('appstrap');
  require('test/util/fake-server');
  var mocha = require('mocha');
  var chai = require('chai');
  var chaiJquery = require('chai-jquery');
  var chaiAsPromised = require('chai-as-promised');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');

  function setupTestHelpers() {
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
  chai.use(chaiJquery);
  chai.use(sinonChai);
  chai.use(chaiAsPromised);
  chai.should();
  setupTestHelpers();

  require([
    'spec/api.js',
    'spec/entities.js'
  ], function () {
    mocha.run();
  });
});
