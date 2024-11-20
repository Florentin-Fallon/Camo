const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    replica: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'Swifteur'}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
