const mongoose = require('mongoose');


const sch = mongoose.Schema({
     name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: String
})

module.exports = mongoose.model('User', sch);
