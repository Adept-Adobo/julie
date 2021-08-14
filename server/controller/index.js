const model = require('../model');

module.exports = {
  get: (req, res) => {
    model.getProducts(1, 3)
      .then((data) => {
        console.log(data.rows);
        res.send(data.rows).status(200);
      })
      .catch((e) => {
        console.error(e.stack);
        res.sendStatus(404);
      });
  },
  getProduct: (req, res) => {
    model.getProductInfo()
      .then((data) => {
        console.log(data.rows);
        res.send(data.rows).status(200);
      })
      .catch((e) => {
        console.error(e.stack);
        res.sendStatus(404);
      });
  },
};
