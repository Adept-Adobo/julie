DROP DATABASE IF EXISTS products_db;
CREATE DATABASE products_db;
\c products_db;

DROP TABLE IF EXISTS products;
CREATE TABLE products
(
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30),
  "slogan" VARCHAR(150),
  "description" VARCHAR(500),
  "category" TEXT,
  "default_price" NUMERIC(11, 2),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS features;
CREATE TABLE features
(
  "id" SERIAL PRIMARY KEY,
  "product_id" INT,
  "feature" VARCHAR(30),
  "value" VARCHAR(30)
);

DROP TABLE IF EXISTS styles;
CREATE TABLE styles
(
  "id" SERIAL PRIMARY KEY,
  "product_id" INT,
  "name" VARCHAR(30),
  "sale_price" NUMERIC(11, 2),
  "original_price" NUMERIC(11, 2),
  "default?" BOOLEAN
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos
(
  "id" SERIAL PRIMARY KEY,
  "style_id" INT,
  "url" VARCHAR(260),
  "thumbnail_url" VARCHAR(260)
);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus
(
  "id" SERIAL PRIMARY KEY,
  "style_id" INT,
  "size" VARCHAR(10),
  "quantity" SMALLINT
);

DROP TABLE IF EXISTS related;
CREATE TABLE related
(
  "id" SERIAL PRIMARY KEY,
  "product_id" INT,
  "related_product_id" INT
);

DROP TABLE IF EXISTS cart;
CREATE TABLE cart
(
  "id" SERIAL PRIMARY KEY,
  "user_session" TEXT,
  "sku_id" INT,
  "active" SMALLINT
);

-- Insert the data
\COPY products(id, name, slogan, description, category, default_price) FROM '/Users/juliebarwick/hacker/products/data/product.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY features FROM '/Users/juliebarwick/hacker/products/data/features.csv' WITH (FORMAT CSV, DELIMITER ',', NULL 'null', HEADER);
\COPY styles FROM '/Users/juliebarwick/hacker/products/data/styles.csv' WITH (FORMAT CSV, DELIMITER ',', NULL 'null', HEADER);
\COPY photos FROM '/Users/juliebarwick/hacker/products/data/photosfixed.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY related FROM '/Users/juliebarwick/hacker/products/data/related.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY skus FROM '/Users/juliebarwick/hacker/products/data/skus.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY cart FROM '/Users/juliebarwick/hacker/products/data/cart.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);

-- Alter to add foreign key relationships
ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE photos ADD FOREIGN KEY (style_id) REFERENCES styles (id);
ALTER TABLE skus ADD FOREIGN KEY (style_id) REFERENCES styles (id);
ALTER TABLE related ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE cart ADD FOREIGN KEY (sku_id) REFERENCES skus (id);

-- Make indices
CREATE INDEX products_idx ON products (id);
CREATE INDEX features_idx ON features (product_id);
CREATE INDEX styles_idx ON styles (product_id);
CREATE INDEX photos_idx ON photos (style_id);
CREATE INDEX skus_idx ON skus (style_id);
CREATE INDEX related_idx ON related (product_id);
