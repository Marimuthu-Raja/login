import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './Components/Routes/Router'


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    )
  }
}
