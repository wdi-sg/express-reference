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

  app.get('/pokemon/:id/edit', pokemon.updateForm);
  app.post('/pokemon/edit/:id', pokemon.update);
  app.get('/pokemon/new', pokemon.createForm);
  app.post('/pokemon/new', pokemon.create);

  app.get('/pokemon/:id', pokemon.get);
};
