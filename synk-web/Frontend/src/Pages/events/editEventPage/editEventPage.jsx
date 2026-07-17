import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../../../api/axios';
import './editEventPage.css';
import Spinner from '../../../components/Spinner/Spinner';

const LANGUAGES = ['FINNISH', 'ENGLISH', 'SWEDISH'];

function EditEventPage() {
  const { publicId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({
    title: '',
    sportName: '',
    eventDescription: '',
    hostingDate: '',
    language: 'ENGLISH'
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const currentUserPublicId = token ? jwtDecode(token).publicId : null; // confirm this claim name matches your JWT payload

  useEffect(() => {
    api.get(`/api/v1/event/${publicId}`)
      .then(res => {
        const data = res.data.data;

        if (currentUserPublicId !== data.creator?.publicId) {
          navigate(`/event/${publicId}`);
          return;
        }

        setEvent(data);
        setForm({
          title: data.title,
          sportName: data.sportName,
          eventDescription: data.eventDescription,
          hostingDate: data.hostingDate?.slice(0, 16), // trim to datetime-local format
          language: data.language
        });
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to load event'))
      .finally(() => setLoading(false));
  }, [publicId, currentUserPublicId, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.put(`/api/v1/event/${publicId}`, form);
      navigate(`/event/${publicId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update event.');
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this event? This cannot be undone.');
    if (!confirmed) return;

    setDeleting(true);
    try {
      await api.delete(`/api/v1/event/${publicId}`);
      navigate('/events');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete event.');
      setDeleting(false);
    }
  };

  if (loading) return <Spinner fullPage label="Loading event..." />;
  if (!event) return null;

  return (
    <div className="edit-event-page">
      <div className="edit-event-header">
        <h1>Edit Event</h1>
        <p>Update your event details</p>
      </div>

      <form className="edit-event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sportName">Sport</label>
          <input
            id="sportName"
            name="sportName"
            type="text"
            value={form.sportName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDescription">Description</label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            value={form.eventDescription}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="hostingDate">Date &amp; Time</label>
            <input
              id="hostingDate"
              name="hostingDate"
              type="datetime-local"
              value={form.hostingDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={form.language}
              onChange={handleChange}
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>
                  {lang.charAt(0) + lang.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <button
            type="button"
            className="btn-danger"
            onClick={handleDelete}
            disabled={deleting || submitting}
          >
            {deleting ? 'Deleting...' : 'Delete event'}
          </button>

          <div className="form-actions-right">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(`/event/${publicId}`)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting || deleting}>
              {submitting ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditEventPage;