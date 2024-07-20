import { Link } from "react-router-dom";
import styles from "./Book.module.scss";

interface BookHeroProps {
    title: string;
    coverURL: string;
    key: string;
}

function BookHero({title, coverURL, key}:BookHeroProps) {
    return (
        <div className={styles.bookHeroResolved}>
            <Link to={'/'} className={styles.bookLink}>
                <img src={coverURL} alt="" />
                <h3>{title}</h3>
            </Link>
        </div>
    )
}

function BookLoading() {
    return (
        <div className={styles.bookLoading}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.0001 12c0 1.3811-.3576 2.7386-1.0378 3.9405-.6803 1.2019-1.6601 2.2072-2.8441 2.9182-1.1841.7109-2.532 1.1032-3.9126 1.1387-1.3806.0354-2.74687-.2871-3.96585-.9362" stroke="rgb(255 255 255 / 48%)" stroke-width="1.944" stroke-linecap="round"/>
            </svg>
        </div>
    )
}

export { BookHero, BookLoading }
