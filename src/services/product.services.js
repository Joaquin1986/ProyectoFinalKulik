const { Product, ProductDao } = require('../dao/product.dao');

class ProductServices {

    static async getPaginatedProducts(criteria, options) {
        try {
            return await ProductDao.getPaginatedProducts(criteria, options);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudieron listar los productos => error: ${error.message}`)
        }
    }

    static async getProductById(id) {
        try {
            return await ProductDao.getProductById(id);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo obtener el producto => error: ${error.message}`)
        }
    }

    static async createProduct(title, description, price, code, status, stock, category, req) {
        try {
            let newStatus = true;
            if (status && typeof status !== 'boolean' && status.toLowerCase() === 'false')
                newStatus = false;
            const prod1 = new Product(title, description, parseInt(price), code, newStatus,
                parseInt(stock), category);
            // Si hay thumbnails subidas por Multer, se agregan al producto
            if (req.files && req.files.length > 0) {
                req.files.forEach((file) => {
                    const newPath = file.path.split("public")[1];
                    prod1.thumbnails.push(newPath);
                });
            }
            const result = await ProductDao.addProduct(prod1);
            if (result) {
                console.log("✅Producto Creado --> id#" + result._id);
                return {
                    "error": false,
                    "_id": result._id
                };
            }
            const prodFound = await ProductDao.getProductByCode(prod1.code);
            return {
                "error": true,
                "reason":
                    `Producto ya existente: ${prodFound.title} (codigo: ${prodFound.code})`
            };
        } catch (error) {
            console.log(error)
            throw new Error(`⛔ Error: No se pudo crear el producto => error: ${error.message}`)
        }
    }

    static async updateProduct(title, description, price, code, status, stock, deleteThumbIndexParsed, category, req) {
        try {
            const changesDone = [];
            const maxFilesAllowed = 5;
            let statusNew = true;
            if (status && status.toLowerCase() === "false") statusNew = false;
            if (status && status.toLowerCase() === "true") statusNew = true;
            const prodFound = await ProductDao.getProductByIdNoStatus(pid);
            if (prodFound) {
                let thumbnailsTotalQuantity = 0;
                const arrayThumbnails = Object.keys(prodFound.thumbnails);
                if (arrayThumbnails.length > 0)
                    thumbnailsTotalQuantity = arrayThumbnails.length + req.files.length;
                if (req.files && req.files.length > maxFilesAllowed || thumbnailsTotalQuantity > maxFilesAllowed)
                    return {
                        "error": true,
                        "code": 400,
                        "reason": `Se superó el límite de imágenes permitido: ${maxFilesAllowed}`
                    };
                if (title) {
                    prodFound.title = title;
                    changesDone.push(`Se modifica el nombre -> ${title}`);
                }
                if (description) {
                    prodFound.description = description;
                    changesDone.push(`Se modifica la descripcion -> ${description}`);
                }
                if (parseInt(price)) {
                    prodFound.price = parseInt(price);
                    changesDone.push(`Se modifica el precio -> $${price}`);
                }
                if (code && code !== prodFound.code) {
                    const codeExists = await ProductDao.productCodeExists(code);
                    if (codeExists) {
                        return {
                            "error": true,
                            "code": 400,
                            "reason": "Código de producto ya existente"
                        };
                    } else {
                        prodFound.code = code;
                        changesDone.push(`Se modifica el código -> ${code}`);
                    }
                }
                if (status && (status.toLowerCase() === 'true' || status.toLowerCase() === 'false')) {
                    prodFound.status = status;
                    changesDone.push(`Se modifica el status a ${statusNew}`);
                } else if (status && (status.toLowerCase() !== 'true' && status.toLowerCase() !== 'false')) {
                    changesDone.push(`⛔Error: estado "${status}" no válido`);
                }
                if (parseInt(stock)) {
                    prodFound.stock = parseInt(stock);
                    changesDone.push(`Se modifica el stock a ${stock}`);
                }
                if (category) {
                    prodFound.category = category;
                    changesDone.push(`Se modifica la categoria a ${category}`);
                }
                if (req.files && req.files.length > maxFilesAllowed) {
                    return {
                        "error": true,
                        "code": 400,
                        "reason": `Se superó el límite de thumbnails(${maxFilesAllowed})`
                    };
                }
                // En caso de pasar datos en 'deleteThumbIndex', se eliminan las thumbnails elegidas
                await ProductDao.deleteThumbnailsFromProduct(prodFound, deleteThumbIndexParsed, changesDone);
                // Si hay thumbnails subidas por Multer, se agregan al producto
                if (req.files && req.files.length > 0) {
                    req.files.forEach((file) => {
                        const newPath = file.path.split("public")[1];
                        prodFound.thumbnails.push(newPath);
                        changesDone.push(`Se agrego el archivo ${newPath}`);
                    });
                }
                if (changesDone.length === 0)
                    return {
                        "error": false,
                        "code": 201,
                        "Producto Actualizado": pid,
                        "Cambios Realizados": "Ninguno"
                    };
                const result = await ProductDao.updateProduct(prodFound);
                if (changesDone) {
                    console.log("🔄Cambios realizados: ");
                    changesDone.forEach((change) => console.log("- " + change + ""));
                }
                if (result)
                    return {
                        "error": false,
                        "code": 201,
                        "Producto Actualizado": pid,
                        "Cambios Realizados": changesDone
                    };
                return {
                    "error": true,
                    "code": 404,
                    "reason": "Producto #" + pid + " no encontrado"
                };
            }
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo actualizar el producto => error: ${error.message}`)
        }
    }

    static async deleteProduct(id) {
        try {
            return await ProductDao.deleteProduct(id);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo borrar el producto => error: ${error.message}`)
        }
    }
}
module.exports = { ProductServices };