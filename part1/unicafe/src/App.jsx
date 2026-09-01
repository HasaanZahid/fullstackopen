import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const all = good + bad + neutral
  const avg = (good - bad) / all
  const positive = (good / all * 100) + '%'
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={avg} />
          <StatisticsLine text="positive" value={positive} />
        </tbody>
      </table>
      
    </>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>
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
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <History good={good} neutral={neutral} bad={bad} click={click} />
    </div>
  )
}

export default App