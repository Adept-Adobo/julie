const db = require('../db');

module.exports = {
  getProducts: (count, page = 1) => {
    const offset = page * 5 - count;
    const queryParams = [count, offset];
    return db.query('SELECT * from products limit $1 offset $2', queryParams);
  },

  getProductInfo: (productId) => {
    const queryString = 'SELECT p.*, CASE WHEN count(f) = 0 THEN ARRAY[]::json[] ELSE array_agg(f.feature) END as features '
    + 'FROM products p '
    + "LEFT OUTER JOIN (SELECT f1.product_id, json_build_object('feature', f1.feature, 'value', f1.value) as feature FROM features f1) as f "
    + 'ON p.id = f.product_id WHERE p.id = $1 GROUP BY p.id;';
    return db.query(queryString, [productId]);
  },

  getProductStyles: (productId) => {
    // const queryString = 'SELECT product_id, array_agg(styles) FROM styles s JOIN (SELECT * from photos) as p ON s.id = p.style_id WHERE s.product_id = $1';
    // const queryString = "SELECT styles.product_id, array_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url'), photos.url) as photos FROM photos WHERE style_id IN (SELECT id FROM styles where product_id = $1) GROUP BY style_id;";
    // const queryString = "SELECT *, json_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size)) as skus from skus where style_id in (SELECT id from styles WHERE product_id=$1) GROUP BY style_id;";
    const queryString = 'SELECT * from skus where style_id in (SELECT id from styles WHERE product_id=$1);';
    return db.query(queryString, [productId]);
  },

  getRelatedProducts: (productId) => {
    const queryString = 'SELECT array_agg(related_product_id) as results FROM related '
    + 'WHERE product_id = $1 GROUP BY product_id';
    return db.query(queryString, [productId]);
  },

};
