var express = require('express');
var router = express.Router();
const { readAllProducts, readProduct, createProduct, deleteProduct, updateProduct, readRack, addRackItem } = require('../db/mongo_queries.js');

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
router.get('/products/:id/edit', async function(req, res, next) {
  console.log("Edit product with id = ", req.params.id);
  const productItem = await readProduct(req.params.id);
  console.log("Reading product, result =", productItem)
  res.render('product_edit', {product: productItem});
});

router.post('/products/:id/edit', async function(req, res, next) {
  const result = await updateProduct(req.params.id, req.body);
  console.log("Edit product, result =", result);
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
router.get('/:userId/rack', async function(req, res, next) {
  const userId = req.params.userId;
  const rackItems = await readRack(userId);
  res.render('rack', {rackItems});
});

/* rack add page. */
router.get('/:userId/rack/add', async function(req, res, next) {
  const allProducts = await readAllProducts();
  console.log("All products = ", allProducts.length);
  res.render('rack_add', {userId: req.params.userId, allProducts: allProducts});
});

router.post('/:userId/rack/add', async function(req, res, next) {
  const userId = req.params.userId;
  const newRackItem = req.body
  const result = await addRackItem(userId, newRackItem);
  res.redirect('/'+userId+'/rack');
});

/* rack edit page. */

module.exports = router;
