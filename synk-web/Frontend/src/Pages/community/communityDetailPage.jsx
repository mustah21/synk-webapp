import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import './communityDetailPage.css';
import Spinner from '../../components/Spinner/Spinner';

function CommunityDetailPage() {
  const navigate = useNavigate();
  const { publicId } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/api/v1/community/${publicId}`)
      .then(res => setCommunity(res.data.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load community'))
      .finally(() => setLoading(false));
  }, [publicId]);

  if (loading) return <Spinner fullPage label="Loading community..." />;
  if (error) return <p className="community-detail-error">{error}</p>;
  if (!community) return null;

  return (
    <div className="community-detail-page">
      <div className="community-detail-container">
        <button className="community-detail-back" onClick={() => navigate('/communities')}>
          ← Back to communities
        </button>

        <div className="community-detail-card">
          <div className="community-detail-header">
            <h1 className="community-detail-title">{community.name}</h1>
          </div>

          <div className="community-detail-meta">
            <div className="community-detail-meta-item">
              <span className="community-detail-meta-label">Created by</span>
              <span className="community-detail-meta-value">{community.creator?.firstName}</span>
            </div>
          </div>

          <p className="community-detail-description">{community.description}</p>

          <div className="community-detail-actions">
            <button className="community-detail-join-btn">Join community</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityDetailPage;