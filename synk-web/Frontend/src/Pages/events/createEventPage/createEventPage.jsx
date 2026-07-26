import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../../api/axios';
import './createEventPage.css';
import EventDateRangePicker from '../../../components/event/eventDateRangePicker';


const LANGUAGES = ['ENGLISH', 'FINNISH', 'SWEDISH'];

function CreateEventPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    sportName: '',
    eventDescription: '',
    language: 'ENGLISH',
  });
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [openField, setOpenField] = useState(null); // which row is expanded for editing
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleField = (name) => {
    setOpenField((prev) => (prev === name ? null : name));
  };

  const formatDate = (date) =>
    date
      ? date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
      : 'Not set';

  const formatTime = (date) =>
    date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDateTime || !endDateTime) {
      setError('Please set both a start and end time.');
      return;
    }
    if (startDateTime <= new Date(Date.now() + 5 * 60 * 1000)) {
      setError('Start time must be at least a few minutes from now.');
      return;
    }
    if (endDateTime <= startDateTime) {
      setError('End time must be after the start time.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await api.post('/api/v1/event/create', {
        ...form,
        startDateTime: startDateTime.toISOString().slice(0, 19),
        endDateTime: endDateTime.toISOString().slice(0, 19),
        communityId: null,
      });
      navigate(`/event/${res.data.data.publicId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event. Please check your details.');
      setSubmitting(false);
    }
  };

  return (
    <div className="ce-page">
      <form className="ce-canvas" onSubmit={handleSubmit}>
        <div className="ce-eyebrow">New event</div>

        <input
          type="text"
          name="title"
          className="ce-title-input"
          placeholder="Sunday 5-a-side"
          value={form.title}
          onChange={handleChange}
          required
        />
        <div className="ce-title-divider" />
        <textarea
          name="eventDescription"
          className="ce-desc-input"
          placeholder="What's the plan? Casual game, all levels welcome…"
          value={form.eventDescription}
          onChange={handleChange}
          rows={2}
          required
        />

        <div className="ce-rows">
          {/* Start / End */}
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

          {/* Sport */}
          <div className="ce-row">
            <div className="ce-row-icon">⚽</div>
            <div className="ce-row-body">
              <input
                type="text"
                name="sportName"
                className="ce-row-input"
                placeholder="Sport — Football, Padel, Basketball…"
                value={form.sportName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Language */}
          {/* <div className="ce-row">
            <div className="ce-row-icon">🌐</div>
            <div className="ce-row-body">
              <select
                name="language"
                className="ce-row-select"
                value={form.language}
                onChange={handleChange}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0) + lang.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

        </div>

        {error && <div className="ce-error">{error}</div>}

        <div className="ce-actions">
          <button type="button" className="ce-btn-ghost" onClick={() => navigate('/events')}>
            Cancel
          </button>
          <button type="submit" className="ce-btn-primary" disabled={submitting}>
            {submitting ? 'Creating…' : 'Create event'}
          </button>
        </div>
      </form>

      
    </div>
  );
}

export default CreateEventPage;