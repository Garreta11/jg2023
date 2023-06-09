"use client"

import { useState, useEffect } from 'react'
import styles from './page.module.scss'
import { World } from './components/World/World'

export default function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'https://dashboard.jordigarreta.com/wp-json/wp/v2/posts'
      );
      const data = await res.json();
      setPosts(data);
    }
    fetchData()
  }, [])

  return (
    <main className={styles.main}>
      <World />
    </main>
  )
}