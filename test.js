var path = require('path');
var assert = require('assert');
var pkg = require('xtuple-api/package');
var DiscoveryDocument = require('google-discovery-document');
var rigger = require('sails-rigged');

describe('sails-google-discovery-doc', function () {
  var SailsDiscovery = require('./');
  var sails;

  before(function (done) {
    this.timeout(10000);

    rigger.lift('xtuple-api', function (_sails) {
      sails = _sails;
      done();
    });
  });

  describe('#createRestDescription', function () {
    var doc;

    before(function () {
      doc = SailsDiscovery.createRestDescription(sails, pkg);
    });

    it('should pass google-discovery-document validation', function () {
      assert(DiscoveryDocument.validate(doc.data));
    });
  });
});
