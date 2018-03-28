module.exports = (app, db) => {

  const pokemons = require('./controllers/pokemon')(db);
  const users = require('./controllers/user')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users/new', users.newForm);
  app.post('/users', users.create);

  // Authentication
  app.post('/users/logout', users.logout);
  app.get('/users/login', users.loginForm);
  app.post('/users/login', users.login);

  /*
   *  =========================================
   *  Pokemons
   *  =========================================
   */

  app.get('/pokemon/:id', pokemons.get);
  app.get('/pokemons/:id/edit', pokemons.updateForm);
  app.post('/pokemons/:id/edit', pokemons.update);
  app.get('/pokemons/new', pokemons.createForm);
  app.post('/pokemons', pokemons.create);
  app.get('/pokemons/:id', pokemons.get);
};
