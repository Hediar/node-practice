const products = [];
// 파일에 저장하기
const fs = require('fs');
const path = require('path');

module.exports = class Product{
    constructor(t){
        this.title = t;
    }
    save(){
        products.push(this);
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            let products =[];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {console.log(err);});
        }); // 전체 파일 읽기
    }

    static fetchAll(cb) { // 제품 반환
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            } 
            cb(JSON.parse(fileContent));
        })
    }
    /**
     * fetchAll -> 함수 실행 -> 제품 나옴 -> 해당 제품을 통해 응답 렌더링
     */
}