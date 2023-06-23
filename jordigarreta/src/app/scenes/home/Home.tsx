"use client"
import * as THREE from 'three';
import styles from './Home.module.scss'
import { Link, useLocation } from "wouter"
import { useEffect } from 'react'
import { extend, useThree, useFrame } from '@react-three/fiber'
import { Text3D, Html, shaderMaterial, Center } from '@react-three/drei'

const links = [
    {
      label: "Work",
      route: "/work"
    },
    {
      label: "Lab",
      route: "/lab"
    },
]

const vertexShader = `
  uniform float time;

  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  
  void main() {
    vec3 color = vec3(sin(time), cos(time), 1.0);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const TextShaderMaterial = shaderMaterial(
    // Uniforms
    {
      uMouse: new THREE.Vector3(0, 0, 0),
    },
    // Vertex Shader
    vertexShader,
    // Fragment Shader
    fragmentShader
);
  
extend({ TextShaderMaterial });

export function Home() {
    const [location, setLocation] = useLocation();
    const { camera, mouse } = useThree()
    const vec = new THREE.Vector3();

    useEffect(() => {
      camera.position.set(0, 0, 5);
    }, [])
    
    const navigate = (nav: string): void => {
        setLocation(nav);
    };

    useFrame(() => {
      camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05)
      camera.lookAt(0, 0, 0)
    })

    return(
        <>
            <color args={ [ 'white' ] }  attach="background" />

            {/* <Center>
              <Text3D letterSpacing={-0.06} size={0.5} font="/fonts/HelveticaNeueBlackExt.json">
                creative developer
                <meshStandardMaterial color="white" />
              </Text3D>
            </Center> */}

            <Html
                wrapperClass={styles.home}
                fullscreen={true}
                transform={false}
                zIndexRange={[0, 0]}
            >
                <div className={styles.homewrapper}>
                    {links.map(({label, route}) => {
                    return(
                        <div key={route}  className={styles.item}>
                            <Link to={route}>{label}</Link>
                        </div>
                    )
                    })}
                </div>
            </Html>
        </>
    )
}