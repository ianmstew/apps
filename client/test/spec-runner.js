define(function (require) {
  // Prepare app environment
  require('appstrap');
  require('test/util/fake-server');

  var mocha = require('mocha'),
      chai = require('chai'),
      chaiJquery = require('chai-jquery'),
      chaiAsPromised = require('chai-as-promised'),
      sinon = require('sinon'),
      sinonChai = require('sinon-chai');

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
