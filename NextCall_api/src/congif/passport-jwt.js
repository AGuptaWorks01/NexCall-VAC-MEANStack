const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/user.model')
require('dotenv').config()

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try
        {
            const user = await User.findById(jwt_payload.userId)

            if (user)
            {
                return done(null, user); // user found, pass to req.user
            } else
            {
                return done(null, false); // no user found
            }
        } catch (err)
        {
            return done(err, false);
        }
    })
);

module.exports = passport;