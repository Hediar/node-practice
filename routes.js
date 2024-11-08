const fs = require('fs');


const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');

        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        }); // 특정 이벤트 듣기 
        /**
         * 새 청크가 읽힐 준비가 될 때마다 
         * 데이터 이벤트가 발생하는 데에 버퍼가 도움을 줌 
         */

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);

            const message = parsedBody.split('=')[1];
            // fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });

        /**
         * chunk를 다루기 위해 buffer 사용
         */

    }
    // process.exit();
    res.setHeader('Content-type', 'text/html'); // 응답에 헤더 붙이기, 콘텐츠 유형 HTML

    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');

    res.end(); // 이후 write/set 등 사용 x, 응답을 끝낸 뒤에는 변경 불가

};

module.exports = requestHandler;

/**
 * 내보내는 법 
 * 1. module.exports = requestHandeler
 * 
 * 2. module.exports = {
 *  handler: requestHanlder
 *  someText: 'Some hard coded text'
 * };
 * 
 * 3. module.exports.handler = requestHandler;
 * module.exports.someText = 'Some hard coded text';
 * 
 * 4. module 생략
 */