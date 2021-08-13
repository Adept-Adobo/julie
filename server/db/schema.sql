DROP DATABASE IF EXISTS products_db;
CREATE DATABASE products_db;
\c products_db;

DROP TABLE IF EXISTS products;
CREATE TABLE products
(
  id INT NOT NULL UNIQUE,
  name VARCHAR(30),
  slogan VARCHAR(150),
  description VARCHAR(500),
  category TEXT,
  default_price NUMERIC(11, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);

-- INSERT INTO products(id, name, slogan, description, category, default_price) VALUES(1, 'Camo Onesie', 'Blend in to your crowd', 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.', 'Jackets', 140);

DROP TABLE IF EXISTS product_features;
CREATE TABLE product_features
(
  id INT NOT NULL UNIQUE,
  product_id INT REFERENCES products (id),
  feature VARCHAR(30),
  value VARCHAR(30),
  PRIMARY KEY(id)
);

-- INSERT INTO product_features(id, product_id, feature, value) VALUES(1,1,'Fabric','Canvas');

DROP TABLE IF EXISTS product_styles;
CREATE TABLE product_styles
(
  id INT NOT NULL UNIQUE,
  product_id INT REFERENCES products (id),
  name VARCHAR(30),
  sale_price NUMERIC(11, 2),
  original_price NUMERIC(11, 2),
  default_style BOOLEAN, --will need to convert to bool later
  PRIMARY KEY(id)
);

-- INSERT INTO product_styles(id, product_id, name, sale_price, original_price, default_style) VALUES (1,1,'Forest Green & Black',null,140,1);

DROP TABLE IF EXISTS product_photos;
CREATE TABLE product_photos
(
  id INT NOT NULL UNIQUE,
  style_id INT REFERENCES product_styles (id),
  thumbnail_url VARCHAR(260),
  url VARCHAR(260),
  PRIMARY KEY(id)
);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus
(
  id INT NOT NULL UNIQUE,
  style_id INT REFERENCES product_styles (id),
  size VARCHAR(10),
  quantity SMALLINT,
  PRIMARY KEY(id)
);

-- INSERT INTO skus(id, style_id, size, quantity) VALUES(1,1,'XS',8);

DROP TABLE IF EXISTS related;
CREATE TABLE related
(
  id INT NOT NULL UNIQUE,
  product_id INT REFERENCES products (id),
  related_product_id INT,
  PRIMARY KEY(id)
);

-- INSERT INTO related(id, product_id, related_product_id) VALUES(1,1,2);

DROP TABLE IF EXISTS cart;
CREATE TABLE cart
(
  id SERIAL NOT NULL UNIQUE,
  user_session TEXT,
  sku_id INT REFERENCES skus (id),
  ACTIVE SMALLINT,
  PRIMARY KEY(id)
);

-- Insert the data
\COPY products(id, name, slogan, description, category, default_price) FROM '/Users/juliebarwick/hacker/products/data/product.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY product_features FROM '/Users/juliebarwick/hacker/products/data/features.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY product_styles FROM '/Users/juliebarwick/hacker/products/data/styles.csv' WITH (FORMAT CSV, DELIMITER ',', NULL 'null', HEADER);
\COPY product_photos FROM '/Users/juliebarwick/hacker/products/data/photosfixed.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY related FROM '/Users/juliebarwick/hacker/products/data/related.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY skus FROM '/Users/juliebarwick/hacker/products/data/skus.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY cart FROM '/Users/juliebarwick/hacker/products/data/cart.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);

-- Make indices
CREATE INDEX products_idx ON products (id);
CREATE INDEX product_features_idx ON product_features (product_id);
CREATE INDEX product_styles_idx ON product_styles (product_id);
CREATE INDEX product_photos_idx ON product_photos (style_id);
CREATE INDEX skus_idx ON skus (style_id);
CREATE INDEX related_idx ON related (product_id);
