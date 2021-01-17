// pwa-secrets-formats.js
// Version 1.0.9 (2020-09-20)

// Actual secret keys and values, should not be commited to repository, but this file can;

'use strict';

const fs       = require('fs');

module.exports = {

   auth0 : {
      api          : 'https://domain.com/api',
      client_id    : 'xyz',
      domain       : 'xyz.auth0.com',
      redirect_out : 'https://domain.com/something',
      redirect_uri : 'https://domain.com/something',
      state        : 'some-state',
   },

   smtp : {
      username : string,
      password : string,
   }, // smtp;

   users : [ { email: 'abc', role: 'user' }, ], // Array of user's email in lower case and role objects;

};
