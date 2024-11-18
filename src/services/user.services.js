const { User, UserDao } = require('../dao/user.dao');
const { Cart, CartDao } = require('../dao/cart.dao');
const { SessionRepository } = require('../repository/session.repository');
const { createUserPasswordHash, isValidPassword, generateUserToken } = require('../utils/utils');


class UserServices {

    static async createUser(rol, first_name, last_name, email, age, password) {
        try {
            return await createUser(rol, first_name, last_name, email, age, password);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo crear un nuevo usuario => error: ${error.message}`)
        }
    }

    static async getUserByEmail(email) {
        try {
            return await UserDao.getUserByEmail(email);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el usuario por email '${email}' => error: ${error.message}`)
        }
    }

    static async getUserById(id) {
        try {
            return await UserDao.getUserById(id);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el usuario por id '${id}' => error: ${error.message}`)
        }
    }

    static async login(email, password, res) {
        try {
            const userExists = await UserDao.getUserByEmail(email);
            const passValid = await isValidPassword(password, userExists);
            if (passValid && userExists) {
                let token = generateUserToken(userExists);
                res.cookie('token', token, { httpOnly: true });
                if (token)
                    return {
                        "error": false,
                        "code": 200,
                        "reason": "Autorizado",
                        "token": token
                    }
            } else {
                return {
                    "error": true,
                    "code": 401,
                    "reason":"No autorizado",
                    "token": "Usuario/Password no válidos"
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error(`⛔ Error: No se pudo realizar login => error: ${error.message}`)
        }
    }

    static async getCurrentSession(userId) {
        try {
            return await SessionRepository.getSessionUser(userId);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo consultar la sesión actual => error: ${error.message}`)
        }
    }
}

const createUser = async (rol, first_name, last_name, email, age, password) => {
    try {
        const userExists = await UserDao.getUserByEmail(email);
        if (userExists) {
            return {
                "error": true,
                "code": 409,
                "reason": "Usuario ya existente"
            }
        }
        const newCart = await CartDao.addCart(new Cart());
        const newUser = new User(first_name, last_name, email, age, await createUserPasswordHash(password), newCart, rol);
        const result = await UserDao.addUser(newUser);
        if (result)
            return {
                "error": false,
                "code": 201,
                "userId": result
            }
        else
            return {
                "error": true,
                "code": 400,
                "reason": "Request no válido"
            }
    } catch (error) {
        throw new Error(`⛔ Error: No se pudo crear el usuario solicitado => error: ${error.message}`);
    }
}

module.exports = { UserServices };