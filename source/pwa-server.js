'use strict'; // pwa-server.js

const express = require('express');
const helmet  = require('helmet')
const http    = require('http');
const https   = require('https');
const path    = require('path');
const session = require('express-session');
const storage = require('memorystore')(session);

const api     = require('./pwa-api');
const auth0   = require('./pwa-auth0');
const log     = require('./pwa-log');
const options = require('./pwa-options');

const app     = express();

function server(app) {

   const serve_index = function(request, response, next) {
      if (!options.compiler) {
         response.sendFile(path.join(__dirname + '/../public/index.html'));
      } else {
         var filename = path.join(options.compiler.outputPath, 'index.html');
         options.compiler.outputFileSystem.readFile(
            filename, 
            (error, result) => {
               if (error) return(next(error));
               response.set('content-type','text/html');
               response.send(result);
               response.end();
            }
         );
      }
   } // serve_index();

   // Redirect all non-https to https - MUST be "used" first to catch all redirects;
   if (options.all_https && options.port_ssl) {
      app.use(
         (request, response, next) => {
            if (request.secure) {
               next();
            } else {
               response.redirect('https://' + request.headers.host + request.url);
            }
         }
      );
   }

   if (process.env.NODE_ENV !== 'production') {

      process.env.NODE_ENV = 'development';

      options.env = {
         NODE_ENV: process.env.NODE_ENV, 
         port: options.port, 
         REACT_APP_TITLE: process.env.REACT_APP_TITLE, 
      }

      const middle     = require('webpack-dev-middleware');
      const webpack    = require('webpack');
      options.compiler = webpack(options.config(options.env));

      app.use(middle(options.compiler, {}));

   } // ENDIF (process.env.NODE_ENV !== 'production');

   app.use(express.static('public'));

   app.use(helmet.hidePoweredBy());

   app.use(
      session(
         {
            cookie: { 
               maxAge: 86400000,
               secure: true,
            },
            resave: false, 
            saveUninitialized: true,
            secret: 'keyboard cat',
            store: new storage(
               {
                  checkPeriod: 86400000,
               }
            ),
         }
      )
   );

   app.use(log.morgan('err'));

   app.use(log.morgan('all'));

   app.get(
      '/auth0', 
      (request, response, next) => auth0.auth0_response(request, response, next, serve_index)
   ); // /auth0;

   app.get(
      '/login', 
      (request, response, next) => response.send(auth0.login_response())
   ); // /login;

   app.get(
      '/logout', 
      (request, response, next) => {
         if (request.session && request.session.user) {
            request.session.destroy();
            response.send(auth0.logout_response());
         } else {
            serve_index(request, response, next);
         }
      }
   ); // /logout;

   app.get(
      '*', 
      (request, response, next) => serve_index(request, response, next)
   ); // *

   app.post(
      '/api/:route/:arg1?', 
      (request, response, next) => api.api_response(request, response)
   ); // /api/:route:arg1?

   const connect = function(transport, port, error) {
      var message = transport.globalAgent.protocol.replace(':', '').padEnd(5, '-')
         + '-server-running-on-port-' + port;
      if (error) {
         log.error(message + ':error:' + error.code);
      } else {
         log.info(message);
      }
   } // connect();

   if (options.port) {
      http.createServer(app)
         .on('error', (error) => connect(http, options.port, error))
         .listen(options.port, (error) => connect(http, options.port, error))
         ;
   }

   if (options.port_ssl) {
      https.createServer(options.certificates, app)
         .on('error', (error) => connect(https, options.port_ssl, error))
         .listen(options.port_ssl, (error) => connect(https, options.port_ssl, error))
         ;
   }

} // server();

server(app);
