import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'GET alle workouts' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `GET workout ${id}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'POST workout', data: req.body });
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