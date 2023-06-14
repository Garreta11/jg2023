"use client"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { Vector3, DirectionalLight } from 'three'

import { useState, useEffect, useRef } from 'react'

export function Work() {

    const corridorRef = useRef();
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        async function fetchData() {
          const res = await fetch(
            'https://dashboard.jordigarreta.com/wp-json/wp/v2/posts'
          );
          const data = await res.json();
          console.log(data);
          setProjects(data);
        }
        fetchData()
    }, [])


    return(
        <>
            <color args={ [ 'blue' ] }  attach="background" />
            
            {projects.map((project, index) => (
                <Text key={project.id} color="white" anchorX="center" anchorY="middle" position={[Math.random(), Math.random(), -index * 5.]} fontSize={0.5}>
                    {project.title.rendered}
                </Text>
            ))}
            
            <mesh receiveShadow position-y={ -0.5 } rotation-x={ -Math.PI * 0.5 } scale={ 10 }>
                <planeGeometry />
                <meshStandardMaterial color='greenyellow' />
            </mesh>

            <OrbitControls enableDamping={false} enableRotate={false} />
        </>
    )
}