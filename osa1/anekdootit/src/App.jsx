import { useState } from 'react'

const MostVotes = (props) => {
  console.log(props)
  const { max, index } = props.voted.reduce((acc, num, i) => 
    num > acc.max ? { max: num, index: i } : acc, 
    { max: -Infinity, index: -1 }
  )
  return (
    <div>
      <p>{props.anecdotes[index]}</p>
      <p>has {max} votes</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const getRandomInteger = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const votes = new Uint8Array(8)
  
  const [selected, setSelected] = useState(0)

  const [voted, setVoted] = useState(new Uint8Array(8))

  const randomizeSelected = () => {
    const randomInteger = getRandomInteger(0, 8)
    setSelected(randomInteger)
  }

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    if (voted == 0) {
      setVoted(copy)
    }
    else {
      const updateVote = copy.map((value, index) => value + voted[index]);
      setVoted(updateVote)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {voted[selected]} votes</p>
      <Button
        onClick={addVote}
        text='vote'
      />
      <Button
        onClick={randomizeSelected}
        text='next anecdote'
      />
      <h1>Anecdote with most votes</h1>
      <MostVotes
        anecdotes={anecdotes}
        voted={voted}
      />
    </div>
  )
}

export default App