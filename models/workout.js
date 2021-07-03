const { model, Schema } = require('mongoose')

// I should also be able to track the name, type, weight, sets, reps, and duration of exercise.
// If the exercise is a cardio exercise, I should be able to track my distance traveled.

const Workout = new Schema({
  name: {
      type: String,
      unique: true,
      required: true
    },
  day: {
      type: Date,
      default: Date.now
  }
  exercise: [
    {
      name: String,
      type: String,
      weight: Number,
      sets: Number,
      reps: Number,
      duration: Number,
      distance: Number
    }
  ]
})

module.exports = model('Workout', Workout)
