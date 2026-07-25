import { useState } from 'react';

function ChatInput({ connected, onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = input.trim();

    if (!trimmed) return;

    onSend(trimmed);
    setInput('');
  };

  return (
    <form className="chat-input-row" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-input"
        placeholder="Type a message…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={2000}
      />

      <button
        type="submit"
        className="chat-send-btn"
        disabled={!connected || !input.trim()}
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;