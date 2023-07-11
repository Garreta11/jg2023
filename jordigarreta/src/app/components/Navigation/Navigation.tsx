"use client"

import Link from "next/link"
// import { Link } from "wouter"
import styles from './Navigation.module.scss'

import { useRouter } from 'next/navigation'

const links = [
    {
      label: "About",
      route: "/about"
    }
]

export function Navigation() {
    const router = useRouter()
    console.log(router)
    return(
        <header className={styles.header}>
            <Link href="/">
                <p className={styles.title}>Jordi Garreta</p>
            </Link>

            {/* <a type="button" onClick={() => router.push('/')}>
                <p className={styles.title}>Jordi Garreta</p>
            </a> */}

            <nav>
                <ul className={styles.navigation}>
                    {links.map(({label, route}) => {
                    return(
                        <li key={route}>
                            <Link href={route}>{label}</Link>
                            {/* <a type="button" onClick={() => router.push(route)}>
                                {label}
                            </a> */}
                        </li>
                    )
                    })}
                </ul>
            </nav>
        </header>
    )
}