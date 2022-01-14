const express = require('express')
const Score = require('../model/Score')
const Player = require('../model/User')
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

router.get('/scores/:day', async (req, res) => {
  try {
    const scores = await Score.find()
    let result = []
    scores.forEach(element => {
      result.push({
        name: element.name,
        points: element.points[req.params.day - 1]
      })
    })
    res.send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router