const passport = require('passport');
const User = require('../models/user');
const config = require('../secret');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = {
    usernameField: 'email'
}

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
}


// (REQUIRED) jwtFromRequest Function that accepts a request as the only parameter and returns either the JWT as a string or null. See Extracting the JWT from the request for more details.
// (REQUIRED) secretOrKey is a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature. REQUIRED unless secretOrKeyProvider is provided.
passport.use(new LocalStrategy(localOptions, (email, password, next) => {
    console.log("Login shit called?");
    User.findOne({ email }, (err, foundUser) => {
        if (err) return next(err);
        if (!foundUser) return next(null, false);
        foundUser.comparePassword(password, (err, isMatch) => {
            if (err) return next(err);
            if (!isMatch) return next(null, false);
            return next(null, foundUser);
        })
    })
}))


//jwt_payload is an object literal containing the decoded JWT payload.
//done is a passport error first callback accepting arguments done(error, user, info)
passport.use(new JwtStrategy(jwtOptions, (payload, next) => {
    console.log("Is this getting called?")
    User.findById(payload.sub, (err, foundUser) => {
        console.log(payload);
        if (err) return next(err);
        if (!foundUser) return next(null, false);
        console.log(foundUser);
        return next(null, foundUser);
    })
}))