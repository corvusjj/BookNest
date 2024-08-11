import { Link } from "react-router-dom";
import styles from './Links.module.scss';

function LinkPrimary({ address, text }) {
    return <Link to={'/'} className={styles.linkPrimary}>{text}</Link>
}

function LinkSecondary({ address, text }) {
    <Link to={'/'} className={styles.linkSecondary}>{text}</Link>
}

export { LinkPrimary, LinkSecondary }
