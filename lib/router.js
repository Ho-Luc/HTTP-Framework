'use strict'

var Router = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'DELETE': {}
  }
}

Router.prototype.get = function(route, cb) {
  this.routes.GET[route] = cb;
}

Router.prototype.post = function(route, cb) {
  this.routes.POST[route] = cb;
}

Router.prototype.put = function(route, cb) {
  this.routes.PUT[route] = cb;
}

Router.prototype.delete = function(route, cb) {
  this.routes.DELETE[route] = cb;
}

Router.prototype.route = function(req, res) {
  return (req, res) => {
    var routeFunction = this.routes[req.method][req.url];
    routeFunction(req, res);
  }
}
