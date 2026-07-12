import { Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage/landingPage';
import EventsPage from './Pages/events/eventsPage';
import CommunitiesPage from './Pages/community/communityPage';
import AuthPage from './Pages/auth/authPage';
import OAuthRedirect from './pages/oauth2/oAuth2Redirect';

import './App.css'

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/communities' element={<CommunitiesPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/oauth2/redirect' element={<OAuthRedirect />} />
        </Routes>
    </>
  )
}

export default App
