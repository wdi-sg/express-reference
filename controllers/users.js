const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

const bcrypt = require('bcrypt');

module.exports = {

  // new user form
  newform: (request, response) => {
    // send response with some data (a HTML file)
    response.render('newuser');
  },

  create: (request, response) => {

    jsonfile.readFile(FILE, (err, obj) => {

        bcrypt.hash(request.body.password, 1, function(err, hash) {

          let new_user = {
            name : request.body.name,
            password : hash
          };

          obj.users.push( new_user );

          jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err)

            response.cookie('logged_in', true);
            response.redirect(301, '/');
          });


        });

    });
  },

  logout:  (request, response) => {
    response.clearCookie('logged_in');
    response.redirect(301, '/');
  },

  loginform:  (request, response) => {
    // send response with some data (a HTML file)
    response.render('login');
  },

  login: (request, response) => {

    jsonfile.readFile(FILE, (err, obj) => {

        let user = null;

        for( let i=0; i<obj.users.length; i++ ){
          if( obj.users[i].name == request.body.name ){
            user = obj.users[i];
          }
        }

        bcrypt.compare(request.body.password, user.password, function(err, res) {
          if( res === true ){

            response.cookie('logged_in', true);
            response.redirect(301, '/');

          }
        });

    });
  }
};
