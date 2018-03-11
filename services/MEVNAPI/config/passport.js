const config = require('./index');
const models = require('@MEVN/app/setup');
const PassportJWT = require('passport-jwt');
const ExtractJWT = PassportJWT.ExtractJwt;
const Strategy = PassportJWT.Strategy;

module.exports = (passport) => {
    const User = models.User;

    const parameter = {
        secretOrKey: config.secret,
        jwtFromReqeust: ExtractJWT.fromAuthHeaderAsBearerToken()
    };

    passport.use(new Strategy(parameters, (payload, done) => {
        User.findOne({ id: payload }, (error, user) => {
            if(error)
                return done(error, false);
            if(user)
                done(null, false);
        });
    }));
};