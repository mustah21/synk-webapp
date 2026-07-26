import './eventPreviewCard.css';

function formatDay(date) {
  return date
    ? date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
    : null;
}

function formatTime(date) {
  return date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
}

function EventPreviewCard({ title, sportName, eventDescription, language, startDateTime, endDateTime }) {
  const startDay = formatDay(startDateTime);
  const startTime = formatTime(startDateTime);
  const endTime = formatTime(endDateTime);

  return (
    <div className="epc">
      <div className="epc-eyebrow">Preview</div>

      <div className="epc-card">
        <div className="epc-top">
          {sportName && <span className="epc-sport-pill">{sportName}</span>}
          {language && <span className="epc-lang-pill">{language.charAt(0) + language.slice(1).toLowerCase()}</span>}
        </div>

        <h3 className="epc-title">{title || 'Untitled event'}</h3>

        <div className="epc-meta">
          <div className="epc-meta-row">
            <span className="epc-meta-icon">📅</span>
            <span>{startDay || 'Date not set'}</span>
          </div>
          <div className="epc-meta-row">
            <span className="epc-meta-icon">🕒</span>
            <span>
              {startTime && endTime ? `${startTime} – ${endTime}` : 'Time not set'}
            </span>
          </div>
        </div>

        {eventDescription && <p className="epc-desc">{eventDescription}</p>}

        <div className="epc-footer">
          <span className="epc-footer-label">0 spots taken</span>
        </div>
      </div>
    </div>
  );
}

export default EventPreviewCard;