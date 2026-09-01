import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const all = good + bad + neutral
  const avg = (good - bad) / all
  const positive = good / all * 100
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {avg}</p>
      <p>positive {positive}%</p>
    </>
  )
}

const History = ({good, neutral, bad, click}) => {
  if (click === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <Statistics good={good} neutral={neutral} bad={bad} />
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [click ,setClick] = useState(0)
  
  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedClick = click + 1
    setClick(updatedClick)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedClick = click + 1
    setClick(updatedClick)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedClick = click + 1
    setClick(updatedClick)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <History good={good} neutral={neutral} bad={bad} click={click} />
    </div>
  )
}

export default App