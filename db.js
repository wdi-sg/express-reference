const pg = require('pg')
const pokemon = require('./models/pokemon')

const configs = {
  user: 'akira',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

const pool = new pg.Pool(configs)

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack)
})

module.exports = {
  pool,
  pokemon : pokemon(pool),
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
