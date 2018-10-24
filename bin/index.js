/* -- AndrewBuiltThis --
  Description: This is the web application that acts as an entire street closure
    management package, including a public interface, an admin (editable) interface
    and a tabular interface.
  Objective: This will allow users to get information on the current status of street closures
    and detours in the City of Charlotte.
  Author: Andrew Valenski, Spatial Intelligence Developer
  Date: 10/24/2018
*/ 

// Import necessary modules
  const app = require('../app'); // This requires the app.js file's exported object

// Specify the port that Node will run on
  const port = 3001; 

// The listen method instructs the application to begin listening,
// i.e. to to launch the application and wait for requests. This can
// be though of as the 'startup' function.
  app.listen(port,() => {
      console.log(`Application listening on Port ${port}`);
  });

