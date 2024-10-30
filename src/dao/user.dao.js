const userModel = require('../dao/models/user.model');

class UserDao {

    static async create(user) {
        try {
            return await userModel.create(user);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo crear un nuevo usuario => error: ${error.message}`)
        }
    }

    static async getUserByEmail(email) {
        try {
            return await userModel.findOne({ email: email }).lean();
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el usuario por email '${email}' => error: ${error.message}`)
        }
    }

    static async getUserById(id) {
        try {
            return await userModel.findById(id).lean();
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el usuario por id '${id}' => error: ${error.message}`)
        }
    }
}

module.exports = { UserDao };