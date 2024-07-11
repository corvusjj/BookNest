import { useEffect, useState } from "react";
import getRequestWithNativeFetch from "../../utils/nativeFetch";

import BooksBySubject from '../../types/booksBySubject';
import styles from './Hero.module.scss'

export default function Hero() {
    const [data, setData] = useState<BooksBySubject[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const thrillerSuspenseUrl = 'https://openlibrary.org/subjects/fiction_thrillers_suspense.json';
        const historicalFictionUrl = 'https://openlibrary.org/subjects/historical_fiction.json';
        const selfHelpUrl = 'https://openlibrary.org/subjects/self-help.json';

        async function fetchHeroBooksData() {
            try {
                const result = await Promise.all([
                    getRequestWithNativeFetch(thrillerSuspenseUrl),
                    getRequestWithNativeFetch(historicalFictionUrl),
                    getRequestWithNativeFetch(selfHelpUrl)
                ]);

                const heroData= await result;
                console.log(heroData);
                setData(heroData);
                setError(null);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        } 

        fetchHeroBooksData();
    }, []);

    return (
        <section className={styles.hero}>
            <div className={styles.subjectSearch}>
                <label htmlFor="book-search">Search book subject</label>
                <input type="search" id="book-search" name="book-subject"/>
                <button>Search</button>
            </div>
            <div className={styles.carouselContainer}>
                <div className={styles.categoryHighlight} data-highlight="1">
                    <div className={styles.bookImage}></div>
                    <h2>Thrillers, Suspense</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet commodi voluptas tempora aut sequi reiciendis?</p>
                    <button>SHOP NOW</button>
                </div>
                <div className={styles.categoryHighlight} data-highlight="2">
                    <div className={styles.bookImage}></div>
                    <h2>Historical Fiction</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet commodi voluptas tempora aut sequi reiciendis?</p>
                    <button>SHOP NOW</button>
                </div>
                <div className={styles.categoryHighlight} data-highlight="3">
                    <div className={styles.bookImage}></div>
                    <h2>Self-Help</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet commodi voluptas tempora aut sequi reiciendis?</p>
                    <button>SHOP NOW</button>
                </div>
            </div>
        </section>
    )
}
