"use client"
import * as THREE from 'three';
import styles from "./Lab.module.scss"
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { ScrollControls, Text, Html, useScroll, Plane, useVideoTexture, useTexture, useAspect } from '@react-three/drei'
import { useState, useEffect, useRef, MouseEvent } from 'react'

const DISTANCE = 10

export function Lab() {

    return(
        <>
            <color args={ [ 'white' ] }  attach="background" />
            <ScrollControls damping={0.9} pages={3} distance={1} horizontal>
                <Experiments />
            </ScrollControls>
        </>
    )
}

const Experiments = ({ q = new THREE.Quaternion(), p = new THREE.Vector3(0, 0, 0) }) => {
    const [experiments, setExperiments] = useState([]);
    const { camera, mouse } = useThree()
    const scroll = useScroll()
    const ref = useRef(null);


    useEffect(() => {
        async function fetchData() {
            const res = await fetch(
                'https://dashboard.jordigarreta.com/wp-json/wp/v2/experiments?_embed&per_page=100'
            )
            .then(res => res.json())
            .then(data => {
                setExperiments(data);
            })
        }
        fetchData()
    }, [])

    const handlePointerEnter = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, target: number) => {
        const targetElement = event.currentTarget;
        const videoElement: any = targetElement.children;
        console.log(typeof videoElement);
        videoElement[0].play();
    }

    const handlePointerLeave = (event: MouseEvent<HTMLDivElement, MouseEvent>, target: number) => {
        const targetElement = event.currentTarget;
        const videoElement: any = targetElement.children;
        videoElement[0].pause();
    }


    return(
        <group ref={ref}>
            <Html className={styles.labcarousel}>
                {experiments.map((experiment:any, index:number) =>{
                    return(
                        <div
                            key={experiment.id}
                            className={styles.imageitem}
                            onMouseOver={(event) => handlePointerEnter(event, index)}
                            onMouseLeave={(event) => handlePointerLeave(event, index)}
                        >
                            <video src={experiment.acf.file.url} width="100%" height="auto" loop>
                                <source src={experiment.acf.file.url} type="video/mp4" />
                            </video>
                        </div>
                    )
                })}
            </Html>
        </group>
    )
}