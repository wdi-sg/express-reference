const express = require("express");
const bcrypt = require('bcrypt');
const jsonfile = require("jsonfile");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const FILE = "pokedex.json";
const USERFILE = "users.json"

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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
// Set up method-override for PUT and DELETE forms
app.use(methodOverride("_method"));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/users/new", (request, response) => {
  // send response with some data (a HTML file)
  response.render("newuser");
});

app.post("/users/new", (request, response) => {
  jsonfile.readFile(USERFILE, (err, obj) => {
    bcrypt.hash(request.body.password, 1, function(err, hash) {
      let new_user = {
        name: request.body.name,
        password: hash
      };

      obj.users.push(new_user);

      jsonfile.writeFile(USERFILE, obj, err => {
        console.error(err);

        response.cookie("logged_in", true);
        response.redirect(301, "/");
      });
    });
  });
});

app.post("/users/logout", (request, response) => {
  response.clearCookie("logged_in");
  response.redirect(301, "/");
});

app.get("/users/login", (request, response) => {
  // send response with some data (a HTML file)
  response.render("Login");
});

app.post("/users/login", (request, response) => {
  jsonfile.readFile(USERFILE, (err, obj) => {
    let user = null;

    for (let i = 0; i < obj.users.length; i++) {
      if (obj.users[i].name == request.body.name) {
        user = obj.users[i];
      }
    }

    bcrypt.compare(request.body.password, user.password, function(err, res) {
      if (res === true) {
        response.cookie("logged_in", true);
        response.redirect(301, "/");
      }
    });
  });
});

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

app.post("/edit/:id", (request, response) => {
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
  let visits = request.cookies["visits"];
  let logged_in = request.cookies["logged_in"];

  if (visits === undefined) {
    visits = 1;
  } else {
    visits = parseInt(visits) + 1;
  }

  response.cookie("visits", visits);

  let context = {
    visits: visits,
    logged_in: logged_in
  };

  response.render("Home", context);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);
