const User = require('../models/user');
const PL = require('../models/pl');

exports.createParkingLocation = function(req, res, next) {
    const { coords } = req.body;
    const newPL = new PL({
        coords,
        author: req.user
    })
    PL.create()
}