'use strict';

var _ = require('lodash');
var methodMap = {
  create: 'POST',
  read: 'GET',
  update: 'PUT',
  delete: 'DELETE',
  list: 'GET'
};

function preamble (sails, pkg) {
  var prefix = sails.config.blueprints.prefix;

  return {
    kind: 'discovery#restDescription',
    etag: '',
    discoveryVersion: 'v' + pkg.version,
    id: pkg.name + ':' +  pkg.version,
    revision: '0',
    title: pkg.name,
    description: pkg.description,
    icons: {
      x16: pkg.favicon
    },
    documentationLink: pkg.homepage,
    protocol: 'rest',
    rootUrl: sails.getBaseUrl(),
    baseUrl: sails.getBaseUrl() + prefix,
    basePath: prefix,
    batchPath: prefix
  };
}

function parameters (sails, pkg) {
  return {

  };
}

function auth (sails, pkg) {
  return {

  };
}

function schemas (sails, pkg) {
  return _.object(_.keys(sails.models), _.map(sails.models, function (model, name) {
    return {
      id: name,
      type: 'object',
      properties: model.definition
    };
  }));
}

function resources (sails, pkg) {
  var prefix = sails.config.blueprints.prefix;

  return _.object(_.keys(sails.controllers), _.map(sails.controllers, function (controller, name) {
    return {
      methods: {
        create: resourceMethod('create', controller, prefix),
        read: resourceMethod('read', controller, prefix),
        update: resourceMethod('update', controller, prefix),
        delete: resourceMethod('delete', controller, prefix),
        list: resourceMethod('list', controller, prefix)
      }
    };
  }));
}

function resourceMethod (method, controller, prefix) {
  return {
    id: controller.identity + '.' + method,
    path: methodPath(method, prefix, controller),
    httpMethod: methodMap[method],
    description: methodDescription(method, controller),
    parameters: methodParameters(method, controller),
  };
}

function methodParameters (method, controller) {
  var idParam = {
    type: 'string',
    location: 'path'
  };
  return {
    create: { },
    read: { id: idParam },
    update: { id: idParam },
    delete: { id: idParam },
    list: { }
  }[method];
}

function methodDescription (method, controller) {
  return controller.identity + ' ' + method;
}

function methodPath (method, prefix, controller) {
  var suffix = {
    create: '', list: '', read: '/{id}', update: '/{id}', delete: '/{id}'
  };
  return prefix + '/' + controller.identity + suffix[method];
}

module.exports = function createRestDescription (sails, pkg) {
  return _.extend(preamble(sails, pkg), {
    parameters: parameters(sails, pkg),
    auth: auth(sails, pkg),
    schemas: schemas(sails, pkg),
    resources: resources(sails, pkg)
  });
};
