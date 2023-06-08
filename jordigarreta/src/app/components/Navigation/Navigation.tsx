import Link from "next/link"
import styles from './Navigation.module.scss'

const links = [
    {
      label: "Home",
      route: "/"
    },
    {
      label: "About",
      route: "/about"
    },
    {
      label: "Lab",
      route: "/lab"
    },
]

export function Navigation() {
    return(
        <header className={styles.header}>
            <h1>Jordi Garreta</h1>
            <nav>
                <ul className={styles.navigation}>
                    {links.map(({label, route}) => {
                    return(
                        <li key={route}>
                            <Link href={route}>{label}</Link>
                        </li>
                    )
                    })}
                </ul>
            </nav>
        </header>
    )
}