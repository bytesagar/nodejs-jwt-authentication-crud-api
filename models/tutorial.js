const mongoose = require('mongoose')


const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  published: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Tutorial', tutorialSchema)
