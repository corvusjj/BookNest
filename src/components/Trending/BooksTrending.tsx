import { useEffect, useState } from "react";
import getRequestWithNativeFetch from '../../utils/nativeFetch';
import { Bookv2 } from "../../types/book";

import SectionLoading from "../SectionLoading/SectionLoading";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./BooksTrending.module.scss";

export default function BooksTrending() {
    const [data, setData] = useState<Bookv2[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTrendingBooksData() {
            try {
                const booksData = await getRequestWithNativeFetch(
                    'https://openlibrary.org/trending/weekly.json'
                );
                console.log(booksData.works.slice(0, 50));
                setData(booksData.works.slice(0, 50));
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
        <section className={styles.trending}>
            <div className={styles.sectionTitle}>
                <span></span>
                <h2>Trending This Week</h2>
                <span></span>
            </div>
            {loading? (
                <SectionLoading/>
                ) : data? (
                    <div className={styles.container}>
                        {data.map(book => 
                            <ProductCard 
                                key={book.key} 
                                title={book.title} 
                                author={book.author_name}
                                coverID={book.cover_i} 
                                bookKey={book.key}
                            />
                        )}
                    </div>
                ) : (
                    <div>Error...</div>
                )}
        </section>
    );
}
