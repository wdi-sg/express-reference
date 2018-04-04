const pokemon = require('./models/pokemon');
const user = require('./models/user');

//mongodb://localhost:27017/animals
const configs = {
  host: 'localhost',
  database: 'pokemons',
  poolSize:10,
  port: 27017
};



var MongoClient = require('mongodb').MongoClient;

module.exports = (connectionCallback) => {
  let mongoUrl = "mongodb://" + configs.host + ":" + configs.port

  MongoClient.connect(mongoUrl, function (err, client) {
    if (err) throw err

    let mongo = client.db(configs.database);

    let exportsObject = {
      mongo:mongo,
      pokemon: pokemon(mongo),
      user: user(mongo),
    };

    connectionCallback(exportsObject);
  });
};
