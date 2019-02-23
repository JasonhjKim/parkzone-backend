const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../secret');
const passport = require('passport');


function tokenForUser(user) {
    const iat = new Date().getTime();
    return jwt.encode({ sub: user.id, iat }, config.secret);
}

exports.register = function(req, res, next) {
    console.log(req)
    const { email, password, name } = req.body
    if (!email || !password) {
        return (res.status(422).send({ message: "You must provide email and password" }))
    }
    
    User.findOne({ email }, (err, foundUser) => {
        if (err) return next(err);
        if (foundUser) return res.status(422).send({ message: "Email is already in use" })
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
    console.log("get here");
    passport.authenticate('login', { session: false, failWithError: true }, (err, user, info) => {
        console.log("get here1");
        if (err) {
            console.log(err);
        }
        if (info) {
            res.json({
                auth: false,
                message: info.message
            })
        } else {
            req.logIn(user, err => {
                User.findOne({ email: user.email }, (err, foundUser) => {
                    if (err) return next(err);
                    res.status(200).send({
                        auth: true,
                        token: tokenForUser(foundUser),
                        message: "succesfully logged in"
                    })
                })
            })
        }
    })(req,res,next); 
    // console.log(req);
    // res.json({
    //     ...req.user._doc,
    //     token: tokenForUser(req.user),
    // })
}
