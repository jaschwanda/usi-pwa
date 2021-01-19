'use strict'; // source/pwa-api.js

import secrets from '../pwa-secrets';

const api = async (app, route) => {

   try {

      // console.log('api:route=' + route);

      const response = await fetch(
         secrets.auth0.api + '/' + route,
         {
            method: 'post',
         }
      )

      // console.log('response=', response);

      if (200 == response.status) {

         const data = await response.json();

         console.log('source/pwa-api:data=', data);

         switch (data.route) {

         case 'init':
            app.setState({ status: data.home });
            break;

         case 'time':
            app.setState({ status: data.time });
            break;

         }

      }

   } catch (e) {

      if ('string' === typeof e) console.log(e);

   }

};

export default api;
