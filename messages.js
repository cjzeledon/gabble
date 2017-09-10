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

Message.sync().then(function() {
  console.log('Message Gabblic-n-Sync!');
});

// In my mind you shouldn't have to retrieve the user again (not
// sure why you do). BUT we have the user id so its pretty easy
// to do.
function createMessage(newMessage, user) {
  return User.findOne({
    where: {
      id: user.id
    }
  }).then(function (who) {
      return Message.create({
        gabMessage: newMessage,
      }).then(function(message) {
        message.setUser(who); // sender is a user object
      });
    })
};

// This code works well as it is. Compiles only messages. No users can be displayed.
// function trendingMessage() {
//   return Message.findAll()
// };

// function atglanceMessage(){
//   return Message.findOne({
//     include: [ User ],
//     include: [ Like]
//   })
// }

function trendingMessage() {
  return Message.findAll({
    include: [ User ]
  })
};

// This is a pretty neat code to see how it works. It seemed to have pulled BOTH tables in json format. Now...how can I translate that into the browser?
// function trendingMessage() {
//   return Message.findAll({
//     include: [ User ]
//   })
//   .then (users => {s
//     console.log(JSON.stringify(users))
//   })
// };

module.exports = {
  Message: Message,
  createMessage: createMessage,
  trendingMessage: trendingMessage,
};
