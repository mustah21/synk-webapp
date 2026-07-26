import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import './createCommunityPage.css';

function CreateCommunityPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(form)], { type: 'application/json' }));
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await api.post('/api/v1/community/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/communities/${res.data.data.publicId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create community.');
      setSubmitting(false);
    }
  };

  return (
    <div className="create-community-page">
      <div className="create-community-header">
        <h1>Create Community</h1>
        <p>Start a group for people who share your interests</p>
      </div>

      <form className="create-community-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Sunday Football Club"
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
            placeholder="A casual group for weekend games"
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="displayPicture">Cover image</label>
          <input
            id="displayPicture"
            name="displayPicture"
            type="file"
            accept='image/*'
            onChange={handleFileChange}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="create-community-image-preview" />
          )}
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/communities')}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Community'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCommunityPage;