import { useEffect, useState } from "react";
import getRequestWithNativeFetch from '../../utils/nativeFetch';

import BooksByTrending from "../../types/booksByTrending";
import styles from "./BooksTrending.module.scss";

export default function BooksTrending() {
    const [data, setData] = useState<BooksByTrending | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTrendingBooksData() {
            try {
                const booksData = await getRequestWithNativeFetch(
                    'https://openlibrary.org/trending/weekly.json'
                );
                console.log(booksData);
                setData(booksData);
                setError(null);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        } 

        fetchTrendingBooksData();
    }, []);
    
    return (
        <div className={styles.trending}>
            <h2>Trending This Week</h2>
            {loading? (
                        <div>Loading...</div>
                    ) : data? (
                        <div>
                            {data.works.map(book => 
                                <p>{book.title}</p>
                            )}
                        </div>
                    ) : (
                        <div>Error...</div>
                    )}
        </div>
    );
}
