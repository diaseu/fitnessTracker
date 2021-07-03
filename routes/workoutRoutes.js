const router = require('express').Router()
const { Workout, Exercise } = require('../models')
const passport = require('passport')

// POST one Exercise
router.post('/exercise', passport.authenticate('jwt'), (req, res) => Item.create({
  name: req.body.name,
  description: req.body.description,
  price: req.body.price,
  user: req.user._id
})
  .then(item => User.findByIdAndUpdate(item.user, { $push: { menu: item._id } })
    .then(() => res.json(item))
    .catch(err => console.log(err)))
  .catch(err => console.log(err)))

  // POST Workout (all exercises)
router.post('/exercise/bulk', passport.authenticate('jwt'), (req, res) => {
  Item.insertMany(req.body)
    .then(items => res.json(items))
    .catch(err => console.log(err))
})

module.exports = router
