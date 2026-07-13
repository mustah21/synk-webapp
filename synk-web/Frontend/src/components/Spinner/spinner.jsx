import './Spinner.css';

/**
 * Universal loading spinner.
 *
 * Usage:
 *   <Spinner />                          // default, inline
 *   <Spinner size="sm" />                // small, e.g. inside a button
 *   <Spinner size="lg" label="Loading events..." />
 *   <Spinner fullPage label="Loading..." />   // centers in the viewport
 *
 * Props:
 *   size      - 'sm' | 'md' | 'lg'   (default: 'md')
 *   label     - optional text shown under/beside the spinner
 *   fullPage  - boolean, centers the spinner in the full page/container
 */
export default function Spinner({ size = 'lg', label, fullPage = false }) {
  const spinner = (
    <div className={`spinner-wrapper ${fullPage ? 'spinner-fullpage' : ''}`}>
      <div className={`spinner spinner-${size}`} role="status" aria-label={label || 'Loading'} />
      {label && <span className="spinner-label">{label}</span>}
    </div>
  );

  return spinner;
}