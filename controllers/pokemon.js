const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

module.exports = {
  updateForm: (request, response) => {
    // send response with some data (a HTML file)


      // get my json from the file
    jsonfile.readFile(FILE, (err, obj) => {

      // obj is the pokedex json file

      // deal with the request
      let name = request.params.id;

      let pokemon = null;

      for( let i=0; i<obj.pokemon.length; i++ ){
        if( obj.pokemon[i].id == request.params.id ){
          pokemon = obj.pokemon[i];
        }
      }

      if( pokemon === null ){

        response.render('NotFound');
      }else{
        let context = {
          pokemon : pokemon
        };

        // send something back
        response.render('edit', context);

      }
    });

  },
  update: (request, response) => {
    // send response with some data (a HTML file)


    // get my json from the file
    jsonfile.readFile(FILE, (err, obj) => {

      // obj is the pokedex json file

      // deal with the request
      let name = request.params.id;

      let pokemon = null;

      for( let i=0; i<obj.pokemon.length; i++ ){
        if( obj.pokemon[i].id == request.params.id ){
          console.log( request.body );
          obj.pokemon[i] = request.body;
          pokemon = obj.pokemon[i];
        }
      }

      if( pokemon === null ){

        response.render('NotFound');
      }else{

        jsonfile.writeFile(FILE, obj, (err) => {
          console.error(err)

          let context = {
            pokemon : pokemon
          };

          // send something back
          response.render('pokemon', context);
        });

      }
    });

  },
  createForm: (request, response) => {
    // send response with some data (a HTML file)
    response.render('new');
  },

  create: (request, response) => {

    jsonfile.readFile(FILE, (err, obj) => {

      let new_pokemon = request.body;

      obj.pokemon.push( new_pokemon );

      jsonfile.writeFile(FILE, obj, (err) => {
        console.error(err)
        response.render('NotFound');
      });
    });


    // send response with some data (a HTML file)
  },

  get: (request, response) => {

      // get my json from the file
    jsonfile.readFile(FILE, (err, obj) => {
      // obj is the pokedex json file

      // deal with the request
      let name = request.params.id;

      let pokemon = null;

      for( let i=0; i<obj.pokemon.length; i++ ){
        if( obj.pokemon[i].id == request.params.id ){
          pokemon = obj.pokemon[i];
        }
      }

      if( pokemon === null ){

        response.render('NotFound');
      }else{
        let context = {
          pokemon : pokemon
        };
        console.log(pokemon)
        // send something back
        response.render('Pokemon', context);

      }
    });
  }
};
