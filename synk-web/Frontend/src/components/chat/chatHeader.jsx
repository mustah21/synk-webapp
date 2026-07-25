function ChatHeader({ connected }) {
  return (
    <div className="chat-header">
      <span className="chat-title">Community chat</span>

      <span
        className={`chat-status-dot ${
          connected ? 'chat-status-dot-connected' : ''
        }`}
      />
    </div>
  );
}

export default ChatHeader;