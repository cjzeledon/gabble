const Sequelize = require('sequelize');
const User = require('./users').User;
//Remember that when you are requiring a file, you need to specify what block of code to run in the module.exports and then add the ".User" at the end of User require code.

// Connects to a database called "gabble"
const db = new Sequelize('gabble', 'claudiazeledon', '', {
  dialect: 'postgres',
});

// Message SCHEMA
const Message = db.define('message', {
  gabMessage: Sequelize.STRING,
});

Message.belongsTo(User);

Message.sync().then(function(){
  console.log('Message Gabblic-n-Sync!');

  // Message.create(
  //   { userName: 'Dany', userPassword: 'motherofdragons', userAvatar:'https://avatarfiles.alphacoders.com/105/105157.jpg' }
  // );
  //
  // Person.create(
  //   { userName: 'Jon', userPassword: 'whitewolf', userAvatar:'https://avatarfiles.alphacoders.com/103/103053.jpg' }
  // );

});

function createMessage(newMessage){
  return Message.create({
    gabMessage: newMessage,
  })
};

function trendingMessage(){
  return Message.findAll()
};

module.exports = {
  createMessage: createMessage,
  trendingMessage: trendingMessage,
};
