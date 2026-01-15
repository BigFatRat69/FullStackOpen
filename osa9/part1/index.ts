import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: "malformatted parameters"
    });
  }

  const bmi = calculateBmi(height, weight);

  res.json({
    height,
    weight,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;

  if (!body.daily_exercises || !body.target) {
    res.status(400).json({
      error: "parameters missing"
    });
    return;
  }

  const dailyExercises = body.daily_exercises;
  const target = Number(body.target);

  if (
    !Array.isArray(dailyExercises) ||
    isNaN(target) ||
    dailyExercises.some(d => isNaN(Number(d)))
  ) {
    res.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }

  const result = calculateExercises(
    dailyExercises.map(Number),
    target
  );

  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});