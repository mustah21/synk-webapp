function ChatMessage({ message, isOwn }) {
  return (
    <div
      className={`chat-message ${
        isOwn ? 'chat-message-own' : ''
      }`}
    >
      {!isOwn && (
        <span className="chat-message-sender">
          {message.senderFirstName} {message.senderLastName}
        </span>
      )}

      <span className="chat-message-bubble">
        {message.content}
      </span>

      <span className="chat-message-time">
        {new Date(message.sentAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </div>
  );
}

export default ChatMessage;