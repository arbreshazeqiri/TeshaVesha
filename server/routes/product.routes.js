const productController = require('../controllers/product.controller');

module.exports = (app) => {
  app.get('/api/products', productController.getProducts);
  app.get('/api/products/:id', productController.getProductById);
  app.get('/api/products-by-user/:username', productController.getProductsByUser);
  app.post('/api/products', productController.createProduct);
  app.put('/api/products/:id', productController.updateProduct);
  app.delete('/api/products/:id', productController.deleteProduct);
};