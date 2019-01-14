module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  let newForm = (request, response) => {
    response.render('user/newuser');
  };

  let create = (request, response) => {
      // use user model method `create` to create new user entry in db
      db.user.create(request.body, (error, user) => {
        // queryResult of creation is not useful to us, so we ignore it
        // (console log it to see for yourself)
        // (you can choose to omit it completely from the function parameters)

        if (error) {
          console.log('error creating user:', error);
          response.status(500);
        }else if(user) {
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
  };

  let logout = (request, response) => {
    response.clearCookie('loggedIn');
    response.redirect(301, '/');
  };

  let loginForm = (request, response) => {
    response.render('user/login');
  };

  let login = (request, response) => {
    // TODO: Add logic here
    // Hint: All SQL queries should happen in the corresponding model file
    // ie. in models/user.js - which method should this controller call on the model?
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    logout,
    loginForm,
    login
  };
};
