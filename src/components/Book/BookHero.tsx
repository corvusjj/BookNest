import { Link } from "react-router-dom";
import styles from "./Book.module.scss";

interface BookHero {
    title: string;
    coverURL: string;
    key: string;
}

function BookHero({title, coverURL, key}) {
    return (
        <div className={styles.bookContainer}>
            <Link to={'/'} className={styles.bookLink}>
                <img src={coverURL} alt="" />
                <h3>{title}</h3>
            </Link>
        </div>
    )
}

export { BookHero }
