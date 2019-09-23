import React from 'react'
import { hot } from 'react-hot-loader/root'
import styles from './app.scss'

const App = () => (
  <div className={styles.container}>
    <div>nav</div>
    <div>body</div>
    <div>footer123</div>
  </div>
)

export default hot(App)
