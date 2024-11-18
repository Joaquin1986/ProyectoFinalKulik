const { Router } = require('express');
const { ProductControllers } = require('../../controllers/product.controllers');
const { passportCallBack } = require('../../passport/passportCallBack');
const { verifyAdmin } = require('../../passport/verifyAdmin');
const { uploadMulter } = require('../../utils/utils');

const productsApiRouter = Router();

// Este Endpoint acepta por query param 'sort','limit', 'category' y 'available'. Para 'available',
// si se especifica, admite solamente true o false.
productsApiRouter.get("/products", ProductControllers.getProducts);

productsApiRouter.get("/products/:pid", ProductControllers.getProductById);

// Al siguiente endpoint (POST) se le puede pasar un array llamado 'thumbnails" por Multer
productsApiRouter.post("/products", passportCallBack('current'), verifyAdmin(), uploadMulter.array('thumb nails'), ProductControllers.createProduct);

/* El siguiente endpoint (put) admite de forma opcional que se envíe el argumento 'deleteThumbIndex'
   en el body, el cual corresponde a la posición (a partir de 1) de cierta thumbnail que se desee borrar.
   Se pueden enviar también los valores  'deleteThumbIndex' como un array.
   Unicos status permitidos: true o false. Valor por defecto siempre es true, a menos que se especifique false.*/

productsApiRouter.put("/products/:pid", passportCallBack('current'), verifyAdmin(), uploadMulter.array('thumbnails'), ProductControllers.updateProduct);

productsApiRouter.delete("/products/:pid", passportCallBack('current'), verifyAdmin(), ProductControllers.deleteProduct);

module.exports = productsApiRouter;