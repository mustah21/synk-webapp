import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from './Pages/LandingPage/landingPage';
import EventsPage from './Pages/events/eventsPage';
import CommunitiesPage from './Pages/community/communityPage';
import AuthPage from './Pages/authPage/authPage';

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/communities' element={<CommunitiesPage />} />
          <Route path='/auth' element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
