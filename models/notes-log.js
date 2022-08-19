const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const log = new Schema({
    player: String,
    astral_body: Object,
    note: String
});

module.exports = mongoose.model('Log', log);