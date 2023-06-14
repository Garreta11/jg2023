"use client"

// import Link from "next/link"
import { Link } from "wouter"
import styles from './Navigation.module.scss'

const links = [
    // {
    //   label: "Home",
    //   route: "/"
    // },
    {
      label: "About",
      route: "/about"
    },
    // {
    //   label: "Work",
    //   route: "/work"
    // },
    // {
    //   label: "Lab",
    //   route: "/lab"
    // },
]

export function Navigation() {
    return(
        <header className={styles.header}>
            <Link to="/">
                <p className={styles.title}>Jordi Garreta</p>
            </Link>
            <nav>
                <ul className={styles.navigation}>
                    {links.map(({label, route}) => {
                    return(
                        <li key={route}>
                            <Link to={route}>{label}</Link>
                        </li>
                    )
                    })}
                </ul>
            </nav>
        </header>
    )
}