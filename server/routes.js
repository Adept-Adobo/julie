const router = require('express').Router();
const controller = require('./controller');

router.get('/products', controller.getProducts);

router.get('/products/:id', controller.getProductById);

router.get('/products/:id/styles', controller.getStyles);

router.get('/products/:id/related', controller.getRelated);

module.exports = router;
