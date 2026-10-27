import { useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei';

import planeScene from '../assets/3d/plane.glb';

const Plane = ({ isRotating, ...props }) => {
    const planeRef = useRef();
    const { scene, animations } = useGLTF(planeScene);
    const { actions } = useAnimations(animations, planeRef);

    useEffect(() => {
      const propeller = actions['Take 001'];
      if (!propeller) return;

      if (isRotating) {
        propeller.play();
      } else {
        propeller.stop();
      }
    }, [actions, isRotating]);

  return (
    <mesh ref={planeRef} {...props}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Plane;
