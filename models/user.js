// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'backend', 'fiter', 'tailor'], default: 'admin' },
  email: { type: String, required: true, default: 'parikharjun2002@gmail.com' },
});

module.exports = mongoose.model('User', userSchema);
