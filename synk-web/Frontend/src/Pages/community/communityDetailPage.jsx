import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/axios';
import './communityDetailPage.css';
import Spinner from '../../components/Spinner/Spinner';

function CommunityDetailPage() {
  const navigate = useNavigate();
  const { publicId } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState(null);

  const token = localStorage.getItem('token');
  const currentUserPublicId = token ? jwtDecode(token).publicId : null;
  const isCreator = community && currentUserPublicId === community.creator?.publicId;

  const getCommunity = () => {
    api.get(`/api/v1/community/${publicId}`)
      .then(res => setCommunity(res.data.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load community'))
      .finally(() => setLoading(false));
  };

  const getMembershipStatus = () => {
    api.get(`/api/v1/community-member/${publicId}/me`)
      .then(res => setJoined(!!res.data.data))
      .catch(() => setJoined(false)); // not a member yet, or not logged in
  };

  useEffect(() => {
    getCommunity();

    if (token) {
      getMembershipStatus();
    }
  }, [publicId]);

  const handleJoinCommunity = async () => {
    if (joining || joined) return;
    setJoining(true);
    try {
      await api.post('/api/v1/community-member/join', { communityPublicId: publicId });
      setJoined(true);
    } catch (err) {
      console.error(err);
    } finally {
      setJoining(false);
    }
  };

  const handleLeaveCommunity = async () => {
    if (leaving) return;
    setLeaving(true);
    setLeaveError(null);
    try {
      await api.delete(`/api/v1/community-member/${publicId}/leave`);
      setJoined(false);
    } catch (err) {
      setLeaveError(err.response?.data?.message || 'Failed to leave. Please try again.');
    } finally {
      setLeaving(false);
    }
  };

  if (loading) return <Spinner fullPage label="Loading details of the community..." />;
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
            {isCreator && (
              <button
                className="community-detail-edit-btn"
                onClick={() => navigate(`/communities/${publicId}/edit`)}
              >
                Edit community
              </button>
            )}

            {joined ? (
              <button
                className="community-detail-leave-btn"
                onClick={handleLeaveCommunity}
                disabled={leaving}
              >
                {leaving ? (
                  <>
                    <span className="spinner"></span>
                    Leaving...
                  </>
                ) : (
                  "Leave community"
                )}
              </button>
            ) : (
              <button
                className="community-detail-join-btn"
                onClick={handleJoinCommunity}
                disabled={joining}
              >
                {joining ? (
                  <>
                    <span className="spinner"></span>
                    Joining...
                  </>
                ) : (
                  "Join community"
                )}
              </button>
            )}

            {leaveError && <p className="join-error">{leaveError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityDetailPage;