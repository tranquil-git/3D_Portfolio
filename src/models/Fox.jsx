import { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';

import foxScene from '../assets/3d/fox.glb';

const Fox = ({ currentAnimation = 'idle', ...props }) => {
    const group = useRef();
    const { scene, animations } = useGLTF(foxScene);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        Object.values(actions).forEach((action) => action.stop());
        actions[currentAnimation]?.play();
    }, [actions, currentAnimation]);

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={scene} />
        </group>
    )
}

export default Fox;
