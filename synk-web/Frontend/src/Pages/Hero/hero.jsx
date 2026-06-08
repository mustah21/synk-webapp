import Cubes from '../../components/Cubes/Cubes.jsx'
import './hero.css';

export default function Hero() {
    return (


        <div style={{
            position: 'fixed',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '150vmin',
            height: '60vmin',
            zIndex: -2
        }}>
            <Cubes
                gridSize={12}
                maxAngle={45}
                radius={5}
                borderStyle="2px dashed #B497CF"
                faceColor="#1a1a2e"
                rippleColor="#f3f3f3"
                rippleSpeed={2}
                autoAnimate
                rippleOnClick
            />
        </div>

    );
}