const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    const create = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password
      bcrypt.hash(user.password, 1, (err, hashed) => {
        if (err) console.error('error!', err);

        // set up query
        const queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
        const values = [
          user.name,
          user.email,
          hashed
        ];

        // execute query
        dbPoolInstance.query(queryString, values, (error, queryResult) => {
          // invoke callback function with results after query has executed
          callback(error, queryResult);
        });
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
