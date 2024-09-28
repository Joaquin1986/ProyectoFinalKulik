const { createUserResponse } = require('../utils/utils');
const passport = require('../passport/passport');

const passportCallBack = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json(createUserResponse(401, 'Unauthorized', req, info.messages ? info.messages : info.toString()));
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}

module.exports = { passportCallBack };