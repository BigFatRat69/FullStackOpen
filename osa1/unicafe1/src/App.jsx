import { useState } from 'react';

const StatisticsRow = ({ label, value, suffix }) => (
  <tr>
    <td>{label}</td>
    <td>
      {value} {suffix}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return <p>No feedback given yet!</p>;
  }

  const average = all === 0 ? 0 : (good - bad) / all;
  const percentage = all === 0 ? 0 : (good / all) * 100;

  return (
    <table>
      <tbody>
        <StatisticsRow label="Good" value={good} />
        <StatisticsRow label="Neutral" value={neutral} />
        <StatisticsRow label="Bad" value={bad} />
        <StatisticsRow label="All" value={all} />
        <StatisticsRow label="Average" value={average.toFixed(2)} />
        <StatisticsRow label="Positive" value={percentage.toFixed(2)} suffix="%" />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

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
      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <h2>Statistics:</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
