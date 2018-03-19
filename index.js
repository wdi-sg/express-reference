const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const exphbs = require('express-handlebars');
const jsonfile = require('jsonfile');

const { Client } = require('pg')

const client = new Client({
  user: 'akira',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
});

// const jsonfile = require('jsonfile');
const FILE = 'data.json';


// how to init db
//createdb pokemons -U akira
//psql -U akira -d pokemons -a -f seed.sql

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


// Set handlebars to be the default view engine
app.engine('handlebars', exphbs.create().engine);
app.set('view engine', 'handlebars');


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/names/:pokemon', (req, res) => {
  // send response with some data (a string)
  res.send(req.params.pokemon);
});

app.get('/', (req, res) => {
  // send response with some data (a HTML file)
  res.render('home');
});

app.get('/pokemon/new', (req, res) => {
  // send response with some data (a HTML file)
  res.render('new');
});

app.post('/pokemon', (req, response) => {
  let params = req.body;

  const text = 'INSERT INTO pokemon(name, height) VALUES($1, $2)'
  const values = [params.name, params.height];

  client.connect((err) => {

    //TODO: check for connection error

    client.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        // render the id's page?
        // res.render('pokemon');
        // or redirect
        response.render('home');

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
