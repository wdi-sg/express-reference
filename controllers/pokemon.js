const jsonfile = require('jsonfile');
const FILE = '../pokedex.json';

module.exports = {
  updateForm: (db) => (request, response) => {
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

        response.render('404');
      }else{
        let context = {
          pokemon : pokemon
        };

        // send something back
        response.render('edit', context);

      }
    });

  },
  update: (db) => (request, response) => {
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

        response.render('404');
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
    db.pokemon.create( request.body, (error, queryResult) => {

        if(error) {
          console.log('Error running health check query on DB', err)
          response.sendStatus(500)
        }

        if( queryResult.rowCount >= 1 ){

          response.send('success');
        }else{

          response.send('fail');
        }

    });

    // send response with some data (a HTML file)
  },

  get: (request, response) => {

    db.pokemon.get( request.params.id, (error, queryResult) => {
        if(error) {
          console.log('Error running health check query on DB', err)
          response.sendStatus(500)
        }

        response.send(queryResult.rows[0]);
    });
  }
};
