const express = require('express')
const Config = require('../model/Config')
const router = express.Router()

router.post('/config', async (req, res) => {
  const config = new Config(req.body)
  try {
    await config.save()
    res.status(201).send(config)
  } catch {    
    res.status(400).send(error)
  }
})

router.put('/config', async (req, res) => {
  const config = await Config.findOne()
  config.day = req.body.day
  config.hour = req.body.hour
  await config.save()
  res.send(config)
})

router.get('/config', async (req, res) => {
  try {
    const config = await Config.findOne()
    res.send(config)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router