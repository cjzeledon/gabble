const express = require('express');
const session = require('express-session');
const sequelize = require('sequelize');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const app = express();

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("views"));

/************** GABBLES SCHEMA **************/

const db = new Sequelize('gabble', 'claudiazeledon', '', {
  dialect: 'postgres',
});

const List = db.define('user', {
  userName: Sequelize.STRING,
  userPassword: Sequelize.STRING,
  userAvatar: Sequelize.STRING,
});

List.sync().then(function(){
  console.log('Sync-king in Gabbles Yo!');

List.create(
  { userName: 'Dany', userPassword: 'motherofdragons', userAvatar:'https://avatarfiles.alphacoders.com/105/105157.jpg' }
);
List.create(
  { userName: 'Jon', userPassword: 'whitewolf', userAvatar:'https://avatarfiles.alphacoders.com/103/103053.jpg' }
);

});

/********** END OF GABBLES SCHEMA ***********/
