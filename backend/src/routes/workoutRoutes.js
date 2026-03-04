import express from 'express';
import Workout from '../models/Workout.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'GET alle workouts' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `GET workout ${id}` });
});

// POST nieuwe workout
router.post('/', async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `PATCH workout ${id}` });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `DELETE workout ${id}` });
});

export default router;