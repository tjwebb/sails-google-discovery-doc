'use strict';

var path = require('path');
var assert = require('assert');
var pkg = require('xtuple-api/package');
var SailsApp = require('sails').Sails;
var DiscoveryDocument = require('google-discovery-document');

describe('sails-google-discovery-doc', function () {
  var SailsDiscovery = require('./');
  var app = new SailsApp();
  var config = {
    appPath: path.dirname(require.resolve('xtuple-api')),
    hooks: {
      grunt: false
    }
  };

  before(function (done) {
    this.timeout(10000);

    app.load(config, function (error, sails) {
      app = sails;
      done();
    });
  });

  describe('#createRestDescription', function () {
    var doc;

    before(function () {
      doc = SailsDiscovery.createRestDescription(app, pkg);
    });

    it('should pass google-discovery-document validation', function () {
      assert(DiscoveryDocument.validate(doc.data));
    });
  });
});
