const express = require('express')
const Task = require('../model/Task')
const Score = require('../model/Score')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)
  try {
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/tasks/:nr', async (req, res) => {
  const nr = req.params.nr
  const solution = req.body.solution
  const player = req.body.player
  try {
    const task = await Task.findOne({ nr })
    const score = await Score.findOne({ name : player })

    if (solution === task.solution) {
      const points = await calculatePoints(player, nr)     
      if (!score) {
        res.sendStatus(404)
        return
      }
      if(score.points.length < nr){
        const diff = (nr - 1) - score.points.length
        for (let i=0; i<diff; i++) {
          score.points.push(0)
        }
        score.points.push(points)
        score.save()    
        res.send(score)
      }
      else {
        res.send({"message": "Already submitted"})
      }
    }
    else {
      res.send(false)
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findOne({ _id, owner: req.user._id })
    if (!task) return res.status(404).send()
    res.send(task)

  } catch (error) {
    res.status(500).send()
  }
})

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id})

    if (!task) 
      return res.status(404).send()

    res.send(task)
  } catch (error) {
    res.status(500).send()
  }
})

async function calculatePoints(player, nr) {

  // TODO Fancy punkte algorithmus (fibonacci ?)
  const points = [21, 13, 8, 5, 3]
  let index = 0
  const result = await Score.find({ "name": { "$ne": player } })
  
  result.forEach(element => {
    if (element.points.length == nr) {
      index++
    }
  })
  return points[index]
}

module.exports = router