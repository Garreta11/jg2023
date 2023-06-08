"use client"

import { useState, useEffect } from 'react'

const LabPage = () => {

    const [experiments, setExperiments] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const res = await fetch(
            'https://dashboard.jordigarreta.com/wp-json/wp/v2/experiments'
          );
          const data = await res.json();
          setExperiments(data);
        }
        fetchData()
      }, [])

    return(
        <div>

            <h1>Esto es la LAB</h1>

            {experiments.map((exp) => {
                console.log(exp);
                return <p key={exp.id}>{exp.title.rendered}</p>
            })}
        </div>
    )
}

export default LabPage;