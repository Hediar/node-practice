const path = require('path');

module.exports = path.dirname(process.mainModule.filename);
// app이 실행될 수 있도록 해주는 파일경로 알려줌 