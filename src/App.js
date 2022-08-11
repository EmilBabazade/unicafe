import { useState } from 'react'

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

const Feedback = ({
  handleClickGood, 
  handleClickNeutral,
  handleClickBad
}) => (
  <div>
    <h3>Give Feedback</h3>
    <Button clickHandler={handleClickGood} text='good' />
    <Button clickHandler={handleClickNeutral} text='neutral' />
    <Button clickHandler={handleClickBad} text='bad' />
  </div>
)

const Statistic = ({label, value}) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + bad + neutral;
  const average = (good - bad) / total;
  const positive = good / total;
  let statistics = <p>No feedback given</p>
  if(good || neutral || bad) {
    statistics = (
      <table>
        <tbody>
          <Statistic label='good' value={good} />
          <Statistic label='neutral' value={neutral} />
          <Statistic label='bad' value={bad} />
          <Statistic label='average' value={average} />
          <Statistic label='positive' value={positive} />
        </tbody>
      </table>
    );
  }
  return (
    <div>
      <h3>Statistics</h3>
      {statistics}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickHandler = (state, setter) => {
    return () => setter(state + 1);
  };

  return (
    <div>
      <Feedback 
        handleClickBad={clickHandler(bad, setBad)}
        handleClickGood={clickHandler(good, setGood)}
        handleClickNeutral={clickHandler(neutral, setNeutral)} />
      <Statistics 
        good={good}
        bad={bad}
        neutral={neutral} />
    </div>
  )
}

export default App
