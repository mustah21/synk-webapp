import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../../../api/axios';
import './editEventPage.css';
import '../createEventPage/createEventPage.css';
import Spinner from '../../../components/Spinner/Spinner';
import EventDateRangePicker from '../../../components/Event/EventDateRangePicker';
import EventPreviewCard from '../../../components/Event/EventPreviewCard';

const LANGUAGES = ['ENGLISH', 'FINNISH', 'SWEDISH'];

function EditEventPage() {
  const { publicId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({
    title: '',
    sportName: '',
    eventDescription: '',
    language: 'ENGLISH',
  });
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const token = localStorage.getItem('token');
  const currentUserPublicId = token ? jwtDecode(token).publicId : null;

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
          language: data.language,
        });
        setStartDateTime(data.startDateTime ? new Date(data.startDateTime) : null);
        setEndDateTime(data.endDateTime ? new Date(data.endDateTime) : null);
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to load event'))
      .finally(() => setLoading(false));
  }, [publicId, currentUserPublicId, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDateTime || !endDateTime) {
      setError('Please set both a start and end time.');
      return;
    }
    if (endDateTime <= startDateTime) {
      setError('End time must be after the start time.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await api.put(`/api/v1/event/${publicId}`, {
        ...form,
        startDateTime: startDateTime.toISOString().slice(0, 19),
        endDateTime: endDateTime.toISOString().slice(0, 19),
      });
      navigate(`/event/${publicId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update event.');
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);

    try {
      await api.delete(`/api/v1/event/${publicId}`);
      navigate('/events');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete event.');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) return <Spinner fullPage label="Loading event..." />;
  if (!event) return null;

  return (
    <div className="ce-page">
      <div className="ce-layout">
        <form className="ce-canvas" onSubmit={handleSubmit}>
          <div className="ce-eyebrow">Edit event</div>

          <input
            type="text"
            name="title"
            className="ce-title-input"
            value={form.title}
            onChange={handleChange}
            required
          />

          <div className="ce-title-divider" />

          <textarea
            name="eventDescription"
            className="ce-desc-input"
            value={form.eventDescription}
            onChange={handleChange}
            rows={2}
            required
          />

          <div className="ce-rows">
            <div className="ce-daterange-row">
              <EventDateRangePicker
                startDate={startDateTime}
                endDate={endDateTime}
                onChange={(start, end) => {
                  setStartDateTime(start);
                  setEndDateTime(end);
                }}
              />
            </div>

            <div className="ce-row">
              <div className="ce-row-icon">⚽</div>
              <div className="ce-row-body">
                <input
                  type="text"
                  name="sportName"
                  className="ce-row-input"
                  value={form.sportName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="ce-row">
              <div className="ce-row-icon">🌐</div>
              <div className="ce-row-body">
                <select
                  name="language"
                  className="ce-row-select"
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
          </div>

          {error && <div className="ce-error">{error}</div>}

          <div className="ce-actions">
            <button
              type="button"
              className="ce-btn-danger"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleting || submitting}
            >
              Delete Event
            </button>

            <div className="ce-actions-right">
              <button type="button" className="ce-btn-ghost" onClick={() => navigate(`/event/${publicId}`)}>
                Cancel
              </button>
              <button type="submit" className="ce-btn-primary" disabled={submitting || deleting}>
                {submitting ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
        </form>

        <EventPreviewCard
          title={form.title}
          sportName={form.sportName}
          eventDescription={form.eventDescription}
          language={form.language}
          startDateTime={startDateTime}
          endDateTime={endDateTime}
        />
      </div>

      {showDeleteConfirm && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2>Delete this event?</h2>
            <p>This action cannot be undone.</p>

            <div className="delete-modal-actions">
              <button
                type="button"
                className="ce-btn-ghost"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="ce-btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting…' : 'Yes, delete it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditEventPage;