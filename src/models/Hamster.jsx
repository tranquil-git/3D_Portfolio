import { useRef } from 'react';
import { Center, useGLTF } from '@react-three/drei';

import hamsterScene from '../assets/3d/hamster.glb';

const Hamster = (props) => {
    const group = useRef();
    const { scene } = useGLTF(hamsterScene);

    return (
        <group ref={group} {...props} dispose={null}>
            {/* The exported model sits off-origin, so recenter it to keep the
                orbit controls spinning around the hamster instead of beside it. */}
            <Center>
                <primitive object={scene} />
            </Center>
        </group>
    )
}

export default Hamster;