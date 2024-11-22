import { useState } from 'react'

const Display = ({ good, neutral, bad, all }) => {
  let average = all === 0 ? 0 : Math.round((good / all) * 100) / 100;
  let percentage = all === 0 ? 0 : Math.round(good / all * 100);


  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Precentage: {precentage}%</p>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => { setGood(good + 1); setAll(all + 1); }}>Good</button>
      <button onClick={() => {setNeutral(neutral + 1); setAll(all + 1); }}>Neutral</button>
      <button onClick={() => {setBad(bad + 1); setAll(all + 1); }}>Bad</button>
      <h2>Results:</h2>
      <Display good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App