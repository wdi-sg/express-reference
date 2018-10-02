const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
require('./db')((db) => {

  /**
   * ===================================
   * Configurations and set up
   * ===================================
   */

  // Init express app
  const app = express();

  // Set up middleware
  app.use(methodOverride('_method'));
  app.use(cookieParser());
  app.use(express.urlencoded({
  extended: true
}));

  // Set handlebars to be the default view engine
  app.engine('handlebars', handlebars.create().engine);
  app.set('view engine', 'handlebars');

  /**
   * ===================================
   * Routes
   * ===================================
   */

  // Import routes to match incoming requests
  require('./routes')(app, db);

  // Root GET request (it doesn't belong in any controller file)
  app.get('/', (request, response) => {
    let loggedIn = request.cookies['loggedIn'];
    let username = request.cookies['username'];

    db.queryInterface('SELECT * FROM pokemons', (error, queryResult) => {
      if (error) console.error('error!', error);

      let context = {
        loggedIn: loggedIn,
        username: username,
        pokemon: queryResult.rows
      };

      response.render('home', context);
    });
  });

  // Catch all unmatched requests and return 404 not found page
  app.get('*', (request, response) => {
    response.render('404');
  });

  /**
   * ===================================
   * Listen to requests on port 3000
   * ===================================
   */
  const server = app.listen(3003, () => console.log('~~~ Tuning in to the waves of port 3003 ~~~'));

});
