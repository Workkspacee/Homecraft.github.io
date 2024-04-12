// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //conpassword: { type: String, required: true },
  role: { type: String, enum: ['admin', 'backend', 'fiter', 'tailor'], default: 'admin' }
});

module.exports = mongoose.model('User', userSchema);
