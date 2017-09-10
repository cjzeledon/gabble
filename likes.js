const Sequelize = require('sequelize');
const User = require('./users').User;
const Message = require('./messages').Message;

//Remember that when you are requiring a file, you need to specify what block of code to run in the module.exports and then add the ".User" at the end of User require code.

// Connects to a database called "gabble"
const db = new Sequelize('gabble', 'claudiazeledon', '', {
  dialect: 'postgres',
});

// Like SCHEMA
const Like = db.define('like', {
  // no need for any other info
});

Like.belongsTo(User);
Like.belongsTo(Message);

Like.sync().then(function() {
  console.log('Like Gabblic-n-Sync!');
});

function createLike(user, message) {
  return User.findOne({
    where: {
      id: user.id,
    }
  }).then(function(who) {
    return Message.findOne({
      where: {
        id: message,
      }
    }).then(function(current) {
      return Like.create({}).then(function(like) {
        like.setUser(who);
        like.setMessage(current);
      })
    })
  });
};

function searchGlance (something){
  return Like.findAll({
    where: {
      messageId: something
    },
    include: [ User, Message ]
  })
};

module.exports = {
  Like: Like,
  createLike: createLike,
  searchGlance: searchGlance,
}
