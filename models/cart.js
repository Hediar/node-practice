const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
    // 장바구니는 1개 
  static addProduct(id, productPrice) {
    // 이전 카트 확인 cart.json
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // 상품이 있었던건지 확인
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1; // 개수증가
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 }; // 고유 id, 개수
        cart.products = [...cart.products, updatedProduct];
      }
      // 장바구니 갱신
      cart.totalPrice = cart.totalPrice + +productPrice; // +는 숫자 변환
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
};
