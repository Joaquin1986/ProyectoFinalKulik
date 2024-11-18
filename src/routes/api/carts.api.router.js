// Se realizan los imports mediante 'require', de acuerdo a lo visto en clase
const { Router } = require('express');
const { CartControllers } = require('../../controllers/cart.controllers');
const { passportCallBack } = require('../../passport/passportCallBack');
const { verifyOwnCart } = require('../../passport/verifyOwnCart');

const cartsApiRouter = Router();

cartsApiRouter.get("/carts/:cid", passportCallBack('current'), verifyOwnCart(), CartControllers.getCartById);

cartsApiRouter.post("/carts/:cid/purchase", passportCallBack('current'), verifyOwnCart(), CartControllers.purchaseCart);

cartsApiRouter.put("/carts/:cid/products/:pid", passportCallBack('current'), verifyOwnCart(), CartControllers.updateCartByProduct);

cartsApiRouter.put("/carts/:cid", passportCallBack('current'), verifyOwnCart, CartControllers.updateCart);

cartsApiRouter.delete("/carts/:cid", passportCallBack('current'), verifyOwnCart, CartControllers.deleteCart);

// Elimina un producto de un carrito
cartsApiRouter.delete("/carts/:cid/products/:pid", passportCallBack('current'), verifyOwnCart, CartControllers.deleteProductFromCart);

module.exports = cartsApiRouter;