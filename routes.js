const User = require('./users');
const Message = require('./messages');
const Like = require('./likes');

function gabbleRoutes(app) {
  // Renders a page to the original path from homepage.mustache
  // Access to page where current and potential users are greeted with a message
  // that they have to sign in to view all gabbles/messages and other users
  // Otherwise, they will be redirected back to the homepage
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.post('/logout', function(req, res) {
    // this is where you need to end or destroy the current session
    // Remember to add the request.session.destroy BEFORE respond.render because JS reads from top to bottom
    req.session.destroy();
    res.render('index', {
      user: null
    });
  });

  // A trending page of all messages is available when users sign in
  // app.get('/trending', function(req, res){
  //   Message.trendingMessage().then(function(stuff){
  //     res.render('trending', {
  //       whatsTrending: stuff,
  //     });
  //   })
  // });
  app.get('/trending', function(req, res) {
    if (req.session.who !== undefined) {
      Message.trendingMessage().then(function(stuff) {
        // console.log(stuff);
        res.render('trending', {
          bigfoot: req.session.who,
          whatsTrending: stuff,
        });
      });
    } else { // if the user has not registered or signed in, they will be redirected to the index page.
      res.redirect('/');
    }
  });

  // Access to log in page for current users
  app.get('/login', function(req, res) {
    res.render('login');
  });

  // Creates a form to log in and get access to Gabbit
  // app.post('/form_login', function(req, res){
  //   User.findUser(req.body.form_login_Name, req.body.form_login_Password)
  //     .then(function (user) {
  //       if (user === null) {
  //         res.redirect('/register');
  //       } else {
  //         res.redirect('/welcome');
  //       }
  //     });
  // });
  app.post('/form_login', function(req, res) {
    User.findUser(req.body.form_login_Name, req.body.form_login_Password)
      .then(function(user) {
        if (user === null) { // if this user doesn't exist
          res.redirect('/register');
        } else { // if there is a user
          req.session.who = user;
          res.redirect('/trending');
        }
      });
  });

  // Access to sign up page for new users
  app.get('/register', function(req, res) {
    res.render('register');
  });

  // Creates a form to create an account and get access to Gabbit
  app.post('/form_register', function(req, res) {
    User.registerUser(req.body.form_register_Name, req.body.form_register_Password, req.body.form_register_Avatar)
      .then(function() {
        // req.session.who;
        res.redirect('/trending');
      })
  });

  // Renders the homepage itself as homepage just so it won't show any
  // errors as "cannot get homepage"
  app.get('/homepage', function(req, res) {
    res.render('homepage');
  });

  // Access to page where users can create new gabbles/gabbits
  app.get('/newgab', function(req, res) {
    res.render('message');
  });

  // Form for users to create a new message/gabble to post
  // app.post('/form_message', function(req, res){
  //   Message.createMessage(req.body.form_new_Message)
  //   .then(function(){
  //     res.redirect('trending');
  //   })
  // });
  app.post('/form_message', function(req, res) {
    if (req.session.who !== null) { // if there is a user, then allow them access to message/gabble to write
      console.log(req.session.who);
      Message.createMessage(req.body.form_new_Message, req.session.who)
        .then(function() {
          res.redirect('trending');
        })
    }
  });

  // Button for users to like a gabble/message
  app.post('/likes/:messageId', function(req, res){
    id = parseInt(req.params.messageId);
    Like.createLike(req.session.who, id).then(function(){
      res.redirect('/trending');
    })
  });

  // Access the single message for current users
  app.get('/atglance/', function(req, res) {
    // console.log(req.query.id);
    id = req.query.id;

    // Like.searchGlance(id).then(function(venus){
      // console.log(venus);
    //
    //   // console.log(venus[Like.user.user]);
    //   // console.log(venus[Like.message.user]);
    //   // console.log(venus[like].dataValues);
    //   // console.log(venus[like]);
    //   // console.log(venus.like);
    //   // console.log(venus.dataValues);
    //   // console.log(venus.user);
    //
    //   // console.log(venus[0].message);
    // })
    if (req.session.who !== undefined) {
    Like.searchGlance(id).then(function(venus){
      console.log(venus)
      res.render('atglance', {
        littlefoot: req.session.who,
        glanceTrending: venus,
      });
    });
    } else { // if the user has not registered or signed in, they will be redirected to the index page.
    res.redirect('/');
    }
  });
};


// <p>{{ #glanceTrending}}
//   {{ message.gabMessage }}
// {{ /glanceTrending }}</p>

// <p>{{ glanceTrending.gabMessage }}</p>
// <p>{{ message.gabMessage }}</p>

// <p>{{ #glanceTrending.message}}{{ /glanceTrending.message }}</p>
// <p>{{ #glanceTrending }} {{ /glanceTrending }}</p>

// {{# glanceTrending.message.dataValues.gabMessage }}
// {{/ glanceTrending.message.dataValues.gabMessage }}

// {{ # glanceTrending }}
//
// {{ / glanceTrending }}

module.exports = {
  staticRoutes: gabbleRoutes,
};
