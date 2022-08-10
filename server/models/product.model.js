const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'product title is required'],
      maxlength: [40, 'The title length should be no more than 40 characters!!'],
    },
    genre: {
      type: String,
      required: [true, 'A product genre is required!!'],
      enum: [
        'Comedy',
        'Drama',
        'Horror',
        'Sci-Fi',
        'Fantasy',
        'Action',
        'Family',
        'Animated',
        'Documentary',
        'Romcom',
        'Silent Product',
        'Thriller',
        'Crime Noir',
        'French Cinema',
      ],
    },
    boxArt: {
      type: String,
      required: [true, 'Product boxArt is required'],
    },
    duration: {
      type: String,
      default: 'N/A',
    },
    rating: {
      type: String,
      required: [true, 'Product rating is required'],
      enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
    },
    actors: { type: [String] },
    isKidFriendly: {
      type: Boolean,
      default: false,
    },
    releaseYear: {
      type: Number,
      min: [1922, 'TOO OLD'],
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