// pwa-options.js
// Version 1.0.9 (2020-09-20)

'use strict';

const config   = require('../webpack.config');
const fs       = require('fs');

module.exports = {

   all_https: true,
   certificates: {
      // May have to update file permissions after certificate renewal;
      cert : fs.readFileSync('C:\\Certbot\\live\\home.schwanda.org\\cert.pem', 'utf8'),
      ca   : fs.readFileSync('C:\\Certbot\\live\\home.schwanda.org\\chain.pem', 'utf8'),
      key  : fs.readFileSync('C:\\Certbot\\live\\home.schwanda.org\\privkey.pem', 'utf8'),
   }, // certificates;
   compiler  : null,     // Null for production;
   config    : config,
   env       : {},
   port      : 10080,
   port_ssl  : 10443,

};
