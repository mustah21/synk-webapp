import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import api from '../../api/axios';
import Spinner from '../Spinner/spinner';
import './communityShell.css';
import {TABS} from './communityTabs';


function CommunityShell({ activeTab, children }) {
  const { publicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [community, setCommunity] = useState(null);
  const [joined, setJoined] = useState(null); // null = unknown yet
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCommunity = () => {
    let cancelled = false;

    Promise.all([
      api.get(`/api/v1/community/${publicId}`),
      api
        .get(`/api/v1/community-member/${publicId}/me`)
        .catch(() => ({ data: { data: null } })),
    ])
      .then(([communityRes, membershipRes]) => {
        if (cancelled) return;

        setCommunity(communityRes.data.data);
        setJoined(!!membershipRes.data.data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.response?.data?.message || 'Failed to load community'
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  };

  useEffect(() => {
    return fetchCommunity();
  }, [publicId]);

  useEffect(() => {
    // Redirect back to the join page if the user isn't a member and we've confirmed it
    if (joined === false) {
      navigate(`/communities/${publicId}`, { replace: true, state: { from: location.pathname } });
    }
  }, [joined, publicId, navigate, location.pathname]);

  if (loading) return <Spinner fullPage label="Loading community..." />;
  if (error) return <p className="community-shell-error">{error}</p>;
  if (!community || joined !== true) return null; // redirecting or not ready yet

  return (
    
    <div className="community-shell">
      <div className="community-shell-header">
        <button className="community-shell-back" onClick={() => navigate('/communities')}>
          ← Communities
        </button>
        <h1 className="community-shell-title">Hello {community.name}</h1>
      </div>

      <nav className="community-shell-tabs">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            to={tab.disabled ? '#' : tab.path(publicId)}
            className={`community-shell-tab ${activeTab === tab.key ? 'community-shell-tab-active' : ''} ${tab.disabled ? 'community-shell-tab-disabled' : ''}`}
            onClick={(e) => tab.disabled && e.preventDefault()}
          >
            {tab.label}
            {tab.disabled && <span className="community-shell-tab-soon">Soon</span>}
          </Link>
        ))}
      </nav>

      <div className="community-shell-content">
        {children}
      </div>
    </div>
  );
}

export default CommunityShell;