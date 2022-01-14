require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./Task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true
  },
  token: {
    type: String
  }
}, {
  timestamps: true
})

// Static method
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username })
  
  if (!user) throw new Error('Login failed')  

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) throw new Error('Login failed')
  
  return user
}

userSchema.methods.toJSON = function () {
  const object = this.toObject()

  delete object.password
  delete object.token
  return object
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
  user.token = token
  await user.save()
  return token
}

userSchema.pre('save', async function(next) {
  const user = this

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }
  next()  
})

const User = mongoose.model('User', userSchema)

module.exports = User