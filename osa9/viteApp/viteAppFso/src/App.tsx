interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>group projects {part.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
          <p>background material: {part.backgroundMaterial}</p>
        </div>
      );

    case "special":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
          <p>requirements: {part.requirements.join(", ")}</p>
        </div>
      );

    default:
      return assertNever(part);
  }
};

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => (
  <>
    {courseParts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </>
);

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const Total = ({ total }: { total: number }) => (
  <p>Number of exercises {total}</p>
);

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
