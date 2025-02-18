import "./index.css"
import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text == 'positive') {
    var num = 100 * props.value
    var value = num.toFixed(1) + ' %'
  }
  else if (props.text == 'average')
    var value = props.value.toFixed(1)
  else {
    var value = props.value
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <div>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={props.all}/>
        <StatisticLine text='average' value={props.average}/>
        <StatisticLine text='positive' value={props.positive}/>
      </div>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] =useState(0)

  const increaseGood = () => {
    const updatedGood = good +1
    setGood(updatedGood)
    const updatedAll = all +1
    setAll(updatedAll)
    setAverage( (updatedGood - bad) / updatedAll)
    setPositive(updatedGood / updatedAll)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    const updatedAll = all +1
    setAll(updatedAll)
    setAverage( (good - bad) / updatedAll)
    setPositive(good / updatedAll)
  }
  const increaseBad = () => {
    const updatedBad = bad +1
    setBad(updatedBad)
    const updatedAll = all +1
    setAll(updatedAll)
    setAverage( (good - updatedBad) / updatedAll)
    setPositive(good / updatedAll)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={increaseGood}
        text='good'
      />
      <Button
        onClick={increaseNeutral}
        text='neutral'
      />
      <Button
        onClick={increaseBad}
        text='bad'
      />
      <h1>statistics</h1>
      <Statistics 
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App