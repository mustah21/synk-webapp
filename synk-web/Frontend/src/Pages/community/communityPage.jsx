import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './communityPage.css';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/spinner';
import CommunityCard from '../../components/communityCard/communityCard';

function CommunitiesPage() {
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/v1/community')
      .then(res => {
        setCommunities(res.data.data.content);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load communities');
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner fullPage label="Loading community..." />;
  if (error) return <div className="communities-status communities-error">{error}</div>;

  return (
    <div className="communities-page">
      <div className="communities-header">
        <div>
          <h1>Communities</h1>
          <p>Find your people</p>
        </div>
        <button className="communities-create-btn" onClick={() => navigate('/communities/create')}>
          Create Community
        </button>
      </div>

      {communities.length === 0 ? (
        <div className="communities-status">No communities yet. Be the first to create one.</div>
      ) : (
        <div className="communities-grid">
          {communities.map(community => (
            <CommunityCard
              key={community.publicId}
              community={community}
              onClick={() => navigate(`/communities/${community.publicId}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommunitiesPage;