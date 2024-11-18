const { CartDao } = require('../dao/cart.dao');
const { ProductDao } = require('../dao/product.dao');
const { Ticket, TicketDao } = require('../dao/ticket.dao');

class CartServices {

    static async addProductToCart(cid, pid, quantity) {
        try {
            return await CartDao.addProductToCart(cid, pid, quantity);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo agregar el producto #${pid} al carrito #${cid} => error: ${error.message}`)
        }
    }

    static async getCartById(id) {
        try {
            return await CartDao.getCartById(id);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el carrito #${id} => error: ${error.message}`)
        }
    }

    static async deleteCart(id) {
        try {
            return await CartDao.deleteCart(id);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo borrar el carrito #${id} => error: ${error.message}`)
        }
    }

    static async deleteProductFromCart(cid, pid) {
        try {
            const cartExists = await CartDao.getCartById(cid);
            if (!cartExists)
                return {
                    "error": true,
                    "code": 400,
                    "reason": `Carrito #${cid} inexistente`
                };
            const isProductInCart = await CartDao.isProductInCart(cid, pid);
            if (isProductInCart) {
                const result = await CartDao.deleteProductFromCart(cid, pid);
                const newCart = await CartDao.getPopulatedCartById(cid);
                if (result)
                    return {
                        "error": false,
                        "code": 201,
                        'productRemoved': pid, 'fromCart': cid,
                        "remainingProducts": newCart.products
                    }
            }
            return {
                "error": true,
                "code": 400,
                "reason": `Producto no se encuentra en el carrito #${cid}`
            }
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo borrar el producto #${pid} del carrito #${cid} => error: ${error.message}`)
        }
    }

    static async purchaseCart(cartId, purchaser) {
        try {
            let amount = 0;
            // Verificamos si el carrito existe
            const cartExists = await CartDao.getPopulatedCartById(cartId);
            const itemsNotBought = [];
            if (cartExists) {
                // Iteramos el array de productos del carrito para verificar el stock de c/u y sumar cantidad
                const products = Object.values(cartExists.products);
                let index = 0;
                if (products.length === 0) {
                    return ({
                        "error": true,
                        "reason": "Carrito vacío"
                    });
                }
                products.forEach(async (product) => {
                    const isStock = await ProductDao.verifyProductStock(product.product._id, product.quantity);
                    if (isStock) {
                        const indexToDelete = Object.values(cartExists.products).findIndex((prod) => {
                            if (prod.product._id === product.product._id) return prod.product._id;
                            else return -1;
                        });
                        amount += product.product.price * product.quantity;
                        await ProductDao.updateProductStock(product.product._id, product.quantity);
                        cartExists.products.splice(indexToDelete, 1);
                    } else {
                        itemsNotBought.push(product.product._id);
                        console.error("⛔ No hay stock suficiente de " + product.product.title);
                    }
                    if (index === (products.length - 1)) {
                        await cartExists.save();
                        const newTicket = new Ticket(amount, purchaser);
                        const result = await TicketDao.addTicket(newTicket);
                        return ({
                            "error": false,
                            "ticket": result._id,
                            "itemsNotBought": itemsNotBought
                        });
                    }
                    index++;
                });
            } else
                return ({
                    "error": true,
                    "reason": "Carrito no válido"
                });

        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el carrito #${cartId} => error: ${error.message}`);
        }
    }

    static async updateCart(cid, products) {
        try {
            let totalResult = [];
            let count = 0;
            while (count < products.length) {
                if (products[count].product && products[count].quantity) {
                    try {
                        if (parseInt(products[count].quantity) < 1)
                            totalResult.push({ ...products[count], "result": "error: cantidad no válida" });
                        else {
                            const result = await CartDao.addProductToCart(cid, products[count].product, products[count].quantity);
                            if (result && result !== -1) totalResult.push({ ...products[count], "result": "success: producto agregado exitosamente" });
                            else if (result && result === -1) totalResult.push({ ...products[count], "result": "error: stock insuficiente" });
                            else totalResult.push({ ...products[count], "result": "error: producto inexistente" });
                        }
                    } catch (error) {
                        totalResult.push({ ...products[count], "result": "error:" + error.message });
                    }
                }
                else totalResult.push({ ...products[count], "result": "error: objeto incorrecto o mal formado" });
                count++;
            }
            return totalResult;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo actualizar el carrito #${cid} => error: ${error.message}`);
        }
    }

    static async updateCartByProduct(cartId, productId, quantity) {
        try {
            const result = await CartDao.addProductToCart(cartId, productId, quantity);
            if (result === -1) {
                return {
                    "error": true,
                    "code": 400,
                    "reason": "stock insuficiente"
                }
            }
            if (result) {
                return {
                    "error": false,
                    "code": 200,
                    "reason": "+" + quantity + " de producto #" + productId + " en carrito #" + cartId
                }
            }
            if (!result) {
                return {
                    "error": true,
                    "code": 404,
                    "reason": "producto o carrito inexistente"
                }
            }
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo actualizar el carrito #${cartId} => error: ${error.message}`);
        }
    }

}

module.exports = { CartServices };