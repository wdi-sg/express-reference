const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

// post request libs
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */
app.get('/new', (request, response) => {
  // send response with some data (a HTML file)
  response.render('new');
});

app.post('/', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let newPokemon = request.body;

    obj.pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, obj, (err) => {
      console.error(err);
      response.render('home', { pokemon: obj.pokemon });
    });
  });
});

app.get('/:id', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let inputId = request.params.id;

    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {
      // send 404 back
      response.render('404');
    } else {
      let context = {
        pokemon: pokemon
      };

      response.render('pokemon', context);
    }
  });
});

app.get('/', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    response.render('home', { pokemon: obj.pokemon });
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
