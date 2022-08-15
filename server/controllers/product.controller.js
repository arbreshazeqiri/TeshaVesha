const Product = require('../models/product.model');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const User = require('../models/user.model');
module.exports = {
  getProducts: (req, res) => {
    Product.find({})
      .populate('createdBy', 'username email')
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        console.log('ERROR IN Get all', err);
        res.status(400).json({ message: 'something went wrong in find all products', error: err });
      });
  },
  getProductsByUser: (req, res) => {
    console.log('IS THIS WORKING', req.params.username);
    User.findOne({ username: req.params.username }).then((user) => {
      Product.find({ createdBy: user._id })
        .populate('createdBy', 'username email')
        .then((products) => {
          console.log('MOVIESSS'.products);
          res.json([products, user]);
        })
        .catch((err) => {
          console.log('ERROR IN Get all', err);
          res.status(400).json({ message: 'something went wrong in find all products', error: err });
        })
        .catch((err) => {
          console.log('ERROR IN Get all', err);
          res.status(400).json({ message: 'something went wrong in find all products', error: err });
        });
    });
  },
  getProductById: (req, res) => {
    Product.findOne({ _id: req.params.id })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log('ERROR IN Get Product', err);
        res.status(400).json({ message: 'something went wrong in find product', error: err });
      });
  },
  createProduct: (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    Product.create({ ...req.body, createdBy: user._id })
      .then((newProduct) => {
        res.status(201).json(newProduct);
      })
      .catch((err) => {
        console.log('ERROR IN create Product', err);
        res
          .status(400)
          .json({ message: 'something went wrong in create product', errors: err.errors });
      });
  },
  updateProduct: (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log('ERROR IN update Product', err);
        res.status(400).json({ message: 'something went wrong in update product', errors: err.errors });
      });
  },
  deleteProduct: (req, res) => {
    Product.deleteOne({ _id: req.params.id })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log('ERROR IN delete Product', err);
        res.status(400).json({ message: 'something went wrong in delete product', error: err });
      });
  },
};