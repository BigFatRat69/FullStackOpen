const Header = ({course}) => {
  return (
    <div>
      <h1>
        {course}
      </h1>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <p>{part.name} exercises: {part.exercises}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  const renderedParts = [];
  for (let i = 0; i < parts.length; i++) {
    renderedParts.push(<Part key={i} part={parts[i]} />);
  }
  return <div>{renderedParts}</div>;
};

const Total = ( { totalExercises } ) => {
  const total = totalExercises.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <p>Total exercises: {total}</p>
    </div>
  );
};


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total totalExercises={parts}/>
    </div>
  )
}

export default App