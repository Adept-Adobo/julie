const express = require('express');
// const db = require('./db');
const controller = require('./controller');

const app = express();
const port = 3000;

app.get('/products', controller.get);

app.get('/products/:id', controller.getProduct);

app.get('/products/:id/styles', controller.getStyles);

app.get('/products/:id/related', controller.getRelated);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
