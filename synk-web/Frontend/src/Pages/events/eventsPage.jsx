import { useState, useEffect } from 'react';
import axios from 'axios';
import './EventsPage.css';

const API_BASE = 'http://localhost:3000';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/api/v1/event/events`)
      .then(res => {
        setEvents(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load events');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="events-status">Loading events...</div>;
  if (error) return <div className="events-status events-error">{error}</div>;

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Events</h1>
        <p>Find a game near you</p>
      </div>

      {events.length === 0 ? (
        <div className="events-status">No events yet. Be the first to create one.</div>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event.publicId} className="event-card">
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