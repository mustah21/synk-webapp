import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/axios';
import './eventDetailPage.css';
import Spinner from '../../components/Spinner/Spinner';
import { useAuth } from '../../context/authContext';


function EventDetailPage() {

  const { isAuth, token } = useAuth();
  const navigate = useNavigate();
  const { publicId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [joinError, setJoinError] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [attendeesError, setAttendeesError] = useState(null);

  const currentUserPublicId = token ? jwtDecode(token).publicId : null;
  const isCreator = event && currentUserPublicId === event.creator?.publicId;

  const fetchAttendees = async () => {
    try {
      const res = await api.get(`/api/v1/registration/event/${publicId}/attendees`);
      setAttendees(res.data.data);
    } catch (err) {
      setAttendeesError(
        err.response?.data?.message || "Failed to load attendees."
      );
    }
  };


  const handleLeaveEvent = async () => {
    if (leaving) return;
    setLeaving(true);
    setLeaveError(null);

    try {
      await api.delete(`/api/v1/registration/leave/${publicId}`);
      setJoined(false);
      fetchAttendees();
    } catch (err) {
      setLeaveError(err.response?.data?.message || 'Failed to leave. Please try again.');
    } finally {
      setLeaving(false);
    }
  };

  const handleJoinEvent = async () => {
    if (joining || joined) return;
    setJoining(true);
    setJoinError(null);

    try {
      await api.post(`/api/v1/registration/join/${publicId}`);
      setJoined(true);
      fetchAttendees();
    } catch (err) {
      setJoinError(err.response?.data?.message || 'Failed to join. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  const getPublicEvents = async () => {
    try {
      const res = await api.get(`/api/v1/event/${publicId}`);
      setEvent(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  const getMyRegistrations = async () => {
    try {
      const res = await api.get("/api/v1/registration/my");
      const alreadyJoined = res.data.data.some(
        r => r.event.publicId === publicId
      );
      setJoined(alreadyJoined);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPublicEvents();

    if (isAuth) {
      getMyRegistrations();
    }
  }, [publicId]);

  useEffect(() => {
    fetchAttendees();
  }, [publicId])


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
            {isCreator && (
              <button
                className="event-detail-edit-btn"
                onClick={() => navigate(`/event/${publicId}/edit`)}
              >
                Edit event
              </button>
            )}

            {joined ? (
              <button
                className="event-detail-leave-btn"
                onClick={handleLeaveEvent}
                disabled={leaving}
              >
                {leaving ? (
                  <>
                    <span className="spinner"></span>
                    Leaving...
                  </>
                ) : (
                  "Leave event"
                )}
              </button>
            ) : (
              <button
                className="event-detail-join-btn"
                onClick={handleJoinEvent}
                disabled={joining}
              >
                {joining ? (
                  <>
                    <span className="spinner"></span>
                    Joining...
                  </>
                ) : (
                  "Join event"
                )}
              </button>
            )}
            {joinError && <p className="join-error">{joinError}</p>}
            {leaveError && <p className="join-error">{leaveError}</p>}
          </div>
          {attendees.length > 0 && (
            <div className="event-detail-attendees">
              <h2 className="event-detail-attendees-title">Attendees ({attendees.length})</h2>
              <ul className="event-detail-attendees-list">
                {attendees.map(a => (
                  <li key={a.user.publicId} className="event-detail-attendee">
                    <span>{a.user.firstName}</span>
                    <span className="event-detail-attendee-status">{a.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;