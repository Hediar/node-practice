const bcrypt = require('bcryptjs');

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

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
// email로 사용자 찾기
const email = req.body.email;
const password = req.body.password;
  User.findOne({email: email})
  .then(user => {
    if (!user) {
      return res.redirect('/login');
    }
    bcrypt
    .compare(password, user.password)
    .then(doMatch => {
      if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          console.log(err);
          return res.redirect('/');
        }); 
      }
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/login');
    });
    
  })
  .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  /**
   * 1. 사용자 validation
   * 2. 이미 있는 사용자인지 확인
   * 3. 사용자 생성
   */
  User.findOne({email: email}).then(userDoc => {
    if (userDoc) {
      // 일단 생성하지 못하게 redirect
      return res.redirect('/signup');
    }

    return bcrypt.hash(password, 12);
  })
  .then(hashPassword => {
    const user = new User({
      email: email,
      password: hashPassword,
      cart: { items: [] }
    });
    return user.save(); // 유효한 사용자 DB에 저장
  })
  .then(result => {
    res.redirect('/login');
  })
  .catch(err => {
    console.log(err)
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};