import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import HomeInfo from '../components/HomeInfo';
import Loader from '../components/Loader';

import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';

import sakura from '../assets/sakura.mp3';
import { soundoff, soundon } from '../assets/icons';

const Home = () => {
    const audioRef = useRef(null);
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [isPlayingMusic, setIsPlayingMusic] = useState(true);
    const [isTabVisible, setIsTabVisible] = useState(
        () => document.visibilityState !== 'hidden'
    );

    useEffect(() => {
        const audio = new Audio(sakura);
        audio.volume = 0.4;
        audio.loop = true;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    useEffect(() => {
        const onVisibilityChange = () =>
            setIsTabVisible(document.visibilityState !== 'hidden');

        document.addEventListener('visibilitychange', onVisibilityChange);
        return () =>
            document.removeEventListener('visibilitychange', onVisibilityChange);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Keep the island quiet while the visitor is on another tab.
        if (!isPlayingMusic || !isTabVisible) {
            audio.pause();
            return;
        }

        // Browsers block autoplay until the visitor has interacted with the
        // page, so when that happens, start on their first gesture instead.
        // These listen in the capture phase because the island stops
        // propagation of pointerdown on the canvas.
        const gestures = ['pointerdown', 'keydown', 'touchstart'];
        const options = { once: true, capture: true };
        let unlisten = () => {};

        const startOnGesture = () => {
            unlisten();
            audio.play().catch(() => {});
        };

        audio.play().catch(() => {
            gestures.forEach((type) =>
                window.addEventListener(type, startOnGesture, options)
            );
            unlisten = () =>
                gestures.forEach((type) =>
                    window.removeEventListener(type, startOnGesture, options)
                );
        });

        return () => unlisten();
    }, [isPlayingMusic, isTabVisible]);

    const adjustIslandForScreenSize = () => {
        let screenScale, screenPosition;
        const rotation = [0.1, 4.7, 0];

        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
            screenPosition = [0, -6.5, -43.4];
        } else {
            screenScale = [1, 1, 1];
            screenPosition = [0, -6.5, -43.4];
        }

        return [screenScale, screenPosition, rotation];
    };

    const [islandScale, islandPosition, islandRotation] =
        adjustIslandForScreenSize();

    const adjustPlaneForScreenSize = () => {
        let screenScale, screenPosition;
        const rotation = [0, 20, 0];

        if (window.innerWidth < 768) {
            screenScale = [1.5, 1.5, 1.5];
            screenPosition = [0, -1.5, 0];
        } else {
            screenScale = [3, 3, 3];
            screenPosition = [0, -4, -4];
        }

        return [screenScale, screenPosition, rotation];
    };

    const [planeScale, planePosition, planeRotation] =
        adjustPlaneForScreenSize();

    return (
        <section className="w-full h-screen relative">
            <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>

            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{near: 0.1, far:1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000"
                    intensity={1} />

                    <Bird />
                    <Sky isRotating={isRotating} />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane
                        isRotating={isRotating}
                        scale={planeScale}
                        position={planePosition}
                        rotation={planeRotation}
                    />
                </Suspense>

            </Canvas>

            <div className="absolute bottom-2 left-2">
                <img
                    src={isPlayingMusic ? soundon : soundoff}
                    alt={isPlayingMusic ? 'Mute music' : 'Play music'}
                    className="w-10 h-10 cursor-pointer object-contain"
                    onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                />
            </div>
        </section>
    )
}

export default Home
