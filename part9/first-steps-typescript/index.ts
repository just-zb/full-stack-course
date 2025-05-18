import express from 'express';
const app = express();
import bmiCalculator from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.get('/hello', (_req, res) => {
    res.send('hello full stack');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    try{
        const bmi = bmiCalculator(height as string, weight as string);
        res.json({
            weight: weight,
            height: height,
            bmi: bmi
        });
    }catch (error) {
        res.status(400).json({
            error: 'malformatted parameters'
        });
    }
});

app.post('/exercises', express.json(), (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    try {
        const result = calculateExercises(daily_exercises as string[], target as string);
        res.json(result);
    } catch (error) {
        // @ts-expect-error parameters missing
        if (error.message === 'parameters missing'){
            res.status(400).json({
                error: 'parameters missing'
            });
        }
        res.status(400).json({
            error: 'malformatted parameters'
        });
    }
});
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});