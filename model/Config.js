const mongoose = require('mongoose')

const configSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    trim: true
  },
  hour: {
    type: Number,
    required: true,
    trim: true
  }
})

const Config = mongoose.model('Config', configSchema)

module.exports = Config