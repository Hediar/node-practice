const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {prods: products, pageTitle: 'Shop', path: '/', hasProducts: products.length > 0, activeShop: true, productCSS: true, layout: false});
    // 두번째 변수는 템플릿으로 데이터 전달
});

module.exports = router;
