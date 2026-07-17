import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../../api/axios';
import './CreateEventPage.css';

const LANGUAGES = ['FINNISH', 'ENGLISH', 'SWEDISH'];

function CreateEventPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    sportName: '',
    eventDescription: '',
    language: 'ENGLISH'
  });
  const [hostingDate, setHostingDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hostingDate) {
      setError('Please select a date and time.');
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const res = await api.post('/api/v1/event/create', {
        ...form,
        hostingDate: hostingDate.toISOString().slice(0, 19), // adjust to match backend's expected format
        communityId: null
      });
      navigate(`/event/${res.data.data.publicId}`);
    } catch (err) {
      setError('Failed to create event. Please check your details and try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-header">
        <h1>Create Event</h1>
        <p>Set up a game for others to join</p>
      </div>

      <form className="create-event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Sunday 5-a-side"
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
            placeholder="Football"
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
            placeholder="Casual game, all levels welcome"
            rows={4}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="hostingDate">Date &amp; Time</label>
            <DatePicker
              id="hostingDate"
              selected={hostingDate}
              onChange={(date) => setHostingDate(date)}
              showTimeSelect
              minDate={new Date()}
              dateFormat="MMM d, yyyy h:mm aa"
              placeholderText="Select date and time"
              className="theme-datepicker-input"
              calendarClassName="theme-datepicker-calendar"
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
            className="btn-secondary"
            onClick={() => navigate('/event')}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEventPage;