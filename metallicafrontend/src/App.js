import React, { Component } from 'react';
import './App.css';
import RouterComponent from './Router/RouterComponent'
import { Provider } from 'react-redux'
import Store from './Store/Store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import React from 'react'

class App extends Component {

  render() {

    return (
      <div>
        <Provider store={Store}>
          <RouterComponent /></Provider>
        <ToastContainer />
      </div>
    )
  }
}

export default App;
