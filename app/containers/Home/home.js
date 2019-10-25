import React, { useState, useReducer, useEffect } from 'react'
import axios from 'axios'

import styles from './home.scss'

export const dataReducer = (state, action) => {
  if (action.type === 'SET_ERROR') {
    return { ...state, list: [], error: true }
  }

  if (action.type === 'SET_LIST') {
    return { ...state, list: action.list, error: null }
  }

  throw new Error()
}

const initialData = {
  list: [],
  error: null,
}

export const Counter = ({ counter }) => (
  <div>
    <p>{counter}</p>
  </div>
)

const Home = () => {
  const [counter, setCounter] = useState(0)
  const [data, dispatch] = useReducer(dataReducer, initialData)

  useEffect(() => {
    axios
      .get('http://hn.algolia.com/api/v1/search?query=react')
      .then((response) => {
        dispatch({ type: 'SET_LIST', list: response.data.hits })
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR' })
      })
  }, [])

  return (
    <div>
      <h1>My Counter</h1>
      <Counter counter={counter} />
      <button type='button' onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
      <button type='button' onClick={() => setCounter(counter - 1)}>
        Decrement
      </button>
      <h2>My Async Data</h2>
      {data.error && <div className={styles.error}>Error</div>}
      <ul>
        {data.list.map((item) => (
          <li key={item.objectID}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
