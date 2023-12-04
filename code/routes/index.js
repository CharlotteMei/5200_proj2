var express = require('express');
var router = express.Router();
const { readAllProducts } = require('../db/mongo_queries.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* product page. */
router.get('/products', async function(req, res, next) {
  const products = await readAllProducts();
  console.log(products);
  res.render('products', {products: products});
});

/* product add page. */

/* product edit page. */


/* rack page. */
router.get('/:userId/rack', function(req, res, next) {
  res.render('rack', {userId: req.params.userId});
});

/* rack add page. */

/* rack edit page. */

module.exports = router;
