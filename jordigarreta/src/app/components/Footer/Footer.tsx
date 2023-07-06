"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import styles from './Footer.module.scss'

export function Footer() {

    const [year, setYear] = useState();
    useEffect(() => {
        const year = new Date().getFullYear()
        setYear(year);
    }, [])

    return(
        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
                <Link target="_blank" href="https://www.instagram.com/garreta11/">Instagram</Link>
                <Link target="_blank" href="https://www.linkedin.com/in/garreta11/">Linkedin</Link>
                
            </div>
            <div className={styles.footerMail}>
                <Link target="_blank" href="mailto:jordigarreta11@gmail.com">jordigarreta11@gmail.com</Link>
            </div>
            <p>©{year}</p>
        </footer>
    )
}