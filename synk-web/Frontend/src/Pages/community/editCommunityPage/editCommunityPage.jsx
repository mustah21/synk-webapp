import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../../../api/axios';
import './editCommunityPage.css';
import Spinner from '../../../components/Spinner/Spinner';

function EditCommunityPage() {
  const { publicId } = useParams();
  const navigate = useNavigate();

  const [community, setCommunity] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const token = localStorage.getItem('token');
  const currentUserPublicId = token ? jwtDecode(token).publicId : null;

  useEffect(() => {
    api.get(`/api/v1/community/${publicId}`)
      .then(res => {
        const data = res.data.data;

        if (currentUserPublicId !== data.creator?.publicId) {
          navigate(`/communities/${publicId}`);
          return;
        }

        setCommunity(data);
        setForm({
          name: data.name,
          description: data.description
        });
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to load community'))
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
      await api.put(`/api/v1/community/${publicId}`, form);
      navigate(`/communities/${publicId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update community.');
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/api/v1/community/${publicId}`);
      navigate('/communities');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete community.');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) return <Spinner fullPage label="Loading community..." />;
  if (!community) return null;

  return (
    <div className="edit-community-page">
      <div className="edit-community-header">
        <h1>Edit Community</h1>
        <p>Update your community details</p>
      </div>

      <form className="edit-community-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <button
            type="button"
            className="btn-danger"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={deleting || submitting}
          >
            Delete community
          </button>

          <div className="form-actions-right">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(`/communities/${publicId}`)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting || deleting}>
              {submitting ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>
      </form>

      {showDeleteConfirm && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2>Delete this community?</h2>
            <p>This action cannot be undone. All memberships will be removed.</p>
            <div className="delete-modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Yes, delete it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCommunityPage;