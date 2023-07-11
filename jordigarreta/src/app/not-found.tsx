import styles from './NotFound.module.scss';

import { Navigation } from "./components/Navigation/Navigation"
import { Footer } from "./components/Footer/Footer"

export default function NotFound() {
    return (
        <>
            <Navigation />
            <div className={styles.notfound}>    
                <h1 className={styles.errormessage} data-text="404">404</h1>
            </div>
            <Footer />
        </>
    );
}