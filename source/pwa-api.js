// source/api.js
// Version 1.0.9 (2020-09-20)

'use strict';

const log       = require('./pwa-log');

module.exports  = {

   api_response : function(request, response) {

      log.info('post:api:request.params=' + JSON.stringify(request.params), { email: (request.session && request.session.user ? request.session.user.email : '') });

      let route = (request.session && request.session.user) ? request.params.route : '401';

      switch (route) {

      case '401':
         response.status(401).send('unauthorized');
         break;

      case 'init':
         response.send({ route: 'init', home: '127.0.0.1' });
         break;

      case 'time':
         response.send({ route: 'time', time: new Date() });
         break;

      default:
         response.send({ route: '!bad', error: 'route "' + request.params.route + '" not supported' });

      }

   }, // api_response()

} // Class api;
