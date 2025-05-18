import {isNumber} from "./utils/isNumber";
const calculateBmi = (height: string, weight: string): string => {
    if (!isNumber(height) || !isNumber(weight)) {
        throw new Error('Provided values were not numbers!');
    }
    const heightInNumber = Number(height);
    const weightInNumber = Number(weight);
    const heightInMeters = heightInNumber / 100; // Convert height from cm to meters
    const bmi = weightInNumber / (heightInMeters * heightInMeters); // Calculate BMI
    let category: string;
    // Determine BMI category
    if (bmi < 18.5) {
        category = 'Underweight range';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal range';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight range';
    } else {
        category = 'Obesity range';
    }
    return category;
};
if(require.main === module) {
    console.log(calculateBmi(process.argv[2],process.argv[3]));
}
export default calculateBmi;