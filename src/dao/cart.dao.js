const cartModel = require('../dao/models/cart.model.js');

class CartDao {

    static async create(cart) {
        try {
            return await cartModel.create(cart);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo crear un nuevo carrito => error: ${error.message}`)
        }
    }

    static async delete(id) {
        try {
            return await cartModel.updateOne({ _id: id }, { $set: { products: [] } });
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo borrar el carrito #${id} => error: ${error.message}`)
        }
    }

    static async getCartById(id) {
        try {
            return await cartModel.findById(id).lean();
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el carrito con id#${id} => error: ${error.message}`)
        }
    }

    static async getPopulatedCartById(id) {
        try {
            return await cartModel.findOne({ _id: id });
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el carrito con id#${id} => error: ${error.message}`)
        }
    }


}

module.exports = { CartDao };