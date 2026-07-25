import { useEffect, useState } from 'react';
import api from '../api/axios';

export function useChatHistory(communityPublicId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!communityPublicId) return;

    setLoading(true);
    setError(null);

    api
      .get(`/api/v1/community/${communityPublicId}/chat`, {
        params: {
          page: 0,
          size: 30,
        },
      })
      .then((res) => {
        const content = res.data.data.content || [];

        // API returns newest-first.
        // Display oldest-first.
        setMessages(content.slice().reverse());
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || 'Failed to load chat history'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [communityPublicId]);

  return {
    messages,
    loading,
    error,
  };
}