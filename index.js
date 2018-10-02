const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const db = require('./db');

// Configuring Passport
const passport = require('passport');
const expressSession = require('express-session');
const pgSessionStore = require('connect-pg-simple')(expressSession);


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set up middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser('MySecret'));
app.use(cookieSession({
  secret:'MySecret'
}));

app.use(passport.initialize());
app.use(passport.session());

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

// Import routes to match incoming requests
require('./routes')(app, db, passport);

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {

  db.queryInterface('SELECT * FROM pokemons', (error, queryResult) => {
    if (error) console.error('error!', error);

    //we will have a user in the request, deserialized now, thanks to passport
    console.log("request user", request.user );

    let context = {
      isAuthenticated: request.isAuthenticated(),
      user:request.user,
      pokemon: queryResult.rows
    };

    response.render('Home', context);
  });
});

// Catch all unmatched requests and return 404 not found page
app.get('*', (request, response) => {
  response.render('NotFound');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
