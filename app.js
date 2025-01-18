const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded -> form post 요청의 기본 데이터 형식
app.use(bodyParser.json()); // application/json 형식 -> 들어오는 json 데이터 parse

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // 두번째건 어떤 도메인인지 작성, *면 전체
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // 특정 데이터에 액세스 허용, 외부에서 사용 가능하도록 하려는 메서드만 작성
    res.setHeader('Access-Control-Allow-Headers', '*'); // 클라이언트가 요청에 설정할 수 있는 헤더
    // -> Content-Type 이랑 Authorization은 필수로 추가
    next();
});

app.use('/feed', feedRoutes); // /feed로 시작하는 요청은 feedRoutes로 

app.listen(8080);
