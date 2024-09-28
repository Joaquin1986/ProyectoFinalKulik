const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.s3nzifm.mongodb.net/${process.env.DB_NAME}`);
        mongoose.set('autoIndex', false);
        console.log('✅ La APP se conectó exitosamente con MongoDB!');
    } catch (error) {
        console.error('⛔ Error: No se pudo conectar con MongoDB -> ' + error);
        process.exit();
    }
};

module.exports = connectMongoDB;