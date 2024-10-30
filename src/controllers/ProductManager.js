const { ProductDao } = require('../dao/product.dao');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

// Clase Product, con su correspondiente contructor las props definidas en la consigna
class Product {
    constructor(title, description, price, code, status, stock, category) {
        if (status === undefined) {
            status = true;
        }
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnails = [];
        this.code = code;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.deleted = false;
    }
}

// Clase ProductManager con su constructor tal como se solicitó, con un array 'products' vacío
class ProductManager {

    // Agrega un producto a la BD
    static async addProduct(product) {
        let worked = true;
        try {
            let productAlreadyExist = await this.getProductByCode(product.code);
            if (!productAlreadyExist) {
                worked = await ProductDao.create(product);
                console.log(`✅ Producto '${product.title}' agregado exitosamente`);
            } else {
                worked = false;
                console.error(`⛔ Error: Código de Producto ya existente (Código:'${productAlreadyExist.code}'|Producto:'${productAlreadyExist.title}')`);
            }
            return worked;
        } catch (error) {
            throw new Error(`⛔ Error: ${error.message}`);
        }
    }

    // Devuelve todos los productos creados hasta el momento en la BD
    static async getProducts() {
        try {
            return await ProductDao.getProducts();
        } catch (error) {
            throw new Error(`⛔ Error al obtener datos de la BD: ${error.message}`);
        }
    }

    // Devuelve los productos con paginate el plugin
    static async getPaginatedProducts(criteria, options) {
        try {
            return await ProductDao.getPaginatedProducts(criteria, options);
        } catch (error) {
            throw new Error(`⛔ Error al obtener datos de la BD: ${error.message}`);
        }
    }

