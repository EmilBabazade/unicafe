import React, {useState, Dispatch, SetStateAction} from 'react'
import ReactDOM from 'react-dom'

interface FeedbackProps {
  onClickGood: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void),
  onClickNeutral: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void),
  onClickBad: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void),
}

const Feedback = ({ onClickGood, onClickNeutral, onClickBad }: FeedbackProps) => (
  <div>
    <h1>Give Feedback</h1>
    <button onClick={onClickGood}>good</button>
    <button onClick={onClickNeutral}>neutral</button>
    <button onClick={onClickBad}>bad</button>
  </div>
)

interface StatisticsProps {
  good: number,
  neutral: number,
  bad: number
}

const Statistics = ({good, neutral, bad}: StatisticsProps) => {
  if(good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
  }

  const total = (good + neutral + bad)
  const average = total === 0 ? 0 : ( good - bad ) / total
  const positive = total === 0 ? 0 : ( good * 100 ) / total 
  
  return (
    <div>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  )
}

const App = () => {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)

  const onClickFeedbackButton = (state: number, stateSetter: Dispatch<SetStateAction<number>>)
  : ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) => {
    return () => stateSetter(state + 1)
  }

  return (
    <div>
      <Feedback 
        onClickGood={onClickFeedbackButton(goodCount, setGoodCount)}
        onClickNeutral={onClickFeedbackButton(neutralCount, setNeutralCount)}
        onClickBad={onClickFeedbackButton(badCount, setBadCount)}
      />
      <Statistics 
        good={goodCount}
        neutral={neutralCount}
        bad={badCount}
      />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
