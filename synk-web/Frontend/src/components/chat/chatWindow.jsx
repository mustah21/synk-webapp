import { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/axios';
import { useCommunityChat } from '../../hooks/useCommunityChat';
import './ChatWindow.css';

function ChatWindow({ communityPublicId }) {
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState(null);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const token = localStorage.getItem('token');
  const currentUserPublicId = token ? jwtDecode(token).publicId : null;

  const { messages: liveMessages, sendMessage, connected } = useCommunityChat(communityPublicId, true);

  useEffect(() => {
    api
      .get(`/api/v1/community/${communityPublicId}/chat`, { params: { page: 0, size: 30 } })
      .then((res) => {
        const content = res.data.data.content || [];
        setHistory(content.slice().reverse()); // API returns newest-first, we want oldest-first for display
      })
      .catch((err) => setHistoryError(err.response?.data?.message || 'Failed to load chat history'))
      .finally(() => setHistoryLoading(false));
  }, [communityPublicId]);

  const allMessages = [...history, ...liveMessages];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages.length]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setInput('');
  };

  if (historyLoading) return <p className="chat-status">Loading chat…</p>;
  if (historyError) return <p className="chat-status chat-status-error">{historyError}</p>;

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span className="chat-title">Community chat</span>
        <span className={`chat-status-dot ${connected ? 'chat-status-dot-connected' : ''}`} />
      </div>

      <div className="chat-messages">
        {allMessages.length === 0 && <p className="chat-empty">No messages yet. Say hello.</p>}

        {allMessages.map((msg) => {
          const isOwn = msg.senderPublicId === currentUserPublicId;
          return (
            <div key={msg.publicId} className={`chat-message ${isOwn ? 'chat-message-own' : ''}`}>
              {!isOwn && (
                <span className="chat-message-sender">
                  {msg.senderFirstName} {msg.senderLastName}
                </span>
              )}
              <span className="chat-message-bubble">{msg.content}</span>
              <span className="chat-message-time">
                {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form className="chat-input-row" onSubmit={handleSend}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={2000}
        />
        <button type="submit" className="chat-send-btn" disabled={!connected || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;