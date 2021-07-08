const { model, Schema } = require('mongoose')

// I should also be able to track the name, type, weight, sets, reps, and duration of exercise.
// If the exercise is a cardio exercise, I should be able to track my distance traveled.

const Workout = new Schema({
  day: {
      type: Date,
      default: Date.now
  },
  exercises: [
    {
      type: {
        type: String,
        enum: ['resistance', 'cardio'],
        default: 'resistance'
        },
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
      distance: Number
    }
  ]
})

Workout
  .virtual('totalDuration')
  .get(function () {
      let num = 0
      this.exercises.forEach((num) => {
        totalDuration += num.duration
      })
      // for (const { duration } of this.exercises) {
      //   num += duration
      //   console.log(num)
      //   console.log(duration)
  // }
  return totalDuration
  
  // return this.exercises.reduce((total, exercise) => total + exercise)
  
})


module.exports = model('Workout', Workout)
