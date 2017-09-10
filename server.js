const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const route = require('./routes').staticRoutes;
const server = express();

server.engine('mustache', mustache());
// TODO: Change the views folder to a public or static folder for semantic's sake
server.set('views', './views'); // This is for all your mustache pages
server.set('view engine', 'mustache');
server.use(express.static("public")); // this will look for the css file
server.use(bodyparser.urlencoded({ extended: true }));
server.use(session({
    secret: 'gameofthrone_NEVERdies384764',
    resave: false,
    saveUninitialized: true
}));

// Sets up routes
route(server);

//This allows the express to listen
server.listen(3000, function(){
  console.log('******** Gabbit is LISTENING....! *********');
});
