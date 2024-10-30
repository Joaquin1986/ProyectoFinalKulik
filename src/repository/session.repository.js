const { SessionDto } = require('../dto/session.dto');
const { UserDao } = require('../dao/user.dao');

class SessionRepository {

    static async getSessionUser(id) {
        const dtoUser = new SessionDto(await UserDao.getUserById(id));
        return dtoUser;
    }
}

module.exports = { SessionRepository };