import Cubes from '../../components/Cubes/Cubes.jsx'
import './hero.css';

export default function Hero() {
    return (

        <article className="hero">

            <div style={{
                position: 'absolute',  // change from fixed to absolute
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200vmin',
                height: '60vmin',
                zIndex: -2,
                pointerEvents: 'none'
            }}>
                <Cubes
                    gridSize={13}
                    maxAngle={45}
                    radius={5}
                    borderStyle="3px dashed #B497CF"
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
                    <div className='hero_buttons'>
                        <button className="button_button">Book a game</button>
                        <button className="discover_button">Discover</button>
                    </div>
                </div>

            </div>

        </article>

    );
}