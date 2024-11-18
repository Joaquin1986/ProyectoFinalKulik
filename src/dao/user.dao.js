const mongoose = require('mongoose');
const userModel = require('./models/user.model');

// Clase User para la autenticación mediante Passport + JWT
class User {
    constructor(first_name, last_name, email, age, password, cart, role) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.age = age;
        this.password = password;
        this.cart = cart;
        this.role = role;
    }
}

class UserDao {

    // Agrega un usuario a la BD
    static async addUser(user) {
        try {
            const newUser = await userModel.create(user);
            if (newUser) {
                console.log(`✅ Usuario #'${newUser._id}' agregado exitosamente a la BD`);
                return newUser._id;
            }
            return false;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo crear el usuario en la BD => error: ${error.message}`);
        }
    }

    // Consulta usuario por email
    static async getUserByEmail(email) {
        try {
            return await userModel.findOne({ email: email }).lean();
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el usuario por email '${email}' => error: ${error.message}`)
        }
    }

    // Consulta usuario por id
    static async getUserById(id) {
        try {
            if (mongoose.isValidObjectId(id)) {
                return await userModel.findById(id).lean();
            }
            return undefined;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el usuario por id '${id}' => error: ${error.message}`)
        }
    }
}

module.exports = { User, UserDao };