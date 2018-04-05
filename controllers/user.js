const bcrypt = require('bcrypt');

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const getAll = (request, response) => {

    db.user.getAll((error, queryResult) => {
      if (error) {
        console.error('error getting:', error);
      }

      queryResult.toArray((toArrayError, result) => {

        if (toArrayError) console.error('error!', toArrayError);

        response.send(result);
      });

    });
  };

  const newForm = (request, response) => {
    response.render('user/new');
  };

  const create = (request, response) => {


    bcrypt.hash(request.body.password, 1, (err, hashed) => {
      if (err) console.error('error!', err);

      let user = {
        name : request.body.name,
        password: hashed
      };

      db.user.create(user, (error, queryResult) => {

        if (error) {
          console.error('error creating user:', error);
          response.sendStatus(500);
        }

        if (queryResult.rowCount >= 1) {
          console.log('User created successfully');

          // drop cookies to indicate user's logged in status and username
          response.cookie('loggedIn', true);
          response.cookie('username', request.body.name);
        } else {
          console.log('User could not be created');
        }

        // redirect to home page after creation
        response.redirect('/');
      });
    });
  };

  const logout = (request, response) => {
    response.clearCookie('loggedIn');
    response.redirect(301, '/');
  };

  const loginForm = (request, response) => {
    response.render('user/login');
  };

  const login = (request, response) => {
    console.log("sdfsd", request.body.name);

    db.user.getByUsername(request.body.name, (error, queryResult) => {
      console.log("HERRRR"); //, queryResult.length);

      if (error) {
        console.error('error getting user:', error);
        response.sendStatus(403);
        return;
      }

      bcrypt.compare(request.body.password, queryResult.password, function(err, res) {

        if (err) {
          console.error('BCRYPT error:', err);
          response.sendStatus(403);
          return;
        }

        if (res === true) {
          console.log('User created successfully');

          // drop cookies to indicate user's logged in status and username
          response.cookie('loggedIn', true);
          response.cookie('username', request.body.name);
        } else {
          console.log('User could not be created');
          response.send(403);
          return;
        }

        // redirect to home page after creation
        response.redirect('/');

      });
    });


  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    getAll,
    newForm,
    create,
    logout,
    loginForm,
    login
  };
};
