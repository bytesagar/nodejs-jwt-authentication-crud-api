const mongoose = require('mongoose')

// TODO: Relate tutorial with user

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  published: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Tutorial', tutorialSchema)
