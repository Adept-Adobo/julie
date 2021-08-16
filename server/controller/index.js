const model = require('../model');

module.exports = {
  getProducts: (req, res) => {
    const { count, page } = req.query;
    model.getProducts(count, page)
      .then((data) => {
        res.send(data.rows).status(200);
      })
      .catch((err) => {
        console.error(err.stack);
        res.sendStatus(404);
      });
  },
  getProductById: (req, res) => {
    const { id } = req.params;
    model.getProductInfo(id)
      .then((data) => {
        if (data.rows.length === 0) {
          res.status(404).send('This product does not exist.');
        }
        res.send(data.rows[0]).status(200);
      })
      .catch((err) => {
        console.error(err.stack);
        res.sendStatus(404);
      });
  },

  getStyles: (req, res) => {
    const { id } = req.params;
    model.getProductStyles(id)
      .then((data) => {
        if (data.rows.length === 0) {
          res.status(404).send('This product does not exist.');
        } else {
          res.send(data.rows[0]).status(200);
        }
      })
      .catch((err) => {
        console.error(err.stack);
        res.sendStatus(404);
      });
  },

  getRelated: (req, res) => {
    const { id } = req.params;
    model.getRelatedProducts(id)
      .then((data) => {
        if (data.rows.length === 0) {
          res.status(200).send(data.rows);
        } else {
          res.status(200).json(data.rows[0].results);
        }
      })
      .catch((err) => {
        console.error(err.stack);
        res.sendStatus(404);
      });
  },
};
