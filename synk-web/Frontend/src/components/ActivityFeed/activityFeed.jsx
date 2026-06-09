// ActivityFeed.jsx
import { useState, useEffect } from 'react';
import './activityFeed.css';

const EVENTS = [
    { initials: 'AK', name: 'Alex K.', action: 'booked a 5v5 football', time: '2m ago', type: 'book' },
    { initials: 'SM', name: 'Sara M.', action: 'joined futsal in Helsinki', time: '5m ago', type: 'join' },
    { initials: 'JR', name: 'Jamal R.', action: 'created a basketball event', time: '9m ago', type: 'create' },
    { initials: 'TL', name: 'Timo L.', action: 'booked a court for Sunday', time: '12m ago', type: 'book' },
    { initials: 'MA', name: 'Munster A.', action: 'booked a court for winston', time: '6hrs ago', type: 'book' },
    { initials: 'AK', name: 'Alex K.', action: 'booked a 5v5 football', time: '2m ago', type: 'book' },
    { initials: 'SM', name: 'Sara M.', action: 'joined futsal in Helsinki', time: '5m ago', type: 'join' },

];

export default function ActivityFeed() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const timers = [];
        EVENTS.forEach((e, i) => {
            const t = setTimeout(() => {
                setItems(prev => {
                    if (prev.find(p => p.name === e.name && p.action === e.action)) return prev;
                    return [e, ...prev].slice(0, 5);
                });
            }, i * 800);
            timers.push(t);
        });
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="feed-wrap">
            <div className="feed-header">
                <span className="feed-title">Live activity</span>
                <span className="live-dot"><span className="dot" />Live</span>
            </div>
            {items.map((e, i) => (
                <div key={i} className="feed-item">
                    <div className="avatar">{e.initials}</div>
                    <div className="feed-text">
                        <p className="feed-name">{e.name}</p>
                        <p className="feed-action">{e.action}</p>
                    </div>
                    <span className="feed-time">{e.time}</span>
                </div>
            ))}
        </div>
    );
}