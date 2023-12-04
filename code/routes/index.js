var express = require('express');
var router = express.Router();
const { readAllProducts, createProduct } = require('../db/mongo_queries.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* product page. */
router.get('/products', async function(req, res, next) {
  const products = await readAllProducts();
  // console.log(products);
  res.render('products', {products: products});
});

/* product add page. */
router.get('/products/add', function(req, res, next) {
  res.render('product_add');
});

router.post('/products/add', async function(req, res, next) {
  const result = await createProduct(req.body);
  console.log(result)
  res.redirect('/products');
});

/* product edit page. */

/* product delete. */


/* rack page. */
router.get('/:userId/rack', function(req, res, next) {
  res.render('rack', {userId: req.params.userId});
});

/* rack add page. */

/* rack edit page. */

module.exports = router;
