-- create pokemons table
CREATE TABLE IF NOT EXISTS pokemons (
  id SERIAL PRIMARY KEY,
  num TEXT,
  name TEXT,
  img TEXT,
  weight TEXT,
  height TEXT);

-- create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT
);


-- types table
CREATE TABLE IF NOT EXISTS types (
  id SERIAL PRIMARY KEY,
  pokemon_type TEXT
);

CREATE TABLE IF NOT EXISTS pokemon_types (
  id SERIAL PRIMARY KEY,
  pokemon_id INTEGER,
  type_id INTEGER
);
