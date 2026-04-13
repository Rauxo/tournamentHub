import React from 'react'
import Login from "./pages/Login"
import Home from './pages/Home'
import Create from "./pages/Create"
import Dashboard from "./pages/Dasboard"
import Organizers from "./pages/Organizers"
import Results from "./pages/Result"
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="/organizers" element={<Organizers/>} />
      </Routes>
  )
}

export default App