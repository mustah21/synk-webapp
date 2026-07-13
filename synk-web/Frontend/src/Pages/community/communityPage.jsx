import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './communityPage.css';
import { useNavigate } from 'react-router-dom';


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
      .catch(err => {
        setError('Failed to load communities');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="communities-status">Loading communities...</div>;
  if (error) return <div className="communities-status communities-error">{error}</div>;

  return (
    <div className="communities-page">
      <div className="communities-header">
        <h1>Communities</h1>
        <p>Find your people</p>
      </div>

      {communities.length === 0 ? (
        <div key={communities.publicId} className="communities-status">No communities yet. Be the first to create one.</div>
      ) : (
        <div className="communities-grid">
          {communities.map(community => (
            <div key={community.publicId} className="community-card" onClick={() => navigate(`/communities/${community.publicId}`)}>
              <div className="community-card-name">{community.name}</div>
              <p className="community-card-description">{community.description}</p>
              <div className="community-card-footer">
                <span className="community-card-members">
                  {community.memberCount} {community.memberCount === 1 ? 'member' : 'members'}
                </span>
              
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommunitiesPage;