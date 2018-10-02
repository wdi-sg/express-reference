const express = require('express');
const methodOverride = require('method-override');

const pg = require('pg');


// Initialise postgres client
const configs = {
  user: 'akira',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});



/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

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

app.get('/pokemon/:id', (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //response.send('workz!');


  const queryString = 'SELECT * FROM pokemon WHERE id='+request.params.id;

  pool.query(queryString, (err, res) => {
    if (err) {
      console.error('query error:', err.stack);
      response.send('error');
    } else {
      console.log('query result:', res.rows[0]);

      // redirect to home page
      response.send(res.rows);
    }
  });
});


app.get('/', (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //response.send('workz!');


  const queryString = 'SELECT * FROM pokemon';

  pool.query(queryString, (err, res) => {
    if (err) {
      console.error('query error:', err.stack);
      response.send('error');
    } else {
      //console.log('query result:', res);

      // redirect to home page
      response.render('home', {pokemon: res.rows});
    }
  });


});

app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('New');
});

app.get('/edit/:id', (request, response) => {
  // respond with HTML page with form to create new pokemon

  const queryString = 'SELECT * FROM pokemon WHERE id='+request.params.id;

  pool.query(queryString, (err, res) => {
    if (err) {
      console.error('query error:', err.stack);
      response.send('error');
    } else if(res.rows.length > 0) {
      console.log('query result:', res.rows[0]);

      response.render('Edit', {pokemon: res.rows[0]});
    }else{
      response.send("doesn't exist");
    }
  });

});

app.post('/find', (request, response) => {
  // respond with HTML page with form to create new pokemon

  // how to see everything in the DB:
  // ' OR 1=1 --

  var queryString = "SELECT * FROM pokemon WHERE name='"+request.body.name + "'";

  //const values = [request.body.name, request.body.height];
  console.log( queryString );

  //pool.query(queryString, values, (err, res) => {
  pool.query(queryString, (err, res) => {

    if (err) {
      console.log( queryString );
      console.error('query error:', err.stack);
      response.send('error');
    } else if(res.rowCount > 0) {
      console.log('query result:', res.rows[0]);

      response.send(res.rows);
    }else{
      response.send("doesn't exist");
    }
  });
});





app.post('/pokemons', (req, response) => {
  let params = req.body;

  var queryString = 'INSERT INTO pokemon(name, height) VALUES($1, $2)'
  const values = [params.name, params.height];


  pool.query(queryString, values, (err, res) => {
    if (err) {
      console.error('query error:', err.stack);
      response.send('error');
    } else {
      //console.log('query result:', res);

      // redirect to home page
      //response.redirect('/');
      response.send( res.rows )
    }
  });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
