const express = require('express');
const { Login, Register } = require('../controllers/auth.controller');
const adminProductController = require('../controllers/admin/product.controller');
const adminCartController = require("../controllers/admin/cart.controller");
const cartController = require("../controllers/product/cart.controller");
const productController = require("../controllers/product/product.controller");

const router = express.Router();


//----------Admin Routes

//products
router.get('/admin/products', adminProductController.GetProducts);
router.get('/admin/products/:id', adminProductController.GetProductById);
router.post('/admin/products', adminProductController.CreateProduct);
router.put('/admin/products', adminProductController.UpdateProduct);
router.delete('/admin/products', adminProductController.DeleteProduct);

//carts
router.get("/admin/cart", adminCartController.GetCart);
router.get("/admin/cart/:id", adminCartController.GetCartById);
router.delete("/admin/cart", adminCartController.DeleteCart);


//-----------Other Routes

//product
router.get("/products", productController.GetProducts);
router.get("/products/:id", productController.GetProductById);


//cart
router.get("/cart", cartController.GetCart);
router.get("/cart/:id", cartController.GetCartById);
router.get("/cart/users/:user_id", cartController.GetUserCarts);
router.post("/cart", cartController.CreateCart);
router.put("/cart", cartController.UpdateCart);
router.delete("/cart", cartController.DeleteCart);



//Auth Routes
router.post('/register', Register);
router.post('/login', Login);



module.exports = router;