const express = require('express');

const jsonfile = require('jsonfile');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser')
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// Set static folder
app.use(express.static('public'));

// Set up body-parser to automatically parse form data into object
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());
// Set up method-override for PUT and DELETE forms
app.use(methodOverride('_method'));


/**
 * ===================================
 * Routes
 * ===================================
 */

require('./routes')(app);

app.get('/', (request, response) => {

  let visits = request.cookies['visits'];
  let logged_in = request.cookies['logged_in'];

  if( visits === undefined ){
    visits = 1;
  }else{
    visits = parseInt( visits ) + 1;
  }

  response.cookie('visits', visits);

  let context = {
    visits : visits,
    logged_in : logged_in
  };

  response.render('Home', context);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
