import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';

function ChatMessageList({ messages, currentUserPublicId }) {
  const messagesRef = useRef(null);
  const bottomRef = useRef(null);
  const previousMessageCount = useRef(messages.length);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showNewMessages, setShowNewMessages] = useState(false);

  const handleScroll = () => {
    const container = messagesRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    const atBottom = distanceFromBottom < 50;

    setIsAtBottom(atBottom);

    // If user manually scrolls to bottom,
    // hide the new messages button.
    if (atBottom) {
      setShowNewMessages(false);
    }
  };

  useEffect(() => {
    const newMessageArrived =
      messages.length > previousMessageCount.current;

    if (newMessageArrived) {
      if (isAtBottom) {
        // User is at bottom → automatically scroll
        bottomRef.current?.scrollIntoView({
          behavior: 'smooth',
        });
      } else {
        // User is reading older messages → don't scroll
        setShowNewMessages(true);
      }
    }

    previousMessageCount.current = messages.length;
  }, [messages.length, isAtBottom]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });

    setShowNewMessages(false);
    setIsAtBottom(true);
  };

  return (
    <div
      ref={messagesRef}
      className="chat-messages"
      onScroll={handleScroll}
    >
      {messages.length === 0 && (
        <p className="chat-empty">
          No messages yet. Say hello.
        </p>
      )}

      {messages.map((message) => (
        <ChatMessage
          key={message.publicId}
          message={message}
          isOwn={
            message.senderPublicId === currentUserPublicId
          }
        />
      ))}

      <div ref={bottomRef} />

      {showNewMessages && (
        <button
          type="button"
          className="chat-new-messages"
          onClick={scrollToBottom}
        >
          New messages ↓
        </button>
      )}
    </div>
  );
}

export default ChatMessageList;