const products = [];
// 파일에 저장하기
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (cb) => { // fetchAll에서 하는일 옮김
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else{
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product{
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
      }
    save(){
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) { // 제품 반환
      getProductsFromFile(cb);
    }
    /**
     * fetchAll -> 함수 실행 -> 제품 나옴 -> 해당 제품을 통해 응답 렌더링
     */

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        }); // 파일 전체 읽기
    }
}