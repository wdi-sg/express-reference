const pokemon = require('./controllers/pokemon');
const users = require('./controllers/users');

module.exports = (app, db) => {

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

  app.get('/pokemon/:id/edit', pokemon.updateForm(db));
  app.post('/pokemon/edit/:id', pokemon.update(db));
  app.get('/pokemon/new', pokemon.createForm);
  app.post('/pokemon/new', pokemon.create(db));

  app.get('/pokemon/:id', pokemon.get(db));
};
