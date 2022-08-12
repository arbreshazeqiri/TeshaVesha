const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A product title is required.'],
      maxlength: [40, 'Product title should be no more than 40 characters.'],
    },
    description: {
      type: String,
      required: [true, 'A product description is required.'],
      maxlength: [200, 'Product description should be no more than 200 characters.']
    },
    location: {
      type: String,
      required: [true, 'A product location is required.'],
    },
    category: {
      type: String,
      required: [true, 'A product category is required.'],
    },
    condition: {
      type: String,
      required: [true, 'A product condition description is required.'],
    },
    delivery: {
      type: String,
      required: [true, 'A product delivery method is required.'],
    },
    price: {
      type: Number,
      min: [0, 'You cannot set a negative price for a product.'],
    },
    imageArray: [{
      type: String
  }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;