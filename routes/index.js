const Authentication = require('../controllers/authentication');
const passportService = require('../middlewares/passport');
const passport = require('passport');
const User = require("../models/user")

//authenticating passport: specifiying which stratedgy to emply
const requireAuth = passport.authenticate('jwt', { session: false })
// const requireSignIn = passport.authenticate('login', { session: false, failWithError: true })
module.exports = function(app) {
    app.post('/register', Authentication.register);
    app.post('/login', Authentication.login);
    app.get('/loginToken', requireAuth, (req, res) => {
        res.send("Some shit")
    });
    
}