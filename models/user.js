const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String
})

userSchema.pre('save', (next) => {
    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function(candidate, next) {
    bcrypt.compare(candidate, this.password, (err, isMatch) => {
        if (err) return next(err);
        next(null, isMatch);
    })
}

module.exports = mongoose.model('user', userSchema);