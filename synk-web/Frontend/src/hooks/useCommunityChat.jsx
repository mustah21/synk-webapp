import { useEffect, useRef, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import api from '../api/axios';

export function useCommunityChat(communityPublicId, enabled) {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!enabled || !communityPublicId) return;

    const token = localStorage.getItem('token');

    const client = new Client({
      webSocketFactory: () => new SockJS(`${api.defaults.baseURL}/ws`),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        client.subscribe(`/topic/community/${communityPublicId}`, (msg) => {
          const body = JSON.parse(msg.body);
          setMessages((prev) => [...prev, body]);
        });
      },
      onDisconnect: () => setConnected(false),
      onStompError: (frame) => {
        console.error('STOMP error:', frame.headers['message'], frame.body);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [communityPublicId, enabled]);

  const sendMessage = useCallback(
    (content) => {
      if (!clientRef.current?.connected) return;
      clientRef.current.publish({
        destination: `/app/community/${communityPublicId}/chat`,
        body: JSON.stringify({ content }),
      });
    },
    [communityPublicId]
  );

  return { messages, sendMessage, connected };
}