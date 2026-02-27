import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Add from './components/Add'

import PrivateRoutes from './components/PrivateRoutes'
import Login1 from './components/Login1'

const App = () => {
  return (
    <div>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login1/>}/>
      <Route element={<PrivateRoutes/>}>
      <Route path="/add" element={<Add/>}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App