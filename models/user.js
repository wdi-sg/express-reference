const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (mongo) => {

    const create = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password

        mongo.collection('users').insertOne(user, (mongoError, res) => {
          if (mongoError) throw err;

          console.log("1 document inserted");

          callback(mongoError, res);
        });

    };
    const getAll = (callback) => {

      mongo.collection('users').find((mongoError, res) => {
        if (mongoError) throw err;

        console.log("1 document gotten");

        callback(mongoError, res);
      });

    };



    const get = (id, callback) => {

      mongo.collection('users').find(id, (mongoError, res) => {
        if (mongoError) throw err;

        console.log("1 document gotten");

        callback(mongoError, res);
      });

    };

    const getByUsername = (username, callback) => {

      let queryObject = {
        'name' : username
      };

      mongo.collection('users').findOne(queryObject, (mongoError, res) => {
        if (mongoError) throw err;

        console.log("1 document gotten", res);

        callback(mongoError, res);
      });
    }

    return {
      create,
      get,
      getAll,
      getByUsername
    };
};
