module.exports = (db) => {
  return {
    create : (pokemon, callback) => {

      let values = [
        pokemon.name,
        pokemon.num,
        pokemon.img,
        pokemon.weight,
        pokemon.height
      ];

      db.query('INSERT INTO pokemon (name, num, img, weight, height) VALUES ($1, $2, $3, $4, $5)', values, (error, queryResult) => {
        callback( error, queryResult );
      });
    },

    get : (id, callback) => {

      let values = [id];

      db.query('SELECT * from pokemon WHERE id=$1', values, (error, queryResult) => {
        callback( error, queryResult );
      });
    }
  };
}
