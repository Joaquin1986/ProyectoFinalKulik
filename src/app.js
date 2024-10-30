// Se definen los modulos a importar
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('./passport/passport'); 

const productsApiRouter = require('./routes/api/products.api.router');
const cartsApiRouter = require('./routes/api/carts.api.router');
const sessionsApiRouter = require('./routes/api/sessions.api.router');

const { publicPath } = require("./utils/utils");

const initServer = require('./server/server');
const connectMongoDB = require('./db/mongodb');

const app = express();

initServer(app).then(() => {
    connectMongoDB();

    app.use(express.static(publicPath))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use('/api', productsApiRouter);
    app.use('/api', cartsApiRouter);
    app.use('/api', sessionsApiRouter);

    app.use(("*", (req, res, next) => {
        const errorPath = path.join(__dirname, req.originalUrl);
        const message = `⛔ Error 404: Sitio no encontrado (${errorPath})`;
        console.error(message);
        res.status(404).json({ message });
    }));

    app.use((error, req, res, next) => {
        const message = `⛔ Petición incorrecta: ${error.message}`;
        console.error(message);
        res.status(400).json({ message });
    });

});

module.exports = app;