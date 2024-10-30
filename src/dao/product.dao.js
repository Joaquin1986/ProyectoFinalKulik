const productModel = require('../dao/models/product.model');

class ProductDao {

    static async create(product) {
        try {
            return await productModel.create(product);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo crear un nuevo producto => error: ${error.message}`)
        }
    }

    static async getProducts() {
        try {
            return await productModel.find({ deleted: false }).lean();
        } catch (error) {
            throw new Error(`⛔ Error al obtener datos de la BD: ${error.message}`);
        }
    }

    static async getPaginatedProducts(criteria, options) {
        try {
            return await productModel.paginate(criteria, options);
        } catch (error) {
            throw new Error(`⛔ Error al obtener datos de la BD: ${error.message}`);
        }
    }

    static async getProductById(id) {
        try {
            return await productModel.findOne({ _id: id, deleted: false, status: true }).lean();
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el producto con id: ${id} => error: ${error.message}`);
        }
    }

    static async getProductByIdNoStatus(id) {
        try {
            return await productModel.findOne({ _id: id, deleted: false }).lean();
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el producto con id: ${id} => error: ${error.message}`);
        }
    }

    static async getProductByCode(code) {
        return await productModel.findOne({ code: { '$regex': code, $options: 'i' }, deleted: false }).lean();
    } catch(error) {
        throw new Error(`⛔ Error: No se pudo verificar si existe el producto con el código: ${code} => error: ${error.message}`);
    }

    static async updateProduct(product) {
        try {
            return await productModel.updateOne({ _id: product._id, deleted: false }, { $set: product });
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo actualizar el producto => error: ${error.message}`);
        }
    }

    static async productStatus(productId, status) {
        try {
            return await productModel.updateOne({ _id: productId }, { status: status });
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo actualizar el producto => error: ${error.message}`);
        }
    }

    static async deleteProduct(id) {
        try {
            return await productModel.updateOne({ _id: id }, { $set: { deleted: true } });
        } catch (error) {
            throw new Error(`⛔ Error: no se pudo eliminar el producto id#${id} => ${error.message}`);
        }
    }

    static async productCodeExists(productCode) {
        try {
            return await productModel.findOne({ code: { '$regex': productCode, $options: 'i' }, deleted: false });

        } catch {
            throw new Error(`⛔ Error: No se pudo verificar si existe el producto con código: ${productCode}`);
        }
    }

    static async updateOrderedProductsStock(id, newStock) {
        try {
            await productModel.updateOne({ _id: id }, { $set: { stock: newStock } });
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo actualizar el stock de los productos: ${error.message}`);
        }
    }
}

module.exports = { ProductDao };