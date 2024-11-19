const { CartServices } = require('../services/cart.services');

class CartControllers {

    static async getCartById(req, res) {
        const { cid } = req.params;
        if (cid) {
            try {
                const cart = await CartServices.getCartById(cid);
                if (cart) return res.status(200).json({ "products": cart.products });
                return res.status(404).json({ "⛔Error": `Carrito id '${cid}' no encontrado` });
            } catch (error) {
                res.status(500).json({ "⛔Error interno:": error.message });
            }
        } else {
            res.status(400).json({ "⛔Error:": "Request no válido" });
        }

    }

    static async purchaseCart(req, res) {
        const { cid: cartId } = req.params;
        const purchaser = req.user.email;
        if (cartId && purchaser) {
            try {
                const result = await CartServices.purchaseCart(cartId, purchaser);
                if (result.error) return res.status(400).json({ "error": result.reason });
                const { ticket, itemsNotBought } = result;
                return res.status(201).json({ "ticket": ticket, "itemsNotBought": itemsNotBought });
            } catch (error) {
                res.status(500).json({ "internalError": error.message });
            }
        } else {
            res.status(400).json({
                "error":
                    "Request no válido, revisar valores enviados"
            });
        }
    }

    static async updateCartByProduct(req, res) {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        if (cid && pid && quantity) {
            try {
                const result = await CartServices.updateCartByProduct(cid, pid, quantity);
                if (result.error)
                    return res.status(result.code).json({ "error": result.reason })
                return res.status(result.code).json({ "cart updated": result.reason });
            } catch (error) {
                return res.status(500).json({ "internal error": error.message });
            }
        } return res.status(400).json({ 'error': 'Request no válido' });
    }

    static async updateCart(req, res) {
        const { cid } = req.params;
        const { body } = req;
        if (cid && (typeof body).toLowerCase() === 'object') {
            const products = Object.values(body);
            if (products.length === 0)
                return res.status(400).json({ 'error': 'Array vacío' });
            try {
                const result = await CartServices.updateCart(cid, products);
                return res.status(200).json({ 'result': result });
            } catch (error) {
                return res.status(500).json({ "internalError": error.message });
            }
        }
        else
            return res.status(400).json({ 'error': 'Request no válido' });
    }

    static async deleteCart(req, res) {
        const { cid } = req.params;
        try {
            const result = await CartServices.deleteCart.deleteCart(cid);
            result.modifiedCount > 0 ? res.status(201).json({ "deletedCart": cid }) : res.status(400).json({
                "⛔Error:": "Request no válido"
            });
        } catch (error) {
            res.status(500).json({ "⛔Error interno:": error.message });
        }
    }

    static async deleteProductFromCart(req, res) {
        {
            const { cid, pid } = req.params;
            try {
                const result = await CartServices.deleteProductFromCart(cid, pid);
                if (result.error)
                    return res.status(result.code).json({ "error": result.reason });
                const { error, code, ...rest } = result;
                return res.status(result.code).json({ rest });
            } catch (error) {
                return res.status(500).json({ "error interno": error.message });
            }
        }
    }
}

module.exports = { CartControllers }
