import Cubes from '../../components/Cubes/Cubes.jsx'
import Ferrofluid from '../../components/Ferrofluid/ferrofluid.jsx';

import './hero.css';


export default function Hero() {
    return (

        <article className="hero">

            <div className="ferrofluid-container">
                <div className="ferrofluid-inner">
                    <Ferrofluid
                        colors={["#ffffff", "#ffffff", "#ffffff"]}
                        speed={0.5}
                        scale={1.6}
                        turbulence={1}
                        fluidity={0.18}
                        rimWidth={0.2}
                        sharpness={5}
                        shimmer={1.5}
                        glow={2}
                        flowDirection="down"
                        opacity={1}
                        mouseInteraction
                        mouseStrength={1}
                        mouseRadius={0.35}
                    />
                </div>
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