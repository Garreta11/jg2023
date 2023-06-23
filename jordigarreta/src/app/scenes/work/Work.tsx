"use client"
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll, Text, Html, Center } from '@react-three/drei'
import { easing } from 'maath'

import { useState, useEffect, useRef, Key } from 'react'

const GOLDENRATIO = 1.61803398875
const DISTANCE = 20

export function Work() {
    const [enableScroll, setEnableScroll] = useState<boolean>(true);
    const scrollContainerRef = useRef<any>(null);

    const Callback = () => {
        console.log("CALLBACK WORK");
        const s = enableScroll;
        setEnableScroll(!s);
    }

    return(
        <>
            <color args={ [ 'white' ] }  attach="background" />
            <fog attach="fog" color="white" near={1} far={DISTANCE * 1.5} />
            <ScrollControls damping={0.1} pages={10} distance={1} infinite enabled={enableScroll}>
                <group position={[0, -0.5, 0]}>
                    <Projects handleScroll={Callback}/>
                    {/* <Grid
                        infiniteGrid
                        cellThickness={0}
                        sectionSize={1}
                        sectionColor={new THREE.Color(0., 0., 0.)}
                        sectionThickness={1}
                        side={DoubleSide}
                        fadeDistance={2000}
                        fadeStrength={100}
                    /> */}
                </group>
            </ScrollControls>
        </>
    )
}

const Projects = (props: { handleScroll: () => void; }) => {

    let q = new THREE.Quaternion();
    let p = new THREE.Vector3(0, 0, 0);

    const [projects, setProjects] = useState<any>([]);
    const [positionCamera, setPositionCamera] = useState<THREE.Vector3>();
    const [rotationCamera, setRotationCamera] = useState<THREE.Vector3>();

    const { camera, mouse } = useThree()
    const ref = useRef<any>()
    const scroll = useScroll()

    const [posProjectSelected, setPosProjectSelected] = useState<number>(null);

    const vec = new THREE.Vector3();
    const vecRot = new THREE.Vector3();

    const [enableScroll, setEnableScroll] = useState<boolean>(true);
    const Callback = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, variable:string) => {
        const isScroll = enableScroll;

        console.log(variable);

        console.log(projects.indexOf(variable));

        setPosProjectSelected(projects.indexOf(variable));


        setEnableScroll(!isScroll);
        props.handleScroll();
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(
                'https://dashboard.jordigarreta.com/wp-json/wp/v2/posts'
            )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProjects(data);
            })
        }
        fetchData()
    }, [])

    useFrame((state, dt) => {
        if (enableScroll) {
            ref.current.position.set(0, 0, scroll.scroll.current * ref.current.children.length * DISTANCE);
            easing.damp3(camera.position, p, 0.4, dt)
            easing.dampQ(camera.quaternion, q, 0.4, dt)
        } else {
            ref.current.position.set(0, 0, posProjectSelected/projects.length * ref.current.children.length * DISTANCE);
            easing.damp3(camera.position, new THREE.Vector3(70, 0, 0), 0.9, dt)
        }
    })

    return(
        <group ref={ref}>
            {projects.map((project: any, index: number) => <Frame key={index} project={project} index={index} handleScroll={Callback}/>)}
        </group>
    )
}


interface FrameProps {
    project: any;
    index: number;
    handleScroll: any
}
const Frame: React.FC<FrameProps> = (props) => {

    const [isTextVisible, setIsTextVisible] = useState<boolean>(false);

    const onTextClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, variable:string) => (event: any) => {
        props.handleScroll(event, props.project);
        const isVisible = isTextVisible;
        setIsTextVisible(!isVisible);
    }
    
    return(
        <group position={[0, GOLDENRATIO, -(props.index + 1) * DISTANCE]} onClick={onTextClick(event, props.project)}>
            <Text
                maxWidth={10}
                anchorX="center"
                anchorY="middle"
                color="black"
            >
                {props.project.title.rendered}
            </Text>

            <group position={[70, 0, 0]}>
                <Text
                    maxWidth={50}
                    scale={0.5}
                    visible={isTextVisible}
                    color="black"
                >
                    {props.project.acf.description}
                </Text>
            </group>
        </group>
    )
}