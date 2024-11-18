const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const dotenv = require('dotenv').config();
const { UserDao } = require('../dao/user.dao');

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = async (jwt_payload, done) => {
    if (!jwt_payload) return done(null, false, { messages: "User not found" });
    return done(null, jwt_payload);
};

const cookieExtractor = (req) => {
    const token = req.cookies.token;
    return token;
};

const strategyConfigCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: SECRET_KEY,
};

passport.use("current", new JwtStrategy(strategyConfigCookies, verifyToken));

passport.serializeUser((user, done) => {
    try {
        done(null, user.userId);
    } catch (error) {
        return done(error);
    }
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserDao.getUserById(id);
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

module.exports = passport;