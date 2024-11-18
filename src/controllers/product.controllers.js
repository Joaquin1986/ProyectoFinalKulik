const { ProductServices } = require('../services/product.services');
const { buildResponse, parseThumbsIndex } = require('../utils/utils');

class ProductControllers {

    static async getProducts(req, res) {
        let { limit, page, sort, category, available } = req.query;
        limit = parseInt(limit);
        page = parseInt(page);
        let criteria = {};
        let options = {};
        if (!limit || limit < 1) limit = 10;
        if (!page || page < 1) page = 1;
        if (available && available.toLowerCase() === 'false')
            criteria = { "deleted": false };
        else
            criteria = { "status": true, "deleted": false };
        if (category)
            criteria = { ...criteria, "category": { '$regex': category, $options: 'i' } };
        if (sort && (sort.toLowerCase() !== 'asc' && sort.toLowerCase() !== 'desc')) sort = false;
        sort ? options = { "limit": limit, "page": page, sort: { "price": sort } }
            : options = { "limit": limit, "page": page };
        let response;
        try {
            response = buildResponse(await ProductServices.getPaginatedProducts(criteria, options), 'api', sort, category);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error)
            response = {
                status: "error",
                payload: [],
                totalPages: 0,
                prevPage: null,
                nextPage: null,
                page: 0,
                hasPrevPage: false,
                hasNextPage: false,
                prevLink: null,
                nextLink: null,
            };
            return res.status(500).json(response);
        }
    }

    static async getProductById(req, res) {
        const { pid } = req.params;
        try {
            const product = await
                ProductServices.getProductById(pid);
            if (product) return res.status(200).json(product);
            return res.status(404).json({ "Error": `Producto id #${pid} no encontrado` });
        } catch (error) {
            return res.status(500).json({ "Error interno": error.message });
        }
    }

    static async createProduct(req, res) {
        const { body } = req;
        const { title, description, price, code, status, stock, category } = body;
        if (!title || !description || !parseInt(price) || !code || !parseInt(stock) || !category) {
            return res.status(400).json({
                "Error":
                    "Petición incorrecta (los valores proporcionados no son los esperados)"
            });
        } else {
            try {
                const result = await ProductServices.createProduct(title, description, price, code, status, stock, category, req);
                if (!result.error) {
                    console.log("✅Producto Creado --> id#" + result._id);
                    return res.status(201).json({ "productId": result._id });
                }
                return res.status(400).json({
                    "Error": result.reason
                });
            } catch (error) {
                return res.status(500).json({ "Error interno": error.message });
            }
        }
    }

    static async updateProduct(req, res) {
        const { pid } = req.params
        const { body } = req;
        const { title, description, price, code, status, stock, deleteThumbIndex, category } = body;
        if (!title && !description && !price && !code && !status && !stock && !deleteThumbIndex & !category)
            return res.status(400).json({ "Error": "petición incorrecta" });
        const deleteThumbIndexParsed = parseThumbsIndex(deleteThumbIndex);
        if (pid) {
            try {
                const result = await ProductServices.updateProduct(title, description, price, code, status, stock, deleteThumbIndexParsed, category);
                if (result.error) {
                    return res.status(parseInt(result.code)).json({ "error": result.reason });
                } else {
                    const { error, code, ...rest } = result;
                    return res.status(parseInt(code)).json({ rest });
                }
            } catch (error) {
                return res.status(500).json({ "Error interno": `${error}, ${error.message}` });
            }
        } else {
            return res.status(400).json({ "Error": "petición incorrecta" });
        }
    }

    static async deleteProduct(req, res) {
        const { pid } = req.params;
        if (pid) {
            try {
                const result = await Product.deleteProduct(pid);
                if (result) return res.status(200).json({ "Producto Eliminado": pid });
                return res.status(404).json({ "Error": `Producto id #${pid} no encontrado` });
            } catch (error) {
                return res.status(500).json({ "Error interno": error.message });
            }
        } else {
            res.status(400).json({ "Error": "no se recibio id de Producto válido" });
        }
    }

}

module.exports = { ProductControllers }