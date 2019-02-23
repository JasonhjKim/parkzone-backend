const mongoose = require('mongoose');

const plSchema = mongoose.Schema({
    coords: Array,
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: "user"
    }

})

module.exports = mongoose.model('pl', plSchema);