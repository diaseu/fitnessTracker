const router = require('express').Router()
const { Workout } = require('../models')

// Get Workout
router.get('/workouts', (req, res) => {
  Workout.aggregate([
    { $addFields: {
        totalDuration: {
          $sum: '$exercises.duration'
        }
      }
    }])
  .then(workout => res.json(workout))
  .catch(err => res.json(err)) })

// Get Workouts In Range 
router.get('/workouts/range', (req, res) => {
  Workout.aggregate([
  {
    $addFields: {
      totalDuration: {
        $sum: '$exercises.duration'
      }
    }
  }])
    .then(workouts => {
      const weekWorkout = []
      if (workouts.length > 7) {
        for (let i = 0; i < 7; i++) {
          weekWorkout.push(workouts[i + workouts.length - 7])
        }
      }
      res.json(weekWorkout)
    })
  .catch(err => res.json(err))
})

// Create Workout
router.post('/workouts', (req, res) => Workout.create({ ...req.body, day: new Date(new Date().setDate(new Date().getDate()))})
  .then(workout => res.json(workout))
  .catch(err => res.json(err)))

// Add Exercise - Update Workout with new exercise (pushed)
router.put('/workouts/:id', async (req, res) => Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
  .then(exercise => res.status(200))
  .catch(err => res.json(err)))

module.exports = router;