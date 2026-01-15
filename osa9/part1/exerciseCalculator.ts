interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};

interface ExerciseValues {
    hours: number[],
    target: number
};

export const calculateExercises = (hours: number[], target: number): Result => {
    let trainingDays = 0;
    const periodLength = hours.length;

    for (const h of hours) {
        if (h > 0) {
            trainingDays += 1;
        }
    };

    const totalHours = hours.reduce((sum, h) => sum + h, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average < target * 0.5) {
        rating = 1;
        ratingDescription = 'needs improvement';
    } else if (average < target * 0.90) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'great job';
    };

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error("Not enough arguments");

    const target = Number(args[2]);
    const hours = args.slice(3).map(arg => {
        const n = Number(arg);
        if (isNaN(n)) throw new Error("Provided values were not numbers!");
        return n;
    });

    return { hours, target };
};

if (require.main === module) {
    try {
    const { hours, target } = parseExerciseArguments(process.argv);
    console.log(
        calculateExercises( hours, target )
    );
    }   catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    }
}
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));