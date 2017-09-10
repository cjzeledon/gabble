const Sequelize = require('sequelize');

// Connects to a database called "gabble"
const db = new Sequelize('gabble', 'claudiazeledon', '', {
  dialect: 'postgres',
});

// User SCHEMA
const User = db.define('user', {
  userName: Sequelize.STRING,
  userPassword: Sequelize.STRING,
  userAvatar: Sequelize.STRING,
});

User.sync().then(function() {
  console.log('User Gabblic-n-Sync!');
  // Person.create(
  //   { userName: 'Dany', userPassword: 'motherofdragons', userAvatar:'https://avatarfiles.alphacoders.com/105/105157.jpg' }
  // );
});

function findUser(username, password) {
  return User.findOne({
    where: {
      userName: username,
      userPassword: password,
    }
  });
};

function registerUser(name, pass, avatar) {
  return User.create({
    userName: name,
    userPassword: pass,
    userAvatar: avatar,
  });
};

module.exports = { // This is an object that has all your functions so that can be called out
  User: User,
  findUser: findUser,
  registerUser: registerUser,
};
