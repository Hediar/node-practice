const express = require('express');

const feedRoutes = require('./routes/feed');

const app = express();

app.use('/feed', feedRoutes); // /feed로 시작하는 요청은 feedRoutes로 

app.listen(8080);
