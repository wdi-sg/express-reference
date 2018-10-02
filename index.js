const express = require("express");
const jsonfile = require("jsonfile");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const FILE = "pokedex.json";

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set react-views to be the default view engine
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

// Set static folder
app.use(express.static("public"));

// Set up body-parser to automatically parse form data into object
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());
// Set up method-override for PUT and DELETE forms
app.use(methodOverride("_method"));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/edit/:id", (request, response) => {
  // send response with some data (a HTML file)

  // get my json from the file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the pokedex json file

    // deal with the request
    let name = request.params.id;

    let pokemon = null;

    for (let i = 0; i < obj.pokemon.length; i++) {
      if (obj.pokemon[i].id == request.params.id) {
        pokemon = obj.pokemon[i];
      }
    }

    if (pokemon === null) {
      response.render("NotFound");
    } else {
      let context = {
        pokemon: pokemon
      };

      // send something back
      response.render("edit", context);
    }
  });
});

app.put("/edit/:id", (request, response) => {
  // send response with some data (a HTML file)

  // get my json from the file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the pokedex json file

    // deal with the request
    let name = request.params.id;

    let pokemon = null;

    for (let i = 0; i < obj.pokemon.length; i++) {
      if (obj.pokemon[i].id == request.params.id) {
        console.log(request.body);
        obj.pokemon[i] = request.body;
        pokemon = obj.pokemon[i];
      }
    }

    if (pokemon === null) {
      response.render("NotFound");
    } else {
      jsonfile.writeFile(FILE, obj, err => {
        console.error(err);

        let context = {
          pokemon: pokemon
        };

        // send something back
        response.render("pokemon", context);
      });
    }
  });
});

app.get("/new", (request, response) => {
  // send response with some data (a HTML file)
  response.render("new");
});

app.post("/new", (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let new_pokemon = request.body;

    obj.pokemon.push(new_pokemon);

    jsonfile.writeFile(FILE, obj, err => {
      console.error(err);
      response.render("NotFound");
    });
  });

  // send response with some data (a HTML file)
});

app.get("/:id", (request, response) => {
  // get my json from the file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the pokedex json file

    // deal with the request
    let name = request.params.id;

    let pokemon = null;

    for (let i = 0; i < obj.pokemon.length; i++) {
      if (obj.pokemon[i].id == request.params.id) {
        pokemon = obj.pokemon[i];
      }
    }

    if (pokemon === null) {
      response.render("NotFound");
    } else {
      let context = {
        pokemon: pokemon
      };

      // send something back
      response.render("Pokemon", context);
    }
  });
});

app.get("/", (request, response) => {
  var visits = request.cookies["visits"];

  if (visits === undefined) {
    visits = 1;
  } else {
    visits = parseInt(visits) + 1;
  }

  response.cookie("visits", visits);

  let context = {
    visits: visits
  };

  response.render("home", context);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);
