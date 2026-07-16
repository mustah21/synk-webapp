import { Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage/landingPage';
import EventsPage from './Pages/events/eventsPage';
import CommunitiesPage from './Pages/community/communityPage';
import AuthPage from './Pages/auth/authPage';
import OAuthRedirect from './pages/oauth2/oauth2RedirectPage';
import EventDetailPage from './Pages/events/eventDetailPage';
import CommunityDetailPage from './Pages/community/communityDetailPage';
import CreateEventPage from './Pages/createEventPage/createEventPage';
import EditEventPage from './Pages/editEventPage/editEventPage';

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
        <Route path='/event/:publicId' element={<EventDetailPage />} />
        <Route path='/communities/:publicId' element={<CommunityDetailPage />} />
        <Route path="/event/create" element={<CreateEventPage />} />
        <Route path="/event/:publicId/edit" element={<EditEventPage />} />
      </Routes>
    </>
  )
}

export default App
