require('dotenv').config()

const express = require('express')
const app = express()
const { join } = require('path')
const mongoose = require('moongoose')

const { Workout } = require('./models')

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routes'))

require('./db')
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err))
