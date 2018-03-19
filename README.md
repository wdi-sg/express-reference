# express-reference
reference express app

**Creating the DB:**
```
createdb pokemons -U akira
```

**Running the seed.sql file**
( this contains create tables, seed data?? )
```
psql -U akira -d pokemons -a -f seed.sql
```

**Use psql to check your work**
```
psql -U akira -d pokemons
```

```
SELECT * FROM pokemon;
```

TODO: reset your db if you made a mistake:
(what's the proper command?)
```
DROP DB pokemons;
```
