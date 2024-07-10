import styles from './Header.module.scss';

export default function Header() {
    return (
        <header>
            <div id="logo">
                <h1 className={styles.title}>BookNest</h1>
            </div>
            <div id="search">
                <label htmlFor="book-search">Search book title</label>
                <input type="search" id="book-search" name="book"/>
                <button>Search</button>
            </div>
            <div id="cart"></div>
        </header>
    )
}
