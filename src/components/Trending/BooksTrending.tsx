import { useEffect, useState } from "react";
import getRequestWithNativeFetch from '../../utils/nativeFetch';

import BooksByTrending from "../../types/booksByTrending";

import SectionLoading from "../SectionLoading/SectionLoading";
import ProductCard from "../ProductCard/ProductCard";
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
            <SectionLoading/>
            {loading? (
                        <div>Loading...</div>
                    ) : data? (
                        <div>
                            {data.works.map(book => 
                                <ProductCard key={book.key} title={book.title} coverID={book.cover_i} bookKey={book.key}/>
                            )}
                        </div>
                    ) : (
                        <div>Error...</div>
                    )}
        </div>
    );
}
