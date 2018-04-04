module.exports = (app, db, passport) => {

  const pokemons = require('./controllers/pokemon')(db, passport);
  const users = require('./controllers/user')(db, passport);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  // CRUD users
  app.get('/users/new', users.newForm);

  /*
   *
   *
   *
   * passport signup
   *
  */

  // to use a passport strategy for signup
  // same as in the user controller
  let namedStrategy = 'local-signup';

  // configure the behavior of passport when we try to do signup
  signupAuthConfig = {
    successRedirect : '/',
    failureRedirect : '/users/new'
  };

  // signup() returns a passport callback
  let signupCallback = passport.authenticate(namedStrategy, signupAuthConfig)

  app.post('/users', signupCallback);

  /*
   *
   *
   *
   * passport login
   *
  */

  const localStrategyAuthConfig = {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: false,
    successFlash: false
  };

  let localStrategy = 'local';

  //login returns a passport callback
  let loginCallback = passport.authenticate(localStrategy, localStrategyAuthConfig);
  app.post('/users/login', loginCallback);

  app.get('/users/login', users.loginForm);

  /*
   *
   *
   *
   * logout
   *
  */
  app.post('/users/logout', users.logout);


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
