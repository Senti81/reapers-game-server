const express = require('express')
const router = express.Router()
const User = require('../model/User')
const auth = require('../middleware/auth')

// Create new user
router.post('/users', async (req, res) => {
  
  // Check if Username already exists
  if (await User.findOne({ username: req.body.username })) {
    return res.status(400).send({error: 'Username already in use'})
  }
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token }) 
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)    
  } catch (error) {
    res.status(400).sendDate(error)
  }
})

// Login user
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.send({ message: 'Incorrect credentials' })
  }
})

// Logout user
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.token = ''
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(400).send(error)
  }
})

// Show current user
router.post('/users/me', async (req, res) => {
  const user = await User.findOne({ token: req.body.token })
  try {
    if (!user) throw new Error('User not found')    
    res.send(user)
  } catch (error) {
    res.status(404).send(error)
  }
})

// Change current user
router.put('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.send(req.user)
  } catch (error) {
    res.status(400).send(error)
  }
}) 

// Delete current user
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router