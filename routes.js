const pokemon = require('./controllers/pokemon');
const users = require('./controllers/users');

module.exports = (app) => {

  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *
   *  USERS
   *
   *  =========================================
   *  =========================================
   *  =========================================
   */

  app.get('/users/new', users.newform);
  app.post('/users/new', users.create);

  app.post('/users/logout', users.logout);

  app.get('/users/login', users.loginform);
  app.post('/users/login', users.login);
  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *
   *  pokemon
   *
   *  =========================================
   *  =========================================
   *  =========================================
   */

  app.get('/edit/:id', pokemon.updateForm);
  app.post('/edit/:id', pokemon.update);
  app.get('/new', pokemon.createForm);
  app.post('/new', pokemon.create);
  app.get('/:id', pokemon.get);
};
