const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  points: {
    type: Array,
    required: true,
    default: []
  }
})

const Score = mongoose.model('Score', scoreSchema)

module.exports = Score