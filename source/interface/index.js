// source/interface/index.js
// Version 1.0.9 (2020-09-20)

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './pwa-app.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
