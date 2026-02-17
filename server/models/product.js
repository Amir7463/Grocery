import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,   // ✅ string not Array
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerPrice: {     // ✅ camelCase FIXED
    type: Number,
    required: true,
  },
  images: {         // ✅ plural + match frontend
    type: Array,
    required: true,
  },
  category: {       // ✅ string not Array
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model('product', productSchema);

export default Product;
