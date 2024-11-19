const { ProductDao } = require('./product.dao');
const cartModel = require('../dao/models/cart.model');
const mongoose = require('mongoose');

// Clase Cart, con su correspondiente contructor las props definidas en la consigna
class Cart {
    constructor() {
        this.products = [];
    }
}

// Clase CartDao con su constructor con un array 'products' vacío
class CartDao {

    // Devuelve el carrito como objeto plano, de acuerdo al id proporcionado por argumento
    static async getCartById(id) {
        try {
            if (mongoose.isValidObjectId(id)) {
                return await cartModel.findById(id).lean();
            }
            return undefined;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el carrito con id#${id} => error: ${error.message}`)
        }
    }

    // Devuelve el carrito como un documento MongoDB
    static async getPopulatedCartById(id) {
        try {
            if (mongoose.isValidObjectId(id)) {
                return await cartModel.findOne({ _id: id });
            }
            return undefined;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el carrito con id#${id} => error: ${error.message}`)
        }
    }

    // Agrega un producto a la BD
    static async addCart(cart) {
        const newCart = await cartModel.create(cart);
        try {
            console.log(`✅ Carrito '${newCart._id}' agregado exitosamente`);
            return newCart._id;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo crear el carrito en la BD => error: ${error.message}`);
        }
    }

    // En caso de encontrarlo, elimina todos los productos del carrito indicado. Si el carrito no existe, devuelve 'false'
    static async deleteCart(id) {
        try {
            if (mongoose.isValidObjectId(id)) {
                const cart = this.getCartById(id);
                if (cart) {
                    return await cartModel.updateOne({ _id: id }, { $set: { products: [] } });
                }
            }
            return false;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo borrar el carrito id#${id} => error: ${error.message}`)
        }
    }

    // Borra un producto de un carrito determinados por argumentos. 
    // En caso de no poder hacerlo, devuelve 'false'
    static async deleteProductFromCart(cartExists, pid) {
        try {
            let productDeletedFromCart = false;
            let productSearchIndex = 0;
            while (!productDeletedFromCart && productSearchIndex < Object.values(cartExists.products).length) {
                if (Object.values(cartExists.products)[productSearchIndex].product._id.toString() === pid) {
                    cartExists.products.splice(productSearchIndex, 1);
                    await cartExists.save();
                    productDeletedFromCart = true;
                }
                productSearchIndex++;
            }
            return productDeletedFromCart;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar la existencia del producto #${pid} en el carrito #${cid} => error: ${error.message}`)
        }
    }
}

module.exports = { Cart, CartDao };