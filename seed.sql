-- populate table with seed data (all pokemon in pokedex)
INSERT INTO pokemons
(name, num, img, weight, height)
VALUES
('Bulbasaur', '001', 'http://www.serebii.net/pokemongo/pokemon/001.png', '6.9 kg', '0.71 m');

INSERT INTO pokemons
(name, num, img, weight, height)
VALUES
('Ivysaur', '002', 'http://www.serebii.net/pokemongo/pokemon/002.png', '13.0 kg', '0.99 m');

INSERT INTO pokemons
(name, num, img, weight, height)
VALUES
('Venusaur', '003', 'http://www.serebii.net/pokemongo/pokemon/003.png', '100.0 kg', '2.01 m');

INSERT INTO types
(pokemon_type)
VALUES
('grass');

INSERT INTO types
(pokemon_type)
VALUES
('poison');

INSERT INTO types
(pokemon_type)
VALUES
('fire');

INSERT INTO types
(pokemon_type)
VALUES
('flying');

INSERT INTO pokemon_types
(type_id, pokemon_id)
VALUES
(1,1);

INSERT INTO pokemon_types
(type_id, pokemon_id)
VALUES
(1,2);

INSERT INTO pokemon_types
(type_id, pokemon_id)
VALUES
(1,3);

INSERT INTO pokemon_types
(type_id, pokemon_id)
VALUES
(2,1);

INSERT INTO pokemon_types
(type_id, pokemon_id)
VALUES
(2,2);

INSERT INTO pokemon_types
(type_id, pokemon_id)
VALUES
(2,3);
