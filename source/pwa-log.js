// This export creates the logging system that records the web server style access and error logs along
// with the debug status log for development;

'use strict'; // pwa-log.js

const morgan  = require('morgan');
const winston = require('winston');

winston.addColors({ colors: { error: 'red', info: 'white', debug: 'magenta' }});

const timestamp = winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' });

const log  = new winston.createLogger(
   {

      exitOnError: false, // Do not exit on handled exceptions

      levels: { 
         error: 0, 
         warn:  1, 
         http:  2,
         info:  3, 
         debug: 4, 
      },

      transports: [

         new winston.transports.File(
            {
               filename: 'logs/status.log',
               format: winston.format.combine(
                  timestamp,
                  winston.format(
                     (info) => {
                        if (4 == info.level.length) info.level += ' ';
                        return(info); 
                     }
                  )(),
                  winston.format.printf(
                     ({level, message, timestamp , ...meta}) => {
                        meta = JSON.stringify(meta);
                        if ('{}' != meta) message += ' meta=' + meta;
                        return(`${timestamp} ${level}: ${message}`);
                     }
                  )
               ),
               handleExceptions: true,
               json: false,
               level: 'debug',
            }
         ),

         new winston.transports.File(
            {
               filename: 'logs/access.log',
               format: winston.format.combine(
                  timestamp,
                  winston.format((info, options) => { return(info.level != 'http' ?  false : info); })(),
                  winston.format.printf(info => `${info.timestamp} ${info.message}`)
               ),
               handleExceptions: true,
               json: false,
               level: 'http',
            }
         ),

         new winston.transports.File(
            {
               filename: 'logs/errors.log',
               format: winston.format.combine(
                  timestamp,
                  winston.format.printf(info => `${info.timestamp} ${info.message}`)
               ),
               handleExceptions: true,
               json: false,
               level: 'error',
            }
         ),

         new winston.transports.Console(
            {
               format: winston.format.combine(
                  timestamp,
                  winston.format(
                     (info) => {
                        if (4 == info.level.length) info.level += ' ';
                        return(info); 
                     }
                  )(),
                  winston.format.colorize(),
                  winston.format.printf(
                     ({level, message, timestamp , ...meta}) => {
                        meta = JSON.stringify(meta);
                        if ('{}' != meta) message += ' meta=' + meta;
                        return(`${timestamp} ${level}: ${message}`);
                     }
                  )
               ),
               handleExceptions: true,
               json: false,
               level: 'debug',
            }
         ),

      ],
   }
);

log.morgan = function(option) {

   const format = ':remote-addr :status :method ":url" HTTP/:http-version :response-time[3]ms :res[content-length]bytes';

   if ('all' == option) {
      return(
         morgan(
            format,
            { 
               stream : { write: (message, encoding) => log.http(message.substring(0, message.lastIndexOf('\n'))) }, 
            }
         )
      );
   }

   if ('err' == option) {
      return(
         morgan(
            format,
            {
               skip : function (request, response) {
                  // IF 401 error (not always error and logged instead as designed access);
                  if (401 == response.statusCode) {
                     // Skip logging default path which generates /api/init call by design;
                     if ('*' == request.route.path) return(true);
                     // Skip logging /api/init which is generated on a browser refresh;
                     if ('/api/init' == request.url) return(true);
                  } // ENDIF 401 error (not always error and logged instead as designed access);
                  return(400 > response.statusCode);
               }, 
               stream : { write: (message, encoding) => log.error(message.substring(0, message.lastIndexOf('\n'))) },
            }
         )
      );
   }

}

module.exports = log;
