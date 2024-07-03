import { useEffect, useState } from "react";
import getRequestWithNativeFetch from '../utils/nativeFetch';

export default function BooksTrending() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTrendingBooksData() {
            try {
                const booksData = await getRequestWithNativeFetch(
                    'https://openlibrary.org/trending/daily.json'
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
        <div>Main</div>
    );
}
