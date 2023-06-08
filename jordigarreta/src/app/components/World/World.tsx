import styles from './World.module.scss'
import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { FaceLandmarker, FaceControls, OrbitControls, Stats, PresentationControls, Text } from '@react-three/drei'
import { Vector3, DirectionalLight } from 'three';

const Scene = () => {

  const { camera, mouse } = useThree()
  const vec = new Vector3()

  const dlRef = useRef<DirectionalLight>(null);

  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05)
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <color args={ [ 'gray' ] }  attach="background" />

      <ambientLight intensity={0.1} />
      <directionalLight castShadow position={[1, 1, 1]} ref={dlRef} />

      <Text color="white" anchorX="center" anchorY="middle" position={[0, 1, 0]} fontSize={0.5}>
        Creative developer
      </Text>
      
      <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
      </mesh>

      <mesh receiveShadow position-y={ -0.5 } rotation-x={ -Math.PI * 0.5 } scale={ 10 }>
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
      </mesh>

      {/* <OrbitControls /> */}
      <Stats />
    </>
  )
}

export const World = () => {
    return (
      <div className={styles.wrapper}>
        <Canvas shadows>
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </Canvas>
      </div>
    );
};
