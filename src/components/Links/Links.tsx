import { Link } from "react-router-dom";
import styles from './Links.module.scss';

function LinkPrimary({ address, text }) {
    return <Link to={'/'} className={`${styles.link} ${styles.linkPrimary}`}>{text}</Link>
}

function LinkSecondary({ address, text }) {
    return <Link to={'/'} className={`${styles.link} ${styles.linkSecondary}`}>{text}</Link>
}

export { LinkPrimary, LinkSecondary }
