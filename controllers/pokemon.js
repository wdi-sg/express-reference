module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let index = (request, response) => {

      db.pokemon.getAllTypes((error, types) => {
        response.render('pokemon/index', { types });
      });


  };

  let getByType = (request, response) => {
    response.send('tbd');
  };

  let get = (request, response) => {

      // use pokemon model method `get` to retrieve pokemon data

      db.pokemon.get(request.params.id, (error, pokemon) => {
        // queryResult contains pokemon data returned from the pokemon model
        if (error) {

          console.error('error getting pokemon', error);
          response.status(500);
          response.send('server error');

        } else {

          if( pokemon === null ){

            // render pokemon view in the pokemon folder
            response.status(404);
            response.send('not found');

          }else{

            // render pokemon view in the pokemon folder
            response.render('pokemon/pokemon', { pokemon: pokemon });

          }
        }
      });
  };

  let updateForm = (request, response) => {
      // TODO: Add logic here
  };

  let update = (request, response) => {
      // TODO: Add logic here
  };

  let createForm = (request, response) => {
    response.render('pokemon/new');
  };

  let create = (request, response) => {
      // use pokemon model method `create` to create new pokemon entry in db
      db.pokemon.create(request.body, (error, pokemon) => {
        // queryResult of creation is not useful to us, so we ignore it
        // (console log it to see for yourself)
        // (you can choose to omit it completely from the function parameters)

        if (error) {
          console.error('error getting pokemon:', error);
          response.sendStatus(500);
        }

        if (pokemon) {
          console.log('Pokemon created successfully');
        } else {
          console.log('Pokemon could not be created');
        }
        // redirect to home page after creation
        response.redirect('/');
      });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index,
    get,
    getByType,
    updateForm,
    update,
    createForm,
    create
  };

}
