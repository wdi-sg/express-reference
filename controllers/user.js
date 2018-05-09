const bcrypt = require('bcrypt');

module.exports = (db, passport) => {

  const LocalStrategy = require('passport-local').Strategy;

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const newForm = (request, response) => {
    response.render('user/NewUser');
  };

  /**
   *
   *
   *
   *
   *
   * ===========================================
   *                  Sign Up
   * ===========================================
   */

  // to use a passport strategy for signup
  // this matches the name in routes.js
  let namedStrategy = 'local-signup';

  const signupVerifyCallback = (request, name, password, done) => {

    db.user.create(request.body, (error, queryResult) => {

      let user = queryResult.rows[0];

      console.log("user:", user);

      // return the user and passport will set everything in the session
      return done(null, user);

    });
  };

  //configure passport to use this sign up strategy
  const signupLocalStrategyConfig = {

      // by default, local strategy uses username and password, we could override with email
      // these are reffering to keys in the request params
      usernameField : 'name',

      passwordField : 'password',

      session: true, //let's use session to store the user

      passReqToCallback : true
  };

  const signupLocalStrategy = new LocalStrategy(signupLocalStrategyConfig, signupVerifyCallback);

  passport.use(namedStrategy, signupLocalStrategy);

  /**
   *
   *
   *
   *
   *
   * ===========================================
   *                  Login
   * ===========================================
   */

  // what happens when a post login request happens- called from inside passport
  const loginVerifyCallback = (request, name, password, done) => {
    console.log( "about to make db login query", name, password );

    db.user.getByName(name, (error, queryResult) => {

      if (error) { return done(error); }

      if (queryResult.rows.length <= 0) {
        return done(null, false);
      }

      let user = queryResult.rows[0];

      console.log( "comparing", user, password );

      let bcCompare = bcrypt.compareSync(password, user.password);

      if (!bcCompare) {
        return done(null, false);
      }

      // return the user and passport will set everything in the session
      // this goes to serialize user
      return done(null, user);
    });
  };

  const localStrategyLoginConfig = {
    passReqToCallback: true,
    usernameField: 'name',
    passwordField: 'password'
  };

  const localStrategy = new LocalStrategy(localStrategyLoginConfig, loginVerifyCallback);

  passport.use(localStrategy);

  // get route for the login form
  const loginForm = (request, response) => {
    response.render('user/login');
  };

  /**
   *
   *
   *
   *
   *
   * ===========================================
   *             Session Handling
   * ===========================================
   */


  // someone has logged in, set their user into a session
  // this happens after any verify calback is *done*
  passport.serializeUser((user, done) => {
    console.log("serializing the user", user);

    // dont put the password into the serializer- it's unsecure
    let serializedUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    done(null, serializedUser);
  });

  // someone made a request where we need to look in that requester's user session.
  // Get the user out
  passport.deserializeUser((user, done) => {
    console.log("deserializing the user", user);

    //user becomes request.user
    done(null, user);
  });

  /**
   *
   *
   *
   *
   *
   * ===========================================
   *                  Logout
   * ===========================================
   */

  const logout = (request, response) => {
    // with passport we get this logout method for free
    request.logout();
    response.redirect('/');
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    logout,
    loginForm,
  };
};
