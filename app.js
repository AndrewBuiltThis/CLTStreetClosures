
// Import necessary node modules
  const express = require('express'), // This is the core module for creating a scalable server
        bodyParser = require('body-parser'), // This module is for parsing the body of requests
        favicon = require('serve-favicon'), // This is required to serve the favicon
        path = require('path'); // This is required so we can dynamically build folder paths

// Initiate the express class
  const app = express();

// Define the view enginer (how the application will render the pages)
  app.set('view engine','pug');

// Define the views folder -- node needs to know where to look when rendering pages during routing
  app.set('views', __dirname + '/views');

// Define the public folder for static files -- node needs to know where to serve static files from
  app.use(express.static(__dirname + '/public'));

// Define the specific path of the favicon
  app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon', 'favicon.ico')));

// Define the body parsing logic for POST requests
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

// Define the routes for the actual website
  const indexRouter = require ('./routes/index');
  const adminRouter = require ('./routes/admin');
  const closuresRouter = require ('./routes/explore');
  const closureRouter = require ('./routes/closure');
  const closureJSONRouter = require ('./routes/closureJSON');

// Define what the application will do when serving web pages
  app.use('/',indexRouter);
  app.use('/admin', adminRouter);
  app.use('/closures', closuresRouter);
  app.use('/closures', closureRouter);
  app.use('/closureJSON', closureJSONRouter);

// This makes the app object available to all other files
// By doing this, we startup our app elsewhere and keep the 
// start-up function clean and isolated.
  module.exports = app;