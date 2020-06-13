const mongoose = require('mongoose')

// FIXME: Don't store the loggedIn status and token of user in database (if you want restful api).

// TODO: Add user's fullName

// username is made unique (should be unique)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
    default: false,
  },
  token: {
    type: String,
  },
  tutorials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutorial',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', userSchema)
