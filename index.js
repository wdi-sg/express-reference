const express = require('express');
const handlebars = require('express-handlebars');

// post request libs
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const cookieParser = require('cookie-parser')


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


// post request use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.use(cookieParser());

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

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

  response.render('home', context);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
