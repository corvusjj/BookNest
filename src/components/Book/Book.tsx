import { Link } from "react-router-dom";
import styles from "./Book.module.scss";

interface Book {
    title: string;
    coverURL: string;
    id: string;
}

function BookHero({title, coverURL, id}:Book) {
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
                <path d="M20.0001 12c0 1.3811-.3576 2.7386-1.0378 3.9405-.6803 1.2019-1.6601 2.2072-2.8441 2.9182-1.1841.7109-2.532 1.1032-3.9126 1.1387-1.3806.0354-2.74687-.2871-3.96585-.9362" stroke="rgb(255 255 255 / 48%)" strokeWidth="1.944" strokeLinecap="round"/>
            </svg>
        </div>
    )
}

function BookError() {
    return (
        <div className={styles.bookError}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16h.01M12 8v4m0 9c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-4.97056 0-9 4.02944-9 9 0 4.9706 4.02944 9 9 9Z" stroke="rgb(255 255 255 / 48%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Oops! Something went wrong</span>
        </div>
    )
}

export { BookHero, BookLoading, BookError }
