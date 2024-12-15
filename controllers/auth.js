const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1] === 'true';
  // console.log(req.session);
  /**
   * Session {
    cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
    }
   */
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly'); 
  // 쿠키 설정 key-value, Expires(Max-Age) : 쿠키 만료일 설정
  // Domain:  쿠키 전달, Secure: HTTPS를 통해 페이지가 제공될 경우에만 설정
  // HttpOnly
  User.findById('675ea65fe08f1ad46d709bb4')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    res.redirect('/');
  })
  .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};