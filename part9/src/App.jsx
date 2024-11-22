import { useState } from 'react'
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);


const StatisticLine = ({ text, value, suffix }) => (
  <p>
    {text}: {value} {suffix}
  </p>
);



const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return <p>No feedback given yet!</p>;
  }

  const average = all === 0 ? 0 : (good - bad) / all;
  const percentage = all === 0 ? 0 : (good / all) * 100;

  return (
    <div>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={all} />
      <StatisticLine text="Average" value={average.toFixed(2)} />
      <StatisticLine text="Positive" value={percentage.toFixed(2)} suffix="%" />
    </div>
  );
};



const Display = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given yet!</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All: {all}</p>
        <Statistics task="average" good={good} bad={bad} all={all}/>
        <Statistics task="percentage" good={good} bad={bad} all={all}/>
      </div>
    );
  };
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood()} text="Good"/>
      <Button onClick={handleNeutral()} text="Neutral"/>
      <Button onClick={handleNeutral()} text="Bad"/>
      <h2>Statistics:</h2>
      <Display good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App