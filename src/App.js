import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './Redux/store'
import  Router from './Routes/Routes'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <div className=' w-full h-full flex items-center justify-center flex-col my-4'>

    <BrowserRouter>
    <Provider store={store}>
      <Router />
    </Provider>
  </BrowserRouter>
    </div>
  )
}

export default App