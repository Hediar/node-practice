const User = require('../models/user');

module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }

  if (!req.session.user) {
    return res.redirect('/login');
  }

  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return res.redirect('/login'); 
      }
      req.user = user; 
      next(); 
    })
    .catch(err => {
      console.error('Error fetching user:', err);
      res.redirect('/login');
    });
};