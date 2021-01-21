'use strict'; // webpack.config.js

const path    = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const html_webpack_plugin    = require('html-webpack-plugin');

const log         = require('./source/pwa-log');

const PATH_DIST   = path.join(__dirname, './distribution');
const PATH_SOURCE = path.join(__dirname, './source/interface');

// https://webpack.js.org/configuration/configuration-types#exporting-a-function

module.exports = (env) => {

   log.info('webpack.config.js:env' + JSON.stringify(env));

   const config = {

      devServer: {

         contentBase: PATH_DIST,

         // When using the HTML5 History API, index.html should be served in place of 404 responses.
         historyApiFallback: true,

         host: 'localhost',

         port: env.port_ssl || env.port || 3000,

         overlay: {
            errors: true,
            warnings: true,
         },

      }, // devServer;

      // https://webpack.js.org/concepts#entry
      entry: [
         path.join(PATH_SOURCE, './index.js'),
      ], // entry;

      // Webpack sets `process.env.NODE_ENV` according to the specified environment;
      // https://webpack.js.org/configuration/mode
      mode: env.NODE_ENV,

      // https://webpack.js.org/configuration/module
      module: {

         rules: [

            {

               exclude: /node_modules/, // Don't apply to files residing in node_modules

               test: /\.js$/, // Apply this rule to files ending in .js

               // https://webpack.js.org/concepts#loaders
               use: { 

                  loader: 'babel-loader',

                  // Bable and babel-loader options;
                  options: {

                     plugins: [
                        '@babel/plugin-proposal-class-properties',
                      ], // plugins;

                     presets: [

                        [ '@babel/preset-env', 
                           {

                              // Specify the core-js version. Must match the version in package.json
                              corejs: 3,

                              debug: false, // Output the targets/plugins used when compiling

                              targets: ('development' === env.NODE_ENV) ?
                                 [ // Development
                                    "last 1 chrome version",
                                    "last 1 firefox version",
                                    "last 1 safari version"
                                 ] :
                                 [ // Production
                                    ">0.2%",
                                    "not dead",
                                    "not op_mini all"
                                 ], // targets;

                              // Configure how @babel/preset-env handles polyfills from core-js.
                              // https://babeljs.io/docs/en/babel-preset-env
                              useBuiltIns: 'usage',

                           }

                        ], // @babel/preset-env;

                        '@babel/preset-react',

                     ], // presets;

                  }, // options;

               } // use;

            }

         ], // rules;

      }, // module;

      // https://webpack.js.org/concepts#output
      // https://webpack.js.org/configuration/output#output-filename
      output: {
        filename: '[name].[fullhash].js', // (also consider using [chunkhash] or [contenthash], see documentation for details)
        path: PATH_DIST,
      }, // output

      plugins: [

         // https://github.com/jantimon/html-webpack-plugin
         new html_webpack_plugin(
            {
               react_app: { title: env.REACT_APP_TITLE },
               template: path.join(PATH_SOURCE, './index.html'),
            }
         ),

         // https://github.com/johnagan/clean-webpack-plugin
         new CleanWebpackPlugin(),

      ], // plugins;

      stats: 'errors-only',

      watch: false,

   };

   return(config);

};
