import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema = regels voor workout
const workoutSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,       
  maxlength: 100, 
  },
  reps: {
    type: Number,
    required: true,
    min: 1, 
  },
  load: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;