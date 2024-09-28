// Se realizan los imports mediante 'require', de acuerdo a lo visto en clase
const { Router } = require('express');
const { createUserPasswordHash, isValidPassword, generateUserToken, createUserResponse } = require('../../utils/utils');
const { Cart, CartManager } = require('../../controllers/CartManager');
const { User, UserManager } = require('../../controllers/UserManager');
const { passportCallBack } = require('../../passport/passportCallBack');

const usersApiRouter = Router();

// El endpoint "/sessions/login" es para registrar los usuarios, mientras que el "/sessions/login" es 
// para realizar inicio de sesión, pasando un obj usuario en el body.
// El enpoint '/sessions/current' valida la sesión del usuario

usersApiRouter.post('/sessions/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        if (!first_name || !last_name || !email || !age || !password)
            return res.status(400).json({
                'Error':
                    'Petición incorrecta (faltan valores para registrar el usuario)'
            });
        const userExists = await UserManager.getUserByEmail(email);
        if (userExists) {
            return res.status(409).json({
                '⛔Error:': 'Usuario ya existente'
            });
        }
        const newCart = await CartManager.addCart(new Cart());
        const newUser = new User(first_name, last_name, email, age, await createUserPasswordHash(password), newCart, 'user');
        const result = await UserManager.addUser(newUser);
        result ? res.status(201).json({ "userId": result }) : res.status(400).json({
            '⛔Error:':
                'Request no válido'
        });
    } catch (error) {
        res.status(500).json({ '⛔Error interno:': error.message });
    }
});

usersApiRouter.post('/sessions/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({
                'Error':
                    'Petición incorrecta (faltan valores para registrar el usuario)'
            });
        const userExists = await UserManager.getUserByEmail(email);
        const passValid = await isValidPassword(password, userExists);
        if (passValid && userExists) {
            let token = generateUserToken(userExists);
            res.cookie('token', token, { httpOnly: true });
            token ? res.status(200).json(createUserResponse(200, 'Authorized', req, token)) :
                res.status(404).json(createUserResponse(404, 'Token not found', req, token));
        } else {
            res.status(401).json(createUserResponse(401, 'Invalid user/password', req, null))
        }
    } catch (error) {
        res.status(500).json({ '⛔Error interno:': error.message });
    }
});

usersApiRouter.get('/sessions/current', passportCallBack('current'), async (req, res) => {
    try {
        if (req.user) {
            const user = await UserManager.getUserById(req.user.userId);
            return res.status(200).json(createUserResponse(200, 'Authorized', req, user));
        } else {
            return res.status(401).json(createUserResponse(401, 'Unhautorized', req, null,))
        }
    } catch (error) {
        res.status(500).json({ '⛔Error interno:': error.message });
    }
});

module.exports = usersApiRouter;