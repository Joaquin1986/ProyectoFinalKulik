const passport = require('../passport/passport');
const { createUserResponse } = require('../utils/utils');
const { UserManager } = require('../controllers/UserManager');

const verifyOwnCart = () => {
    return async (req, res, next) => {
        const { cid } = req.params;
        if (!cid)
            res.status(400).json(createUserResponse(400, 'Request incorrecto', req, null));
        const user = await UserManager.getUserById(req.user.userId);
        if (user.cart._id != cid)
            res.status(400).json(createUserResponse(400, 'Carrito no perteneciente al usuario', req, null));
        else next();
    }
};

module.exports = { verifyOwnCart };