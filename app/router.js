import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import Home from 'containers/Home'
import About from 'containers/About'
import Users from 'containers/Users'

const AppRouter = () => (
  <BrowserRouter>
    <Route path='/' exact component={Home} />
    <Route path='/about' exact component={About} />
    <Route path='/users' exact component={Users} />
  </BrowserRouter>
)

export default hot(AppRouter)
