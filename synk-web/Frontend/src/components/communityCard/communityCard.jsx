import './communityCard.css';

function CommunityCard({ community, onClick }) {
  const initials = community.name?.slice(0, 2).toUpperCase();

  return (
    <div className="community-card" onClick={onClick}>
      <div className="community-card-image-wrap">
        {community.displayPicture ? (
          <img
            src={community.displayPicture}
            alt={community.name}
            className="community-card-image"
          />
        ) : (
          <div className="community-card-image-placeholder">
            <span className="community-card-initials">{initials}</span>
          </div>
        )}

        <span className="community-card-pill">Community</span>
        <span className="community-card-member-badge">
          {community.memberCount} {community.memberCount === 1 ? 'member' : 'members'}
        </span>
      </div>

      <div className="community-card-body">
        <h3 className="community-card-name">{community.name}</h3>
        <p className="community-card-description">{community.description}</p>

        <div className="community-card-footer">

        </div>
      </div>
    </div>
  );
}

export default CommunityCard;