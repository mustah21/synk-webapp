import Button from '../../components/Button/button.jsx'
import Cubes from '../../components/Cubes/Cubes.jsx'
import ActivityFeed from '../../components/ActivityFeed/activityfeed.jsx'
import './hero.css';

export default function Hero() {
    return (

        <article className="hero">

            <div style={{
                position: 'fixed',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '150vmin',
                height: '60vmin',
                zIndex: -1
            }}>
                <Cubes
                    gridSize={12}
                    maxAngle={45}
                    radius={5}
                    borderStyle="2px dashed #B497CF"
                    faceColor="#1a1a2e"
                    rippleColor="#f3f3f3"
                    rippleSpeed={3}
                    autoAnimate
                    rippleOnClick />
            </div>

            <div className="hero_content-container">
                <div className="hero_text-container">
                    <span className="hero_label">SYNK</span>
                    <h2>Your game starts here.</h2>
                    <p>Set up an event with a few clicks, make a community, grow the sport.</p>
                    <Button />
                </div>
                <ActivityFeed />

            </div>

        </article>

    );
}