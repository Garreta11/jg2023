import styles from './World.module.scss'
import { useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Switch, Route } from "wouter"

import { Home } from '../../scenes/home/Home'
import { Lab } from '../../scenes/lab/Lab'
import { Work } from '../../scenes/work/Work'
import { About } from '../../scenes/about/About'

const Scene = () => {
  console.log("** SCENES **");

  return(
    <>
      <ambientLight intensity={0.1} />
      <directionalLight castShadow position={[1, 1, 1]} />

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
