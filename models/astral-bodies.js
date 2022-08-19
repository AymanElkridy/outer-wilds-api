const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const astralBody = new Schema({
    name : String,
    type: String,
    gravity: Number,
    visited: {type: Boolean, default: false}
});

module.exports = mongoose.model('Astral_Body', astralBody);