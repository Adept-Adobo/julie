const pool = require('../db');

module.exports = {
  getProducts: async (count = 5, page = 1) => {
    // handle non-number query input: revert to defaults
    let limit = count;
    let offset = page;
    if (Number.isNaN(Number(limit))) {
      limit = 5;
    }
    if (Number.isNaN(Number(offset))) {
      offset = 0;
    } else {
      offset = (page - 1) * count;
    }

    const queryParams = [limit, offset];
    const queryString = 'SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2';

    const client = await pool.connect();
    try {
      return await client.query(queryString, queryParams);
    } finally {
      client.release();
    }
  },

  getProductInfo: async (productId) => {
    const queryString = `SELECT p.*, CASE WHEN COUNT(f) = 0 THEN ARRAY[]::json[] ELSE array_agg(f.feature) END
      AS features FROM products p
      LEFT OUTER JOIN (
        SELECT f1.product_id,
          json_build_object('feature', f1.feature, 'value', f1.value)
          AS feature FROM features f1) AS f
      ON p.id = f.product_id WHERE p.id = $1 GROUP BY p.id;`;

    const client = await pool.connect();
    try {
      return await client.query(queryString, [productId]);
    } finally {
      client.release();
    }
  },

  getProductStyles: async (productId) => {
    const queryString = `SELECT CAST(s.product_id AS TEXT), array_agg(
      json_build_object('style_id', s.id, 'name', s.name, 'original_price', CAST(s.original_price AS TEXT), 'sale_price', CAST(s.sale_price AS TEXT), 'default?', s."default?", 'photos',
        (SELECT CASE WHEN COUNT(ph) = 0 THEN ARRAY[json_build_object('thumbnail_url', NULL, 'url', NULL)]::json[]
          ELSE array_agg(json_build_object('thumbnail_url', ph.thumbnail_url, 'url', ph.url)) END
        AS photos FROM photos ph WHERE s.id = ph.style_id), 'skus',
          (SELECT CASE WHEN COUNT(sk) = 0 THEN json_build_object('null', json_build_object('quantity', NULL, 'size', NULL))
            ELSE json_object_agg(sk.id, json_build_object('quantity', sk.quantity, 'size', sk.size)) END AS skus FROM skus sk WHERE s.id = sk.style_id)))
        AS results FROM styles s
      WHERE product_id = $1
      GROUP BY s.product_id;`;

    const client = await pool.connect();
    try {
      return await client.query(queryString, [productId]);
    } finally {
      client.release();
    }
  },

  getRelatedProducts: async (productId) => {
    const queryString = 'SELECT array_agg(related_product_id) as results FROM related '
    + 'WHERE product_id = $1 GROUP BY product_id';

    const client = await pool.connect();
    try {
      return await client.query(queryString, [productId]);
    } finally {
      client.release();
    }
  },

};
