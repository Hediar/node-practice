const products = [];
// 파일에 저장하기
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

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
    constructor(id, title, imageUrl, description, price) {
        this.id = id; // 수정일 경우 id 존재
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
      }
      save() {
        getProductsFromFile(products => {
          if (this.id) {
            const existingProductIndex = products.findIndex(
              prod => prod.id === this.id
            );
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
              console.log(err);
            });
          } else {
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
            });
          }
        });
      }

    static deletebyId(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
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