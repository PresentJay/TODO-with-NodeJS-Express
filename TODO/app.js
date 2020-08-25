/* 
    Module dependencies.
*/

// importing module
var express = require("express"),
  routes = require("./routes"),
  todo = require("./routes/todo"),
  http = require("http"),
  path = require("path");

// create application
var app = express();
// application port
var port = 3000;

// view engine setup
app.configure(function () {
  app.set("port", port); // port for web server
  app.set("views", path.join(__dirname, "views")); // set template url
  app.set("view engine", "ejs"); // set template engine

  app.use(express.favicon());
  app.use(express.logger("dev")); // record log
  app.use(express.bodyParser()); // parse body from request
  app.use(express.methodOverride()); // support old browser methods
  app.use(app.router); // set routing

  // handle static resources
  app.use(require("stylus").middleware(__dirname + "/public"));
  app.use(express.static(path.join(__dirname, "public")));
});

app.configure("development", function () {
  app.use(express.errorHandler());
});

// routing
app.get("/", routes.index);
app.get("/list", todo.list); // get TODO list that saved in webserver
app.post("/add", todo.add); // add new TODO items to list
app.post("/arrange", todo.arrange);
app.post("/complete", todo.complete); // complete TODO item that is selected
app.post("/del", todo.del); // delete TODO item that is selected

// execute
http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});
