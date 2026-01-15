interface BmiValues {
  height: number;
  weight: number;
}

export const calculateBmi = (h: number, w: number): string => {
  const bmi = w / ((h / 100) * (h / 100));

  if (bmi < 18.5) return "Underweight";
  if (bmi >= 25) return "Overweight";
  return "Normal range";
};

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  return { height, weight };
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
