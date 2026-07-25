import { Client } from "@stomp/stompjs";
import WebSocket from "ws";


// stompjs needs a WebSocket implementation injected in Node (browsers have it natively)
Object.assign(global, { WebSocket });

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInB1YmxpY0lkIjoiZWU4YzE2MzItZTY5Zi00NDlkLWFlYWEtODk3YzE4NWJkOTQ2Iiwic3ViIjoiamFuZS5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3ODQ0MTk1ODAsImV4cCI6MTc4NDQ1NTU4MH0.w4SlTt_ahE-9VnLKra1-bh8vhrVrKErSPB7jSm1IPzQ';
const COMMUNITY_PUBLIC_ID = 'ad69d3be-2ffe-4444-964d-988b0524f14a';

const client = new Client({
  brokerURL: 'ws://localhost:3000/ws/websocket',
  connectHeaders: {
    Authorization: `Bearer ${TOKEN}`,
  },
  debug: (str) => console.log('[STOMP DEBUG]', str),
  reconnectDelay: 0,
});

client.onConnect = () => {
  console.log(' Connected');

  client.subscribe(`/topic/community/${COMMUNITY_PUBLIC_ID}`, (message) => {
    console.log(' Received broadcast:', message.body);
  });

  setTimeout(() => {
    console.log(' Sending message...');
    client.publish({
      destination: `/app/community/${COMMUNITY_PUBLIC_ID}/chat`,
      body: JSON.stringify({ content: 'hello world pls send' }),
    });
  }, 1000); // small delay to ensure SUBSCRIBE lands before SEND
};

client.onStompError = (frame) => {
  console.error(' STOMP ERROR:', frame.headers['message']);
  console.error('Details:', frame.body);
};

client.onWebSocketError = (err) => {
  console.error('WebSocket error:', err);
};

client.activate();