const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');

const app = express();

app.engine('handlebars', expressHbs()) // 설정한 이름 동일하게 사용하기
app.set('view engine', 'handlebars'); // key로 express와 연결 (pug => handlebars)
app.set('views', 'views'); //기본값이 views이지만 다른 이름으로 저장 가능

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes); // 객체로 받기
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
})

app.listen(3000);
