import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './eventsPage.css';
import Spinner from '../../components/Spinner/Spinner';
import CreateEventPage from '../createEventPage/createEventPage';

function EventsPage() {

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = () => {

    api.get('/api/v1/event/events')
      .then(res => {
        setEvents(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load events');
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchEvents();
  }, []);



  if (loading) return <Spinner fullPage label="Loading events..." />;
  if (error) return <div className="events-status events-error">{error}</div>;

  return (
    <div className="events-page">
      <div className="events-header">
        <div>
          <h1>Events</h1>
          <p>Find a game near you</p>
        </div>
        <button className="events-create-btn" onClick={() => navigate('/event/create')}>Create Event</button>

      </div>

      {events.length === 0 ? (
        <div className="events-status">No events yet. Be the first to create one.</div>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event.publicId} className="event-card" onClick={() => navigate(`/event/${event.publicId}`)}>

              <div className="event-card-sport">{event.sportName}</div>
              <h2 className="event-card-title">{event.title}</h2>
              <p className="event-card-description">{event.eventDescription}</p>
              <div className="event-card-footer">
                <span className="event-card-date">
                  {new Date(event.hostingDate).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </span>
                <span className="event-card-count">{event.registeredCount} joined</span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventsPage;