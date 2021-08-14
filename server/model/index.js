const db = require('../db');

module.exports = {
  getProducts: (count, page = 1) => {
    const offset = page * 5 - count;
    const queryParams = [count, offset];
    return db.query('SELECT * from products limit $1 offset $2', queryParams);
  },
  getProductInfo: () => {
    const queryString = 'SELECT * from features limit 20;';
    // const queryString = 'SELECT p.*, CASE WHEN count(f) = 0 THEN ARRAY[]::json[] ELSE array_agg(f.features) END AS features FROM products p JOIN (SELECT f1.product_id, json_build_object("feature",f1.feature, "value", f1.value) as features FROM features f1) as f ON p.id = f.product_id WHERE p.id=2 GROUP BY p.id;';
    return db.query(queryString);
  },
};
