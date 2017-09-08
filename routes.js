const User = require('./users');
const Message = require('./messages');
// const Like = require('/.likes');

function gabbleRoutes(app){
  // Renders a page to the original path from homepage.mustache
  // Access to page where current and potential users are greeted with a message
  // that they have to sign in to view all gabbles/messages and other users
  // Otherwise, they will be redirected back to the homepage
  app.get('/', function(req, res){
      res.render('index');
  });

  // A trending page of all messages is available when users sign in
  app.get('/trending', function(req, res){
    Message.trendingMessage().then(function(stuff){
      res.render('trending', {
        whatsTrending: stuff,
      });
    })
  });

  // Access to log in page for current users
  app.get('/login', function(req, res){
    res.render('login');
  });

  // DONE Creates a form to log in and get access to Gabbit
  app.post('/form_login', function(req, res){
    User.findUser(req.body.form_login_Name, req.body.form_login_Password)
      .then(function (user) {
        if (user === null) {
          res.redirect('/register');
        } else {
          res.redirect('/welcome');
        }
      });
  });

  // Access to sign up page for new users
  app.get('/register', function(req, res){
    res.render('register');
  });

  // DONE Creates a form to create an account and get access to Gabbit
  app.post('/form_register', function(req, res){
    User.registerUser(req.body.form_register_Name, req.body.form_register_Password, req.body.form_register_Avatar)
      .then(function () {
          res.redirect('/trending');
        })
  });

  // Renders the homepage itself as homepage just so it won't show any
  // errors as "cannot get homepage"
  app.get('/homepage', function(req, res){
    res.render('homepage');
  });

  // Access to page where users can create new gabbles/gabbits
  app.get('/newgab', function(req, res){
    res.render('message');
  });

  // Form for users to create a new message/gabble to post
  app.post('/form_message', function(req, res){
    Message.createMessage(req.body.form_new_Message)
    .then(function(){
      res.redirect('trending');
    })
  });

};

module.exports = {
  staticRoutes: gabbleRoutes,
};
