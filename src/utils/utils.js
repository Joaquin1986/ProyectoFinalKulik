const path = require('path');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const { compare, genSalt, hashSync } = bcrypt;

const baseURL = "http://localhost:8080/";
const publicPath = path.join(__dirname, '../../public');
const viewsPath = path.join(__dirname, '../views');
const thumbnailsPath = path.join(__dirname, '../../public/img/thumbnails');

/* Se configura Multer para que los guarde en el directorio 'public/thumbnails' y que mantenga el
nombre de los archivos, agregando un sufijo para asegurar que sea únicos */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, thumbnailsPath);
    },
    filename: function (req, file, cb) {
        const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniquePreffix + '-' + file.originalname);
    }
});

const uploadMulter = multer({ storage: storage });

function readJsonDataFromFile(file) {
    const filePath = path.join(__dirname, '..', 'data', file);
    if (fs.existsSync(filePath)) {
        try {
            return JSON.parse(fs.readFileSync(filePath, "utf-8"));
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo leer el archivo "${filePath}".
Descripción del error: ${error.message}`);
        }
    } else {
        return [];
    }
}

const preBuildResponse = (data) => {
    const response = {
        "status": 'success',
        "payload": data.docs,
        "totalPages": data.totalPages,
        "prevPage": data.prevPage,
        "nextPage": data.nextPage,
        "page": data.page,
        "hasPrevPage": data.hasPrevPage,
        "hasNextPage": data.hasNextPage
    }
    return response;
}

const buildResponse = (data, type, sort, category) => {
    const preData = preBuildResponse(data);
    let prevLink, nextLink;
    if (data.hasPrevPage) {
        prevLink = `${baseURL}${type}/products?limit=${data.limit}&page=${data.prevPage}`;
        if (sort) prevLink += '&sort=' + sort;
        if (category) prevLink += '&category=' + category;
    } else {
        prevLink = null;
    }
    if (data.hasNextPage) {
        nextLink = `${baseURL}${type}/products?limit=${data.limit}&page=${data.nextPage}`;
        if (sort) nextLink += '&sort=' + sort;
        if (category) nextLink += '&category=' + category;
    } else {
        nextLink = null;
    }
    let response = {
        ...preData,
        "prevLink": prevLink,
        "nextLink": nextLink
    }
    if (type === 'views') {
        let firstLink, lastLink;
        firstLink = `${baseURL}views/products?limit=${data.limit}&page=1`;
        lastLink = `${baseURL}views/products?limit=${data.limit}&page=${data.totalPages}`
        if (sort) {
            firstLink = firstLink + '&sort=' + sort;
            lastLink = lastLink + '&sort=' + sort;
        }
        if (category) {
            firstLink = firstLink + '&category=' + category;
            lastLink = lastLink + '&category=' + category;
        }
        response = {
            ...response,
            "firstLink": firstLink,
            "lastLink": lastLink,
            "totalDocs": data.totalDocs
        }
    }
    return response;
}

const createUserResponse = (statusCode, result = null, req, data) => {
    return {
        status: statusCode,
        result: result,
        path: req.url,
        payload: data
    };
};

// Genera token (JWT) de usuario
const generateUserToken = (user, time = '5m') => {
    const payload = {
        userId: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: time })
}

// Crea un hash para el password del usuario mediante BCrypt
const createUserPasswordHash = async (password) => hashSync(password, await genSalt(10));

const isValidPassword = async (password, user) => {
    if (user)
        return await compare(password, user.password);
    else
        return false
}

const parseThumbsIndex = (deleteThumbIndex) => {
    const parsedIndexes = [];
    if (deleteThumbIndex && (typeof deleteThumbIndex).toLowerCase() !== 'string') {
        Object.values(deleteThumbIndex).forEach((value) => {
            parsedIndexes.push(parseInt(value));
        });
    } else if (deleteThumbIndex && (typeof deleteThumbIndex).toLowerCase() === 'string') {
        parsedIndexes.push(parseInt(deleteThumbIndex));
    }
    return parsedIndexes;
}

module.exports = {
    uploadMulter,
    publicPath,
    viewsPath,
    readJsonDataFromFile,
    buildResponse,
    createUserResponse,
    generateUserToken,
    createUserPasswordHash,
    isValidPassword,
    parseThumbsIndex
};