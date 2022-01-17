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

router.post('/tasks/:nr', auth, async (req, res) => {
  const nr = req.params.nr
  const solution = req.body.solution
  const username = req.body.username
  const response = {
    status: ''
  }

  if (req.user.username != username) {
    response.status = 'FORBIDDEN'
    res.status(403).send(response)
    return
  }

  try {
    const task = await Task.findOne({ nr })
    const score = await Score.findOne({ username })

    if (solution === task.solution) {
      const points = await calculatePoints(username, nr)     
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
        response.status = 'CORRECT'
      }
      else {
        response.status = 'ALREADY_SUBMITTED'
      }
    }
    else {
      response.status = 'WRONG'
    }
    res.send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/tasks/:nr', auth, async (req, res) => {
  const response = {
    status: '',
    message:''
  }

  const nr = parseInt(req.params.nr)
  try {
    const task = await Task.findOne({ nr })
    if (!task) {
      response.status = 'error'
      response.message = `No task found with nr ${nr}`
      return res.status(404).send(response)
    }
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

async function calculatePoints(username, nr) {

  // TODO Fancy punkte algorithmus (fibonacci ?)
  const points = [21, 13, 8, 5, 3]
  let index = 0
  const result = await Score.find({ "username": { "$ne": username } })
  
  result.forEach(element => {
    if (element.points.length == nr) {
      index++
    }
  })
  return points[index]
}

module.exports = router