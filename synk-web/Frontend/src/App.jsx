import { useState } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from './Pages/LandingPage/landingPage';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
