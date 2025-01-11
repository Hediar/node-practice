const path = require('path');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = `mongodb+srv://my_atlas_user:${process.env.MONGODB_PASSWORD}@cluster0.4ytaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer().single('image'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}));
app.use(csrfProtection);
app.use(flash());

// 모든 페이지에 인증 토큰 추가
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});


app.use((req, res, next) => {
  if(!req.session.user){ 
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
})

app.use((req, res, next) => {
  User.findById('675eabd96556ac9336bf8d61') // 임의의 사용자 
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500); // 500 error 발생할 경우 res.redirect('/500') 사용하여 redirect

app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(); // error 다루기 
  res.redirect('/500');
}); // 순서가 가장 마지막으로 

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
