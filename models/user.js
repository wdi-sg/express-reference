const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    const create = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password
      // set up query
      const queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
      const values = [
        user.name,
        user.email,
        user.password
      ];

      // execute query
      dbPoolInstance.query(queryString, values, (error, queryResult) => {

        if( error ){

          console.log("query error", error)

          // invoke callback function with results after query has executed
          callback(error, null);

        }else{

          // invoke callback function with results after query has executed

          if( queryResult.rows.length > 0 ){
            callback(null, queryResult.rows[0]);

          }else{
            callback(null, null);

          }
        }

      });
    };

    const get = (id, callback) => {
      // set up query
      const queryString = 'SELECT * from users WHERE id=$1';
      const values = [id];

      // execute query
      dbPoolInstance.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    };

    const login = (user, callback) => {
      // TODO: Add logic here
    }

    return {
      create,
      get,
      login
    };
};
