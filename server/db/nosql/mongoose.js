// Schema if using mongoose
const mongoose = require('mongoose');
// Open a connection to products database on our locally running instance of MongoDB
mongoose.connect('mongodb://localhost/products');

const stylesSchema = new Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default: Boolean,
  photos: [{ thumbnail_url: String, url: String }],
  skus: [{ sku_id: Number, quantity: Number, size: Number }],
});

const productsSchema = new Schema({
  id: { type: Number, unique: true },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: String,
  updated_at: String,
  features: [{ feature: String, value: String }],
  related: [Number],
  styles: [stylesSchema],
});

const Products = mongoose.model('Products', productsSchema);
