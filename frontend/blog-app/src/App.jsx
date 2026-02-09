import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Add from './components/Add'
import Login from './components/Login'

const App = () => {
  return (
    <div>
      <Navbar/>
    <Routes>
      
      <Route path="/"element={<Home/>} />
      <Route path="/add"element={<Add/>} />
      <Route path="/login"element={<Login/>} />

    </Routes>
    </div>
  )
}

export default App