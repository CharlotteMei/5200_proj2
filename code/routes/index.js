var express = require('express');
var router = express.Router();
const { readAllProducts, readProduct, createProduct, deleteProduct, updateProduct } = require('../db/mongo_queries.js');

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
  console.log("Create product, result =", req.body);
  res.redirect('/products');
});

/* product edit page. */
router.get('/products/:id/edit', function(req, res, next) {
  console.log("Edit product with id = ", req.params.id);
  productItem = readProduct(req.params.id);
  res.render('product_edit');
});

router.post('/products/:id/edit', async function(req, res, next) {
  const result = await updateProduct(req.body);
  console.log("Edit product, result =", req.body);
  res.redirect('/products');
});

/* product delete. */
router.get('/products/:id/delete', async function(req, res, next) {
  console.log("Delete product with id = ", req.params.id);
  const result = await deleteProduct(req.params.id);
  console.log("Delete product, result =", result);
  res.redirect('/products');
});


/* rack page. */
router.get('/:userId/rack', function(req, res, next) {
  res.render('rack', {userId: req.params.userId});
});

/* rack add page. */

/* rack edit page. */

module.exports = router;
