import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './eventDetailPage.css';
import Spinner from '../../components/Spinner/Spinner';



function EventDetailPage() {

  const navigate = useNavigate();
  const { publicId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/api/v1/event/${publicId}`)
      .then(res => setEvent(res.data.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load event'))
      .finally(() => setLoading(false));
  }, [publicId]);

  if (loading) return <Spinner fullPage label="Loading events..." />;
  if (error) return <p>{error}</p>;
  if (!event) return null;


  return (
    <div className="event-detail-page">
      <div className="event-detail-container">
        <button className="event-detail-back" onClick={() => navigate('/events')}>
          ← Back to events
        </button>

        <div className="event-detail-card">
          <div className="event-detail-header">
            <div>
              <span className="event-detail-sport">{event.sportName}</span>
              <h1 className="event-detail-title">{event.title}</h1>
            </div>
            <span className="event-detail-language">{event.language}</span>
          </div>

          <div className="event-detail-meta">
            <div className="event-detail-meta-item">
              <span className="event-detail-meta-label">Date</span>
              <span className="event-detail-meta-value">{event.hostingDate}</span>
            </div>
            <div className="event-detail-meta-item">
              <span className="event-detail-meta-label">Host</span>
              <span className="event-detail-meta-value">{event.creator?.firstName}</span>
            </div>
          </div>

          <p className="event-detail-description">{event.eventDescription}</p>

          <div className="event-detail-actions">
            <button className="event-detail-join-btn">Join event</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;