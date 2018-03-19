const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const exphbs = require('express-handlebars');
const jsonfile = require('jsonfile');

// const jsonfile = require('jsonfile');
const FILE = 'data.json';

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

app.post('/pokemon', (req, res) => {
  let params = req.body;

  let pokemon = {
    name:params.name,
    height:params.height,
  };

  jsonfile.readFile(FILE, (err, obj) => {

    obj["pokemon"].push( pokemon );

    jsonfile.writeFile(FILE, obj, (err) => {
      console.error(err)
    });
  });

  res.render('home');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
