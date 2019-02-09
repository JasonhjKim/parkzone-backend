const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../secret');


function tokenForUser(user) {
    const iat = new Date().getTime();
    return jwt.encode({ sub: user.id, iat }, config.secret);
}

exports.register = function(req, res, next) {
    const { email, password } = req.body
    if (!email || !password) {
        return (res.status(422).send({ err: "You must provide email and password" }))
    }
    
    User.findOne({ email }, (err, foundUser) => {
        if (err) return next(err);
        if (foundUser) return res.status(422).send({ err: "Email is already in use" })
        const newUser = new User({
            email,
            password,
            name
        })
        newUser.save((err) => {
            if (err) return next(err);
            res.json({ token: tokenForUser(newUser) });
        })
    })
}

exports.login = function(req, res, next) {
    res.json({
        token: tokenForUser,
        ...req.user
    })
}
