const { UserServices } = require('../services/user.services');
const { createUserResponse } = require('../utils/utils');

class SessionsControllers {

    static async createUser(req, res) {
        try {
            const { first_name, last_name, email, age = 1, password } = req.body;
            if (!first_name || !last_name || !email || !password)
                return res.status(400).json({
                    'Error':
                        'Petición incorrecta (faltan valores para registrar el usuario)'
                });
            const result = await UserServices.createUser("user", first_name, last_name, email, age, password);
            if (!result.error) {
                return res.status(result.code).json({ "new user": result.userId });
            }
            return res.status(result.code).json({ "error": result.reason });
        } catch (error) {
            return res.status(500).json({ "Error interno": error.message });
        }
    }

    static async createAdminUser(req, res) {
        try {
            const { first_name, last_name, email, age = 1, password } = req.body;
            if (!first_name || !last_name || !email || !password)
                return res.status(400).json({
                    'Error':
                        'Petición incorrecta (faltan valores para registrar el usuario)'
                });
            const result = await UserServices.createUser("admin", first_name, last_name, email, age, password);
            if (!result.error) {
                res.status(result.code).json({ "new admin user": result.userId });
            }
            res.status(result.code).json({ "error": result.reason });
            res.status(400).json({ "error": "request inválido" });
        } catch (error) {
            return res.status(500).json({ "Error interno": error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({
                    'Error':
                        'Petición incorrecta (faltan valores para registrar el usuario)'
                });
            const result = await UserServices.login(email, password, res);
            return res.status(result.code).json(createUserResponse(result.code, result.reason, req, result.token));
        } catch (error) {
            console.log(error)
            res.status(500).json({ '⛔Error interno:': error.message });
        }
    }

    static async getCurrentSession(req, res) {
        try {
            if (req.user) {
                const result = await UserServices.getCurrentSession(req.user.userId);
                res.status(200).json(createUserResponse(200, "Autorizado", req, result));
            } else {
                return res.status(401).json(createUserResponse(401, 'No Autorizado', req, null))
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ '⛔Error interno:': error.message });
        }
    }
}

module.exports = { SessionsControllers };