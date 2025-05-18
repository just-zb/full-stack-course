import {isNumber} from "./utils/isNumber";
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
const calculateExercises = (daily_exercises: string[], target: string): Result => {
    if (daily_exercises === undefined || target === undefined) {
        throw new Error('parameters missing');
    }
    if (daily_exercises.some(day => !isNumber(day)) || !isNumber(target)) {
        throw new Error('Provided values were not numbers!');
    }
    const daily_exercises_number = daily_exercises.map(day => Number(day));
    const target_number = Number(target);
    const periodLength = daily_exercises_number.length;
    const trainingDays = daily_exercises_number.filter(day => day > 0).length;
    const totalHours = daily_exercises_number.reduce((a, b) => a + b, 0);
    const average = totalHours / periodLength;
    const success = average >= target_number;
    let rating: number;
    let ratingDescription: string;

    if (average < target_number) {
        rating = 1;
        ratingDescription = 'You need to work harder to reach your target.';
    } else if (average === target_number) {
        rating = 2;
        ratingDescription = 'You reached your target.';
    } else {
        rating = 3;
        ratingDescription = 'You exceeded your target. Well done!';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: target_number,
        average
    };
};
if(require.main === module) {
    console.log(calculateExercises(process.argv.slice(3), process.argv[2])); // Example usage
}
export default calculateExercises;