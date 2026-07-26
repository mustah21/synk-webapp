import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './eventDateRangePicker.css';

const TIME_SLOTS_HOURS = Array.from({ length: 24 }, (_, h) => h);

function formatDay(date) {
  return date
    ? date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
    : '—';
}

function TimeInput({ date, onChange }) {
  const [raw, setRaw] = useState(date ? formatTime(date) : '');

  useEffect(() => {
    setRaw(date ? formatTime(date) : '');
  }, [date]);

  const handleInput = (e) => {
    // strip everything except digits, cap at 4 digits (HHMM)
    let digits = e.target.value.replace(/\D/g, '').slice(0, 4);

    // auto-insert the colon as they type
    let formatted = digits;
    if (digits.length >= 3) {
      formatted = `${digits.slice(0, 2)}:${digits.slice(2)}`;
    }
    setRaw(formatted);
  };

  const commit = () => {
    const match = raw.match(/^(\d{1,2}):?(\d{0,2})$/);
    if (!match || !date) {
      setRaw(date ? formatTime(date) : '');
      return;
    }

    let hours = parseInt(match[1], 10);
    let minutes = match[2] ? parseInt(match[2], 10) : 0;

    if (isNaN(hours) || hours > 23) hours = 0;
    if (isNaN(minutes) || minutes > 59) minutes = 0;

    onChange(hours, minutes);
    setRaw(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      className="edrp-time-input"
      placeholder="HH:MM"
      value={raw}
      onChange={handleInput}
      onBlur={commit}
      onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
      maxLength={5}
    />
  );
}
function formatTime(date) {
  return date
    ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '—';
}

function setTimeOnDate(date, hours, minutes) {
  const next = new Date(date);
  next.setHours(hours, minutes, 0, 0);
  return next;
}

function TimeStrip({ date, onPick }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && date) {
      const activeEl = scrollRef.current.querySelector('.edrp-time-active');
      activeEl?.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
  }, [date]);

  return (
    <div className="edrp-time-strip" ref={scrollRef}>
      {TIME_SLOTS_HOURS.flatMap((h) =>
        [0, 30].map((m) => {
          const isActive = date && date.getHours() === h && date.getMinutes() === m;
          const label = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
          return (
            <button
              type="button"
              key={label}
              className={`edrp-time-chip ${isActive ? 'edrp-time-active' : ''}`}
              onClick={() => onPick(h, m)}
            >
              {label}
            </button>
          );
        })
      )}
    </div>
  );
}

function EventDateRangePicker({ startDate, endDate, onChange, minDate }) {
  const [open, setOpen] = useState(false);
  const [activeSide, setActiveSide] = useState('start'); // 'start' | 'end'
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRangeChange = (dates) => {
    const [start, end] = dates;

    // preserve whatever time was already set when the date changes
    const newStart = start
      ? setTimeOnDate(start, startDate?.getHours() ?? 12, startDate?.getMinutes() ?? 0)
      : null;
    const newEnd = end
      ? setTimeOnDate(end, endDate?.getHours() ?? 13, endDate?.getMinutes() ?? 0)
      : null;

    onChange(newStart, newEnd);

    if (start && !end) setActiveSide('end');
  };

  const handleTimePick = (hours, minutes) => {
    if (activeSide === 'start' && startDate) {
      onChange(setTimeOnDate(startDate, hours, minutes), endDate);
    } else if (activeSide === 'end' && endDate) {
      onChange(startDate, setTimeOnDate(endDate, hours, minutes));
    }
  };

  return (
    <div className="edrp" ref={wrapperRef}>
      <button type="button" className="edrp-trigger" onClick={() => setOpen((o) => !o)}>
        <div className="edrp-trigger-side">
          <span className="edrp-trigger-label">From</span>
          <span className="edrp-trigger-value">
            {formatDay(startDate)} <span className="edrp-trigger-time">{formatTime(startDate)}</span>
          </span>
        </div>
        <div className="edrp-trigger-arrow">→</div>
        <div className="edrp-trigger-side">
          <span className="edrp-trigger-label">To</span>
          <span className="edrp-trigger-value">
            {formatDay(endDate)} <span className="edrp-trigger-time">{formatTime(endDate)}</span>
          </span>
        </div>
      </button>

      {open && (
        <div className="edrp-popover">
          <div className="edrp-popover-calendar">
            <DatePicker
              selectsRange
              inline
              startDate={startDate}
              endDate={endDate}
              onChange={handleRangeChange}
              minDate={minDate || new Date()}
              monthsShown={1}
            />
          </div>

          <div className="edrp-popover-time">
            <div className="edrp-time-tabs">
              <button
                type="button"
                className={`edrp-time-tab ${activeSide === 'start' ? 'edrp-time-tab-active' : ''}`}
                onClick={() => setActiveSide('start')}
              >
                Start · {formatTime(startDate)}
              </button>
              <button
                type="button"
                className={`edrp-time-tab ${activeSide === 'end' ? 'edrp-time-tab-active' : ''}`}
                onClick={() => setActiveSide('end')}
              >
                End · {formatTime(endDate)}
              </button>
            </div>

            <TimeInput
              date={activeSide === 'start' ? startDate : endDate}
              onChange={handleTimePick}
            />

            <TimeStrip
              date={activeSide === 'start' ? startDate : endDate}
              onPick={handleTimePick}
            />
          </div>

          <button type="button" className="edrp-done-btn" onClick={() => setOpen(false)}>
            Done
          </button>
        </div>
      )}
    </div>
  );
}

export default EventDateRangePicker;