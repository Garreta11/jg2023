"use client"
import * as THREE from 'three';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { ScrollControls, Text, Html, useScroll, Plane, useVideoTexture, useTexture, useAspect } from '@react-three/drei'
import { Vector3, DirectionalLight } from 'three'
import { useState, useEffect, useRef } from 'react'
import { easing } from 'maath'

const DISTANCE = 20

export function Lab() {

    return(
        <>
            <color args={ [ 'white' ] }  attach="background" />
            <ScrollControls damping={0.1} pages={10} distance={1} infinite>
                <Experiments />
            </ScrollControls>
        </>
    )
}

const Experiments = ({ q = new THREE.Quaternion(), p = new THREE.Vector3(0, 0, 0) }) => {
    const [experiments, setExperiments] = useState([]);
    const { camera, mouse } = useThree()
    const scroll = useScroll()
    const ref = useRef<any>()

    // console.log(ref);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(
                'https://dashboard.jordigarreta.com/wp-json/wp/v2/experiments?_embed&per_page=100'
            )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setExperiments(data);
            })
        }
        fetchData()
    }, [])

    useFrame((state, dt) => {
        ref.current.position.set(0, scroll.scroll.current * ref.current.children.length * DISTANCE, 0);
        easing.damp3(camera.position, p, 0.4, dt)
        easing.dampQ(camera.quaternion, q, 0.4, dt)
    })

    const handleMouseEnter = (e:any) => {
        if (e.object.material.map && e.object.material.map.image instanceof HTMLVideoElement) {
            // Texture is a video
            console.log("video ply");
            e.object.material.map.image.play();
        }
    }

    const handleMouseLeave = (e:any) => {
        if (e.object.material.map && e.object.material.map.image instanceof HTMLVideoElement) {
            // Texture is a video
            e.object.material.map.image.pause();
        }
    }

    return(
        <group ref={ref}>
            {experiments.map((experiment:any, index:number) =>{
                const myArray = experiment.acf.file.url.split(".");
                const fileFormat = myArray[myArray.length - 1];

                const width = experiment.acf.file.width;
                const height = experiment.acf.file.height;
                
                const scale = 10;
                
                const wPlane = width / Math.max(width, height);
                const hPlane = height / Math.max(width, height);
                

                return(
                    <group key={experiment.id}>
                        <Text color='red' position={[0, -index * DISTANCE, -50]}>
                            {experiment.title.rendered + " - " + fileFormat}
                        </Text>
                        <Plane scale={DISTANCE} args={[wPlane, hPlane]} position={[0, -index * DISTANCE, -50]} onPointerEnter={handleMouseEnter} onPointerLeave={handleMouseLeave}>
                            <TextureMaterial _url={experiment.acf.file.url}/>
                        </Plane>
                    </group>
                )
            })}
        </group>
    )
}

interface TextureMaterialProps {
    _url: string;
}

const TextureMaterial: React.FC<TextureMaterialProps> = ({ _url }) => {
    const [texture, setTexture] = useState<any>();
    const textureLoader = new THREE.TextureLoader();

    useEffect(() => {
        const loadTexture = async () => {
            const myArray:string[] = _url.split(".");
            const fileFormat:string = myArray[myArray.length - 1];
            let loadedTexture:any;

            
            if (fileFormat === "png") {
                loadedTexture = textureLoader.load(_url);
                setTexture(loadedTexture);
            } else {
                const video = document.createElement('video');
                video.src = _url;
                video.loop = true;
                video.crossOrigin = 'anonymous';

                const videoTexture = new THREE.VideoTexture(video);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                video.addEventListener('loadeddata', () => {
                    console.log("video is loaded");
                    loadedTexture = videoTexture;
                    setTexture(loadedTexture);
                })

            }
        }
        loadTexture();
       
    }, [])

    return(
        <meshBasicMaterial map={texture}/>
    )
}