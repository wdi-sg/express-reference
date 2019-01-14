/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let getAllTypes = (callback) => {

    const queryString = 'SELECT * FROM types';

    // execute query
    dbPoolInstance.query(queryString, (error, queryResult) => {
      // invoke callback function with results after query has executed
      callback(error, queryResult.rows);
    });
  };

  let create = (pokemon, callback) => {
    // set up query
    const queryString = `INSERT INTO pokemons (name, num, img, weight, height)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [
      pokemon.name,
      pokemon.num,
      pokemon.img,
      pokemon.weight,
      pokemon.height
    ];

    // execute query
    dbPoolInstance.query(queryString, values, (error, queryResult) => {
      // invoke callback function with results after query has executed

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

  let get = (id, callback) => {
    const values = [id];

    dbPoolInstance.query('SELECT * from pokemons WHERE id=$1', values, (error, queryResult) => {
      if( error ){

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

  let getByType = (type_id, callback) => {
    const values = [type_id];
    let query = 'SELECT name FROM pokemons INNER JOIN pokemon_types ON pokemons.id = pokemon_types.pokemon_id WHERE pokemon_types.type_id = $1';

    dbPoolInstance.query(query, values, (error, queryResult) => {
      if( error ){

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

  return {
    create,
    get,
    getAllTypes,
    getByType
  };
};
