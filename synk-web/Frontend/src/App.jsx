import { useState } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from './Pages/LandingPage/landingPage';
import './App.css'
import Hero from './Pages/Hero/hero';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Hero />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
