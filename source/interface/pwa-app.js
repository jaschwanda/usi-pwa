'use strict'; // source/interface/app.js

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
           </div>
         );
         //  <button onClick={() => location.replace('login')}>Log In</button>

      } else {

         return(
           <div className="App">
             <p>Status: {this.state.status}</p>
             <button onClick={() => api(this, 'time')}>TIME</button>
           </div>
         );
         //  <button onClick={() => location.replace('logout')}>Log Out</button>

      }

   } // render();
}
