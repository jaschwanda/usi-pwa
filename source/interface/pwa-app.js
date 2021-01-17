// source/interface/app.js
// Version 1.0.9 (2020-09-20)

'use strict';

import React from 'react';

import api from './pwa-api';

export default class App extends React.Component {

   state = { status: 'unknown' };

   componentDidMount = () => {

      // Replace the auth0 authentication string;
      history.replaceState(null, '', '/');

      api(this, 'init');

   } // componentDidMount();

   render() {

      if ('unknown' == this.state.status) {

         return(
           <div className="App">
             <p>Status: {this.state.status}</p>
             <button onClick={() => location.replace('login')}>Log In</button>
           </div>
         );

      } else {

         return(
           <div className="App">
             <p>Status: {this.state.status}</p>
             <button onClick={() => location.replace('logout')}>Log Out</button>
             <button onClick={() => api(this, 'time')}>TIME</button>
           </div>
         );

      }

   } // render();
}
