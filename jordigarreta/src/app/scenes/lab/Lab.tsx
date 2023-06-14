"use client"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { FaceLandmarker, FaceControls, OrbitControls, Stats, PresentationControls, Text } from '@react-three/drei'
import { Vector3, DirectionalLight } from 'three'

import { useState, useEffect } from 'react'

export function Lab() {

    const [experiments, setExperiments] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const res = await fetch(
            'https://dashboard.jordigarreta.com/wp-json/wp/v2/experiments'
          );
          const data = await res.json();
          console.log(data);
          setExperiments(data);
        }
        fetchData()
    }, [])

    return(
        <>
            <color args={ [ 'blue' ] }  attach="background" />
            <Text color="white" anchorX="center" anchorY="middle" position={[0, 1, 0]} fontSize={0.5}>
                Lab
            </Text>
            
            <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial />
            </mesh>
            
            <mesh receiveShadow position-y={ -0.5 } rotation-x={ -Math.PI * 0.5 } scale={ 10 }>
                <planeGeometry />
                <meshStandardMaterial color='greenyellow' />
            </mesh>
        </>
    )
}