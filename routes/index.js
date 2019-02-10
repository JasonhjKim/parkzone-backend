const Authentication = require('../controllers/authentication');
const passportService = require('../middlewares/passport');
const passport = require('passport');

//authenticating passport: specifiying which stratedgy to emply
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignIn = passport.authenticate('local', { session: false })
module.exports = function(app) {
    app.post('/register', Authentication.register);
    app.post('/login', requireSignIn, Authentication.login);
    app.get('/loginToken', requireAuth, (req, res) => {
        res.send("Some shit")
    });
    
}