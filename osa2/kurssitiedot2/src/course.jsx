import React from 'react';

const Header = ({ courseName }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>{name}: {exercises} exercises</p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ totalExercises }) => {
  const total = totalExercises.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <p>Total exercises: {total}</p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total totalExercises={course.parts} />
    </div>
  );
};

export default Course;
