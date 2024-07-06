import { useEffect, useState } from "react";
import getRequestWithNativeFetch from "../utils/nativeFetch";

export default function Hero() {
    const [data, setData] = useState(null);
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

                const heroData = await result;
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
        <section className="hero-section">
            <div id="subject-search">
                <label htmlFor="book-search">Search book subject</label>
                <input type="search" id="book-search" name="book-subject"/>
                <button>Search</button>
            </div>
            <div className="carousel-container">
                {/* mystery-thriller, historical-fiction, self-help */}
                <div className="category-highlight">
                    <div className="book-image"></div>
                    <h2></h2>
                    <p></p>
                    <button>Shop Now</button>
                </div>
            </div>
        </section>
    )
}
