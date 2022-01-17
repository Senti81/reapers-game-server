const express = require('express')
const Score = require('../model/Score')
const Player = require('../model/User')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/scores/start', async (req, res) => {
  await Score.deleteMany()
  const players = await Player.find()

  let scores = []

  players.forEach(player => {
    scores.push({ username: player.username })
  })

  Score.insertMany(scores)

  try {
    res.status(201).send(scores)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/scores', async (req, res) => {
  try {
    const scores = await Score.find()

    let result = []
    scores.forEach(element => {
      result.push({
        username: element.username,
        points: element.points.length === 0 ? 0 : element.points.reduce((a, c) => a + c)
      })
    })

    // Sort by points descending
    result.sort((a, b) => b.points - a.points)
    res.send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/scores/player/', auth, async (req, res) => {
  try {
    const score = await Score.findOne({ username: req.query.name})
    res.send(score)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router