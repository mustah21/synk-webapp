export const TABS = [
  { key: 'chat', label: 'Chat', path: (id) => `/communities/${id}/chat` },
  { key: 'events', label: 'Events', path: (id) => `/communities/${id}/events`, disabled: true },
  { key: 'members', label: 'Members', path: (id) => `/communities/${id}/members`, disabled: true },
];

