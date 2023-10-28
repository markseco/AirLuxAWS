const moongose = require('mongoose');

const User = new moongose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
});

module.exports = moongose.model('User', User);