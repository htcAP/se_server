'use strict';

var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};



SwaggerRestify.create(config, function(err, swaggerRestify) {
  if (err) { throw err; }

  var port = process.env.PORT || 10010;

  app.get(/\/apidoc\/.+/, restify.serveStatic({
    directory: __dirname + '/'
  }));

  app.get(/\/swagger.yaml/, restify.serveStatic({
    directory: __dirname + '/api/swagger'
  }));

  swaggerRestify.register(app);

  app.use(
      function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
      }
  );

  app.listen(port);
});
