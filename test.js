var path = require('path');
var assert = require('assert');
var pkg = require('xtuple-api/package');
var DiscoveryDocument = require('google-discovery-document');

describe('sails-google-discovery-doc', function () {
  var log = console.log;
  var error = console.error;
  console.log = function () { };
  console.error = function () { };
  process.chdir(path.dirname(require.resolve('xtuple-api')));
  var api = require('xtuple-api');

  var SailsDiscovery = require('./');

  before(function (done) {
    this.timeout(10000);

    var interval = setInterval(function () {
      if (global.sails) {
        sails.config.log.level = 'error';
        clearInterval(interval);
        global.sails.once('lifted', function () {
          console.log = log;
          console.error = error;
          done();
        });
      }
    }, 0);

  });

  describe('#createRestDescription', function () {
    var doc;

    before(function () {
      doc = SailsDiscovery.createRestDescription(sails, pkg);
    });

    it('should pass google-discovery-document validation', function () {
      assert(DiscoveryDocument.validate(doc));
    });

  });

  describe('#createDirectoryList', function () {

  });

});