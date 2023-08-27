import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imgURI: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  arrayImg: [{ type: String }],
  buys: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

productSchema.index({ category: 1 });

export default mongoose.model('Products', productSchema);