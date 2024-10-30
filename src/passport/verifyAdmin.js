const passport = require('../passport/passport');
const { createUserResponse } = require('../utils/utils');

const verifyAdmin = () => {
    return async (req, res, next) => {
        const user = req.user;
        if (!user || user.role.toLowerCase() !== 'admin')
            res.status(403).json(createUserResponse(403, 'Este endpoint es para usuarios administradores', req, null));
        else next();
    }
};

module.exports = { verifyAdmin };