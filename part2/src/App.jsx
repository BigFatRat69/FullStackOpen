const Header = (course) => {
  return (
    <div>
      <h1>
        {course.course}
      </h1>
    </div>
  )
}

const Part = (parts) => {
  return (
    <div>
      <p>{parts.part}: {parts.exercise} exercises</p>
    </div>
  )
}

const Content = (content) => {
  return (
    <div>
      <Part part={content.part1} exercise={content.exercises1} />
      <Part part={content.part2} exercise={content.exercises2} />
      <Part part={content.part3} exercise={content.exercises3} />
    </div>
  )
}

const Total = (totalExercises) => {
  return (
    <p>
      Total exercises: {totalExercises.totalExercises}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const totalExercises = exercises1 + exercises2 + exercises3


  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total totalExercises={totalExercises}/>
    </div>
  )
}

export default App