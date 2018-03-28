/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `db` is accessible within this function scope
  return {
    create: (pokemon, callback) => {
      // set up query
      const queryString = `INSERT INTO pokemons (name, num, img, weight, height)
        VALUES ($1, $2, $3, $4, $5)`;
      const values = [
        pokemon.name,
        pokemon.num,
        pokemon.img,
        pokemon.weight,
        pokemon.height
      ];

      // execute query
      dbPoolInstance.query(queryString, values, (err, queryResult) => {
        // invoke callback function with results after query has executed
        callback(err, queryResult);
      });
    },

    get: (id, callback) => {
      const values = [id];

      dbPoolInstance.query('SELECT * from pokemons WHERE id=$1', values, (error, queryResult) => {
        callback(error, queryResult);
      });
    }
  };
};
