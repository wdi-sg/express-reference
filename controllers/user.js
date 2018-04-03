const bcrypt = require('bcrypt');

module.exports = (db, passport) => {

  const LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser(function(user, done) {
    console.log("serializing the user", user);
    done(null, user.id);
  });

  passport.deserializeUser(function(user_id, done) {
    console.log("deserializing the user, let's get it from the db", user_id);
    db.user.get(user_id, (error, queryResult) => {
      let user = queryResult.rows[0];
      done(null, user);
    });
  });

  // login
  passport.use(new LocalStrategy(
    {
      usernameField: 'name',
      passwordField: 'password'
    },
    function(name, password, done) {
      console.log( "about to make db login query", name, password );

      db.user.getByName(name, (error, queryResult) => {

        if (error) { return done(error); }

        if (queryResult.rows.length <= 0) {
          //return done(null, false, { message: 'Incorrect name.' });
          return done(null, false);
        }

        let user = queryResult.rows[0];

        console.log( "comparing", user, password );

        let bcCompare = bcrypt.compareSync(password, user.password);

        if (!bcCompare) {
          //return done(null, false, { message: 'Incorrect password.' });
          return done(null, false);
        }

        return done(null, user);
      });

    }
  ));

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const newForm = (request, response) => {
    response.render('user/new');
  };

  passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'name',
        passwordField : 'password',
        session: true,
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(request, name, password, done) {

      db.user.create(request.body, (error, queryResult) => {

        let user = queryResult.rows[0];

        console.log("user:", user);

        return done(null, user);

      });
    })
  );

  const logout = (request, response) => {
    request.logout();
    response.redirect('/');
  };

  const loginForm = (request, response) => {
    response.render('user/login');
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    logout,
    loginForm
  };
};
