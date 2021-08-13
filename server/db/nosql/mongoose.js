// using mongoose

const productsSchema = new Schema({
  id: {type: Number, unique: true},
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: String,
  updated_at: String,
  features: [{ feature: String, value: String }],
  related: [Number],
  styles: [stylesSchema]
});

const stylesSchema = new Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default: Boolean,
  photos: [{thumbnail_url: String, url: String}],
  skus: [{sku_id: Number, quantity: Number, size: Number}]
});
