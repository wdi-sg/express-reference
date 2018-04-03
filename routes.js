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

  app.post('/users', passport.authenticate('local-signup', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/users/new' // redirect back to the signup page if there is an error
  }));

  // Authentication
  app.post('/users/logout', users.logout);
  app.get('/users/login', users.loginForm);
  app.post('/users/login', passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: false,
      successFlash: false
    })
  );

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
