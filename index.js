const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const pool = new pg.Pool({
  user: 'akira',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
});

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

app.get('/', (req, res) => {
  // query database for all pokemon
  pool.query('SELECT * FROM pokemons', (error, queryResult) => {
    if (error) console.error('error!', error);
  });
  // respond with HTML page displaying all pokemon
});

app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('New');
});


app.post('/pokemons', (req, response) => {
  let params = req.body;

  const queryString = 'INSERT INTO pokemons(name, height) VALUES($1, $2)'
  const values = [params.name, params.height];

  pool.on((err) => {
    if (err) console.error('connection error:', err.stack);

    pool.query(queryString, values, (err, res) => {
      if (err) {
        console.error('query error:', err.stack);
      } else {
        console.log('query result:', res);

        // redirect to home page
        response.redirect('/');
      }
    });
  });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
