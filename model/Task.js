const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  nr: {
    type: Number,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  hintDescription: {
    type: String,
    required: true,
    trim: true
  },
  solution: {
    type: String,
    required: true,
    trim: true
  },
  img: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

taskSchema.methods.toJSON = function () {
  const object = this.toObject()
  delete object.solution
  return object
}

const Task = mongoose.model('Task', taskSchema)

module.exports = Task