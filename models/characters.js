const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const character = new Schema({
    name: String,
    instrument: String,
    habitat: Object
});

module.exports = mongoose.model('Character', character);