import styles from './World.module.scss'
import { useRef, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Switch, Route } from "wouter"
import Link from "next/link"

import { Home } from '../../scenes/home/Home'
import { Lab } from '../../scenes/lab/Lab'
import { Work } from '../../scenes/work/Work'
import { About } from '../../scenes/about/About'

import cross from '../../images/cross.svg';

const Scene = (props: { handleClickProject: (variable:string) => void; }) => {
  
  const handleClickProject = (variable:string) => {
    props.handleClickProject(variable);
  }

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
          <Work handleClickProject={handleClickProject}/>
        </Route>
      </Switch>

      <Stats />
    </>
  )
}

export const World = () => {

  const [projectInfo, setProjectInfo] = useState<string>(styles.project__info);
  const [showProjectInfo, setShowProjectInfo] = useState<boolean>(false);

  const [projectDescription, setProjectDescription] = useState<string>();
  const [projectCredits, setProjectCredits] = useState<string>();
  const [projectTitle, setProjectTitle] = useState<string>();
  const [projectImages, setProjectImages] = useState<string>();
  const [projectLink, setProjectLink] = useState<string>("");

  const handleClickProject = (variable:string) => {

    const show = showProjectInfo;
    setShowProjectInfo(!show);

    if (!show) {
      setProjectInfo(styles.project__info__show);
      setProjectDescription(variable.acf.description)
      setProjectCredits(variable.acf.credits)
      setProjectTitle(variable.title.rendered)
      setProjectImages(variable.content.rendered)
      setProjectLink(variable.acf.project_link);

    } else {
      setProjectInfo(styles.project__info__hide);
    }

  }

  const closeProjectInfo = () => {
    const show = showProjectInfo;
    setShowProjectInfo(!show);

    setProjectInfo(styles.project__info__hide);
  }

  return (
    <div className={styles.wrapper}>

      

      <Canvas shadows>
          <Suspense fallback={null}>
              <Scene handleClickProject={handleClickProject}/>
          </Suspense>
      </Canvas>

      <div className={projectInfo}>
        <h1 className={styles.close} onClick={closeProjectInfo}>x</h1>
        {/* <img className={styles.close} src={cross} onClick={closeProjectInfo} /> */}
        <div className={styles.projectContent}>
          <h2 className={styles.projectTitle}>{projectTitle}</h2>
          <p className={styles.projectDescription}>{projectDescription}</p>
          <div className={styles.projectCredits} dangerouslySetInnerHTML={{__html: projectCredits}}/>
          <div className={styles.projectImages} dangerouslySetInnerHTML={{__html: projectImages}}/>

          <div className={styles.projectLink}>
          <Link target="_blank" href={projectLink}>Project Link</Link>
          </div>

        </div>
      </div>
    </div>
  );
};
