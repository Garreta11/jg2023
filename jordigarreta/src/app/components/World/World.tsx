import styles from './World.module.scss'
import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { FaceLandmarker, FaceControls, OrbitControls, Stats, PresentationControls, Text } from '@react-three/drei'
import { useLocation, Switch, Route } from "wouter"
import { Vector3, DirectionalLight } from 'three'

import { Home } from '../../scenes/home/Home'
import { Lab } from '../../scenes/lab/Lab'
import { Work } from '../../scenes/work/Work'
import { About } from '../../scenes/about/About'

const Scene = () => {
  console.log("** SCENES **");
  const { camera, mouse } = useThree()
  const vec = new Vector3()

  const dlRef = useRef<DirectionalLight>(null);

  useFrame(() => {
    // camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05)
    // camera.lookAt(0, 0, 0)
  })

  return(
    <>
      <ambientLight intensity={0.1} />
      <directionalLight castShadow position={[1, 1, 1]} ref={dlRef} />

      <Switch>
        <Route path="/">
            <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/lab">
          <Lab />
        </Route>
        <Route path="/work">
          <Work />
        </Route>
      </Switch>
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
