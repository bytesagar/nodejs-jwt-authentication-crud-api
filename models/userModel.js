const mongoose = require('mongoose')

// TODO: Array of tutorials created by user

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,

  },
  tutorials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutorial'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('User', userSchema)
