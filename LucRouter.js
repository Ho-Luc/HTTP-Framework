'use strict'

var http = require('http');
var Router = require(__dirname + '/lib/router');

module.exports = function() {
  var router = new Router();
  router.listen = function(port, cb) {
    http.createServer(router.route()).listen(port, cb);
  }
  return router
}
