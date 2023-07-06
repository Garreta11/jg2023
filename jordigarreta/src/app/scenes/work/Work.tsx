"use client"
import styles from "./Work.module.scss"
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll, Text, Html } from '@react-three/drei'
import { easing } from 'maath'
import { useState, useEffect, useRef } from 'react'


const GOLDENRATIO = 1.61803398875
const DISTANCE = 20

export function Work(props: { handleClickProject: (variable:string) => void; }) {
    const [enableScroll, setEnableScroll] = useState<boolean>(true);
    const scrollContainerRef = useRef<any>(null);

    const Callback = (variable:string) => {

        props.handleClickProject(variable);
        const s = enableScroll;
        // setEnableScroll(!s);
    }

    return(
        <>
            <color args={ [ 'white' ] }  attach="background" />
            <fog attach="fog" color="white" near={1} far={DISTANCE * 1.5} />
            <ScrollControls damping={0.1} pages={10} distance={1} infinite enabled={enableScroll}>
                <group position={[0, -1.5, 0]}>
                    <Projects handleClickProject={Callback}/>
                </group>
            </ScrollControls>
        </>
    )
}

const Projects = (props: { handleClickProject: (variable:string) => void; }) => {

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
    const Callback = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, variable:string) => {
        setPosProjectSelected(projects.indexOf(variable));

        props.handleClickProject(variable);
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(
                'https://dashboard.jordigarreta.com/wp-json/wp/v2/posts'
            )
            .then(res => res.json())
            .then(data => {
                setProjects(data);
            })
        }
        fetchData()
    }, [])

    useFrame((state, dt) => {
        ref.current.position.set(0, 0, scroll.scroll.current * ref.current.children.length * DISTANCE);
        easing.damp3(camera.position, p, 0.4, dt)
        easing.dampQ(camera.quaternion, q, 0.4, dt)
    })

    return(
        <group ref={ref}>
            {projects.map((project: any, index: number) => <Frame key={index} project={project} index={index} handleClickProject={Callback}/>)}
        </group>
    )
}


interface FrameProps {
    project: any;
    index: number;
    handleScroll: any
}
const Frame: React.FC<FrameProps> = (props) => {

    const [isTextVisible, setIsTextVisible] = useState<string>("none");
    const [hovered, setHovered] = useState<boolean>(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    const onTextClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, variable:string) => (event: any) => {
        event.stopPropagation();
    
        props.handleClickProject(event, props.project);
        let isVisible = isTextVisible;
        if (isVisible === "none") {
            isVisible = "block";
        } else {
            isVisible = "none";
        }
        setIsTextVisible(isVisible);
    }

    const decode = (str: string) => {
        return str.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        });
    }
    
    return(
        <group position={[0, GOLDENRATIO, -(props.index + 1) * DISTANCE]} onClick={onTextClick(event, props.project)}>
            <Text
                font="./fonts/Manrope-Regular.ttf"
                maxWidth={10}
                anchorX="center"
                anchorY="middle"
                color="black"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {decode(props.project.title.rendered)}
            </Text>
        </group>
    )
}