import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Fetching all diagnoses!');
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;