'use strict'; // source/auth0.js

const crypto     = require('crypto');
const jwt_decode = require('jwt-decode');
const request2   = require('request');

const log        = require('./pwa-log');
const secrets    = require('./pwa-secrets');

module.exports   = {

   auth0_response : function(request, response, next, serve_index) {

      log.info('auth0:request.query=' + JSON.stringify(request.query), { email: (request.session && request.session.user ? request.session.user.email : '') });

      var options = {
         form: {
            client_id: secrets.auth0.client_id,
            code: request.query.code,
            code_verifier: this.verifier,
            grant_type: 'authorization_code',
            redirect_uri: secrets.auth0.redirect_uri
         },
         headers: {'content-type': 'application/x-www-form-urlencoded'},
         json: true,
         method: 'POST',
         url: 'https://' + secrets.auth0.domain + '/oauth/token',
      };

      request2(
         options, 
         (error, response2, body) => {
            if (error) throw new Error(error);

            // console.log('body=', body);

            // Need to validate;
            let id_token = body.id_token;

            // console.log('id_token=', id_token);

            if (id_token) {
               let profile = jwt_decode(id_token);
               log.info('auth0:client_id  =' + secrets.auth0.client_id);
               log.info('auth0:profile.aud=' + profile.aud);
               if (secrets.auth0.client_id != profile.aud) log.error('auth0:cleint_id!=profile.aud');
               // Make other safety checks;
               // User is authenticate, now need to authorize;

               // console.log('profile=', profile);
               const email = profile.email.toLowerCase();

               for (let user_index = 0; user_index < secrets.users.length; user_index++) {
                  let user = secrets.users[user_index];
                  if (email == user.email) {
                     request.session.user = user;
                     break;
                  }
               }

               log.info('auth0:request.session=' + JSON.stringify(request.session));

            }

            serve_index(request, response, next);

         }
      );

   }, // auth0_response()

   base_64_url_encode : function(string) {

      return(
         string.toString('base64')
               .replace(/\+/g, '-')
               .replace(/\//g, '_')
               .replace(/=/g, '')
      );

   }, // base_64_url_encode();

   init : function() {

      this.verifier  = this.base_64_url_encode(crypto.randomBytes(32));

      this.challenge = this.base_64_url_encode(this.sha256(this.verifier));

   }, // constructor();

   login_response : function() {

      return(
         `<!doctype html>` +
         `<html lang="en">` +
         `<head>` +
         `<meta charset="utf-8">` +
         `<title>${secrets.app} Login</title>` +
         `</head>` +
         `<body onload="location.replace('https://${secrets.auth0.domain}/authorize` + 
         `?client_id=${secrets.auth0.client_id}` +
         `&code_challenge=${this.challenge}` +
         `&code_challenge_method=S256` + 
         `&redirect_uri=${secrets.auth0.redirect_uri}` + 
         `&response_type=code` +
         `&scope=email%20openid%20profile` +
         `&state=${secrets.auth0.state}` +
         `');">` +
         `</body>` +
         `</html>`
      );

   }, // login_response();

   logout_response : function() {

      return(
         `<!doctype html>` +
         `<html lang="en">` +
         `<head>` +
         `<meta charset="utf-8">` +
         `<title>${secrets.app} Logout</title>` +
         `</head>` +
         `<body onload="location.replace('https://${secrets.auth0.domain}/logout` +
         `?returnTo=${secrets.auth0.redirect_out}` + 
         `&client_id=${secrets.auth0.client_id}` +
         `');">` +
         `</body>` +
         `</html>`
      );

   }, // logout_response();

   sha256 : function(buffer) {

      return(crypto.createHash('sha256').update(buffer).digest());

   } // sha256();

} // Class auth0;

module.exports.init();