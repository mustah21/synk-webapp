import { useAuth } from '../../context/authContext';
import { useChatHistory } from '../../hooks/useChatHistory';
import { useCommunityChat } from '../../hooks/useCommunityChat';
import { useMemo } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';

import './ChatWindow.css';

function ChatWindow({ communityPublicId }) {
  const { token } = useAuth();

  const { messages: historyMessages, loading, error } =
    useChatHistory(communityPublicId);

  const {
    messages: liveMessages,
    sendMessage,
    connected,
  } = useCommunityChat(communityPublicId, true);

  const currentUserPublicId = token
    ? JSON.parse(atob(token.split('.')[1])).publicId
    : null;

  const allMessages = useMemo(() => {
    const map = new Map();
    for (const msg of historyMessages) map.set(msg.publicId, msg);
    for (const msg of liveMessages) map.set(msg.publicId, msg); 
    return Array.from(map.values()).sort(
      (a, b) => new Date(a.sentAt) - new Date(b.sentAt)
    );
  }, [historyMessages, liveMessages]);

  const handleSend = (content) => {
    sendMessage(content);
  };

  if (loading) {
    return (
      <p className="chat-status">
        Loading chat…
      </p>
    );
  }

  if (error) {
    return (
      <p className="chat-status chat-status-error">
        {error}
      </p>
    );
  }

  return (
    <div className="chat-window">
      <ChatHeader connected={connected} />

      <ChatMessageList
        messages={allMessages}
        currentUserPublicId={currentUserPublicId}
      />

      <ChatInput
        connected={connected}
        onSend={handleSend}
      />
    </div>
  );
}

export default ChatWindow;

