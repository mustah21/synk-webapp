import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './eventsPage.css';
import Spinner from '../../components/Spinner/Spinner';


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
          {events.map(event => {
            // NOTE: adjust these field names if your API returns something different
            // (check the Network tab response for /api/v1/event/events)
            const startDateTime = event.startDateTime ? new Date(event.startDateTime) : null;
            const endDateTime = event.endDateTime ? new Date(event.endDateTime) : null;

            const dayLabel = startDateTime
              ? startDateTime.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
              : 'Date not set';

            const startTime = startDateTime
              ? startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : null;
            const endTime = endDateTime
              ? endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : null;

            const timeLabel = startTime && endTime ? `${startTime} – ${endTime}` : 'Time not set';

            return (
              <div
                key={event.publicId}
                className="event-card"
                onClick={() => navigate(`/event/${event.publicId}`)}
              >
                <div className="event-card-top">
                  {event.sportName && (
                    <span className="event-card-sport-pill">{event.sportName}</span>
                  )}
                  {event.language && (
                    <span className="event-card-lang-pill">
                      {event.language.charAt(0) + event.language.slice(1).toLowerCase()}
                    </span>
                  )}
                </div>

                <h3 className="event-card-title">{event.title || 'Untitled event'}</h3>

                <div className="event-card-meta">
                  <div className="event-card-meta-row">
                    <span className="event-card-meta-icon">📅</span>
                    <span>{dayLabel}</span>
                  </div>
                  <div className="event-card-meta-row">
                    <span className="event-card-meta-icon">🕒</span>
                    <span>{timeLabel}</span>
                  </div>
                </div>

                {event.eventDescription && (
                  <p className="event-card-description">{event.eventDescription}</p>
                )}

                <div className="event-card-footer">
                  <span className="event-card-count">{event.registeredCount || 0} spots taken</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default EventsPage;