"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import styles from './Footer.module.scss'

export function Footer() {

    const [year, setYear] = useState<number>();
    useEffect(() => {
        const year = new Date().getFullYear()
        setYear(year);
    }, [])

    return(
        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
                <Link href="https://www.instagram.com/garreta11/">Instagram</Link>
                <Link href="https://www.linkedin.com/in/garreta11/">Linkedin</Link>
                <Link href="mailto:jordigarreta11@gmail.com">E-mail</Link>
            </div>
            <p>©{year}</p>
        </footer>
    )
}