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
      type: String,
      required: [true, 'A product price is required.'],
    },
    nameOne: {
      type: String,
      required: [true, 'At least one product image is required.'],
    },
    nameTwo: {
      type: String,
    },
    nameThree: {
      type: String,
    },
    nameFour: {
      type: String,
    },
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