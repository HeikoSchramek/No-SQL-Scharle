const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true, enum: ['User', 'Admin', 'Entwickler'] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
