const express = require('express');
const controller = require('./controller');

const app = express();
const port = 3000;

app.get('/products', controller.getProducts);

app.get('/products/:id', controller.getProductById);

app.get('/products/:id/styles', controller.getStyles);

app.get('/products/:id/related', controller.getRelated);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
