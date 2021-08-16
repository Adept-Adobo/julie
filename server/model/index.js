const db = require('../db');

module.exports = {
  getProducts: (count = 5, page = 1) => {
    const offset = (page * 5) - 5;
    const queryParams = [count, offset];
    const queryString = 'SELECT * FROM products LIMIT $1 OFFSET $2';

    return db.query(queryString, queryParams);
  },

  getProductInfo: (productId) => {
    const queryString = `SELECT p.*, CASE WHEN COUNT(f) = 0 THEN ARRAY[]::json[] ELSE array_agg(f.feature) END
      AS features FROM products p
      LEFT OUTER JOIN (
        SELECT f1.product_id,
          json_build_object('feature', f1.feature, 'value', f1.value)
          AS feature FROM features f1) AS f
      ON p.id = f.product_id WHERE p.id = $1 GROUP BY p.id;`;
    return db.query(queryString, [productId]);
  },

  getProductStyles: (productId) => {
    const queryString = `SELECT CAST(s.product_id AS TEXT), array_agg(
        json_build_object('style_id', s.id, 'name', s.name, 'original_price', CAST(s.original_price AS TEXT), 'sale_price', CAST(s.sale_price AS TEXT), 'default?', s."default?", 'photos', (SELECT json_agg(json_build_object('thumbnail_url', ph.thumbnail_url, 'url', ph.url)) AS photos FROM photos ph WHERE s.id = ph.style_id), 'skus',
        (SELECT json_object_agg(sk.id, json_build_object('quantity', sk.quantity, 'size', sk.size)) AS skus FROM skus sk WHERE s.id = sk.style_id)))
      AS results FROM styles s
      WHERE product_id = $1
      GROUP BY s.product_id;`;
    return db.query(queryString, [productId]);
  },

  getRelatedProducts: (productId) => {
    const queryString = 'SELECT array_agg(related_product_id) as results FROM related '
    + 'WHERE product_id = $1 GROUP BY product_id';
    return db.query(queryString, [productId]);
  },

};
