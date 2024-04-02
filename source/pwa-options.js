'use strict'; // pwa-options.js

const config   = require('../webpack.config');
const fs       = require('fs');

const path     = false; // Or some path;

module.exports = {

   all_https: false,
   certificates: {
      // May have to update file permissions after certificate renewal;
      cert : path ? fs.readFileSync(path + '/cert.pem', 'utf8')    : null,
      ca   : path ? fs.readFileSync(path + '/chain.pem', 'utf8')   : null,
      key  : path ? fs.readFileSync(path + '/privkey.pem', 'utf8') : null,
   }, // certificates;
   compiler  : null,     // Null for production;
   config    : config,
   env       : {},
   port      : 3000,
   port_ssl  : false,  // Or some port number if SSL active;

};
