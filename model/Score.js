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
  },
  retries: {
    type: Number,
    required: true,
    default: 3
  }
})

const Score = mongoose.model('Score', scoreSchema)

module.exports = Score