    // En caso de encontrarlo, devuelve un objeto 'Producto' de acuerdo a id proporcionado por argumento.
    static async getProductById(id) {
        try {
            if (mongoose.isValidObjectId(id)) {
                return await ProductDao.getProductById(id);
            }
            return undefined;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el producto con id: ${id} => error: ${error.message}`);
        }
    }

    // En caso de encontrarlo, devuelve un objeto 'Producto' de acuerdo a id proporcionado por argumento.
    static async getProductByIdNoStatus(id) {
        try {
            if (mongoose.isValidObjectId(id)) {
                return await ProductDao.getProductByIdNoStatus(id);
            }
            return undefined;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el producto con id: ${id} => error: ${error.message}`);
        }
    }

    // En caso de encontrarlo, devuelve un objeto 'Producto' de acuerdo al codigo proporcionado por argumento.
    // En caso de no encontrarlo, imprime error en la consola.
    static async getProductByCode(code) {
        return await ProductDao.getProductByCode(code);
    } catch(error) {
        throw new Error(`⛔ Error: No se pudo verificar si existe el producto con el código: ${code} => error: ${error.message}`);
    }

    // Actualiza un producto que es pasado por parámetro en la BD
    static async updateProduct(product) {
        try {
            const result = await ProductDao.updateProduct(product);
            console.log(`✅ Producto id#${product._id} actualizado exitosamente`);
            return result.acknowledged;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo actualizar el producto => error: ${error.message}`);
        }
    }

    // Modifica el estado de un Producto en la BD
    static async productStatus(productId, status) {
        try {
            const result = await ProductDao.productStatus(productId, status)
            console.log(`✅ Producto id#${productId} ahora tiene status "${status}"`);
            return result.acknowledged;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo actualizar el producto => error: ${error.message}`);
        }
    }

    // Elimina la thumbnail de acuerdo a la ruta (path) que se le pasa por argumento
    static async deleteThumbnail(path) {
        try {
            if (this.thumbnailExists(path)) {
                await fs.promises.unlink(path);
            }
        } catch (error) {
            throw new Error(`⛔ Error: no se pudo borrar la thumbnail ${path} => ${error.message}`);
        }
    }

    // Elimina un producto de acuerdo al id que se le pasa por argumento
    static async deleteProduct(id) {
        let result = false;
        try {
            if (mongoose.isValidObjectId(id)) {
                const productToDelete = await this.getProductByIdNoStatus(id);
                if (productToDelete) {
                    await ProductDao.deleteProduct(id);
                    console.log(`✅ Producto #${id} eliminado exitosamente`);
                    result = true;
                }
            }
            return result;
        } catch (error) {
            throw new Error(`⛔ Error: no se pudo eliminar el producto id#${id} => ${error.message}`);
        }
    }

    // Devuelve 'true' si un código de Producto existe en la BD. Caso contrario, devuelve 'false'
    static async productCodeExists(productCode) {
        try {
            const productFound = await ProductDao.productCodeExists(productCode);
            if (productFound) return true;
            else return false;
        } catch {
            throw new Error(`⛔ Error: No se pudo verificar si existe el producto con código: ${productCode}`);
        }
    }

    // Devuelve 'true' si una thumnail de Producto existe en cierta ruta(path). Caso contrario, devuelve 'false'
    static thumbnailExists(path) {
        try {
            let exists = false;
            fs.existsSync(path) ? exists = true : exists = false;
            return exists;
        } catch (error) {
            throw new Error(`⛔ Error: no se pudo verificar si existe la thumbnail ${path} => ${error.message}`);
        }
    }

    // Elimina una thumbnail de un obj producto que se reciben por argumento
    static async removeThumbnailFromProduct(path, product) {
        const pathParsed = String(path).toLowerCase();
        let index = 0;
        let found = false;
        while (index < product.thumbnails.length && !found) {
            const thumbnailParsed = String(product.thumbnails[index]).toLowerCase();
            if (thumbnailParsed === pathParsed) {
                found = true;
                product.thumbnails.splice(index, 1);
            }
            index++;
        }
        return product;
    }

    static async deleteThumbnailsFromProduct(prodFound, deleteThumbIndexParsed, changesDone) {
        let deletedFiles = [];
        const thumbnailsObjValues = Object.values(prodFound.thumbnails);
        if (deleteThumbIndexParsed.length > 0) {
            // Se eliminan los archivos de imagenes pasados solicitados
            deleteThumbIndexParsed.forEach(async (originalIndex) => {
                let index = -1;
                if (parseInt(originalIndex) > 0 && parseInt(originalIndex) <= thumbnailsObjValues.length) {
                    index = parseInt(originalIndex) - 1;
                } else {
                    changesDone.push(`⛔Error al borrar: indice (${originalIndex}) fuera de rango`);
                }
                if (index >= 0 && index < thumbnailsObjValues.length) {
                    const imgPath = path.join(__dirname, '../', '../', './public/', prodFound.thumbnails[index]);
                    if (ProductManager.thumbnailExists(imgPath)) {
                        deletedFiles.push({ "status": true, "path": prodFound.thumbnails[index] })
                        await ProductManager.deleteThumbnail(imgPath);
                    } else {
                        deletedFiles.push({ "status": false, "path": prodFound.thumbnails[index] })
                    }
                }
            });
            // Se eliminan las referencias a los archivos en el objeto
            deletedFiles.forEach(async (deletedFile) => {
                if (deletedFile.status) {
                    changesDone.push(`Se borro la imagen ${deletedFile.path} de ${prodFound.title} `);
                }
                else {
                    changesDone.push(`Se borro la imagen ${deletedFile.path} del objeto ${prodFound.title} (no se encontraba el archivo)`);
                }
                await ProductManager.removeThumbnailFromProduct(deletedFile.path, prodFound);
            });
        }
    }

    // Actualiza el stock de productos luego de haber recibido una orden
    static async updateOrderedProductsStock(products) {
        try {
            for (let count = 0; count < products.length; count++) {
                const newStock = products[count].product.stock - products[count].quantity;
                await ProductDao.updateOrderedProductsStock(products[count].product._id, newStock);
            }
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo actualizar el stock de los productos: ${error.message}`);
        }
    }

    // Actualiza el stock de productos, recibe el id de producto y cantidad comprada
    static async updateProductStock(productId, quantity) {
        try {
            const product = await this.getProductById(productId);
            const newStock = product.stock - quantity;
            await ProductDao.updateOrderedProductsStock(productId, newStock);

        } catch (error) {
            throw new Error(`⛔ Error: No se pudo actualizar el stock del producto: ${error.message}`);
        }
    }

    static async verifyProductStock(productId, quantity) {
        try {
            if (mongoose.isValidObjectId(productId) && quantity) {
                const productExists = await this.getProductById(productId);
                if (productExists && quantity <= productExists.stock) return true;
            }
            console.error('⛔ Error: producto o cantidad no válidos')
            return false;

        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar el stock del producto #${productId}: ${error.message}`)
        }
    }
}

module.exports = {
    Product, ProductManager
}