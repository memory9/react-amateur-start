import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

const Home = () => {
  return <h2>Home</h2>
}

const About = () => {
  return <h2>About</h2>
}

const Users = () => {
  return <h2>Users</h2>
}

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/users'>Users</Link>
          </li>
        </ul>
      </nav>
    </div>
    <Route path='/' exact component={Home} />
    <Route path='/about' exact component={About} />
    <Route path='/users' exact component={Users} />
  </BrowserRouter>
)

export default hot(AppRouter)
