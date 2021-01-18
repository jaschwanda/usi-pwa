# usi-pwa
Universal Solutions PWA Template

## Description ##
An starting point to build a Progressive Web Application (PWA).

## Frame Work ##
The frame work was built in a number of steps given below with references to web documents:

Serve static assets, authentication and api routes.

- [https://expressjs.com/en/starter/static-files.html](https://expressjs.com/en/starter/static-files.html)

Serve a JavaScript bundle that is compiled on source code changes and built/optimized for production.

- [https://www.sentinelstand.com/article/create-react-app-from-scratch-with-webpack-and-babel](https://www.sentinelstand.com/article/create-react-app-from-scratch-with-webpack-and-babel)  
- [https://www.npmjs.com/package/webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware)  
- [https://dev.to/riversun/how-to-run-webpack-dev-server-on-express-5ei9](https://dev.to/riversun/how-to-run-webpack-dev-server-on-express-5ei9)  
- [https://www.toni-develops.com/2018/10/23/adding-routing/](https://www.toni-develops.com/2018/10/23/adding-routing/)  

Serve https pages in both local development and production mode protected by real SSL certificates.

- [https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca](https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca)

Run as a Progressive Web Application (PWA) that can run on a smart phone.

- [https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0)  
- [https://blog.logrocket.com/how-to-build-a-progressive-web-app-pwa-with-node-js/](https://blog.logrocket.com/how-to-build-a-progressive-web-app-pwa-with-node-js/)

Protected by Auth0 user authentication.

- [https://auth0.com/blog/complete-guide-to-react-user-authentication/](https://auth0.com/blog/complete-guide-to-react-user-authentication/)  
- [https://auth0.com/docs/flows/add-login-auth-code-flow](https://auth0.com/docs/flows/add-login-auth-code-flow)  

Implement api route with authorization protection.

- [https://auth0.com/docs/flows/add-login-using-the-authorization-code-flow-with-pkce](https://auth0.com/docs/flows/add-login-using-the-authorization-code-flow-with-pkce)
- [https://auth0.com/docs/flows/call-your-api-using-the-authorization-code-flow-with-pkce](https://auth0.com/docs/flows/call-your-api-using-the-authorization-code-flow-with-pkce)

Session management.

- [https://blog.jscrambler.com/best-practices-for-secure-session-management-in-node/](https://blog.jscrambler.com/best-practices-for-secure-session-management-in-node/)
- [https://www.npmjs.com/package/memorystore](https://www.npmjs.com/package/memorystore)

Logging.

- [https://coralogix.com/log-analytics-blog/complete-winston-logger-guide-with-hands-on-examples/](https://coralogix.com/log-analytics-blog/complete-winston-logger-guide-with-hands-on-examples/)
- [https://www.npmjs.com/package/winston](https://www.npmjs.com/package/winston)
- [https://thisdavej.com/using-winston-a-versatile-logging-library-for-node-js/](https://thisdavej.com/using-winston-a-versatile-logging-library-for-node-js/)

## Running the application ##


// From npm:
// $ npm run build
// $ npm run dev
// $ npm run start
// From .basch:
// $ NODE_ENV=development REACT_APP_TITLE="PWA Template" node source/pwa-server
// $ NODE_ENV=production REACT_APP_TITLE="PWA Template" node source/pwa-server
