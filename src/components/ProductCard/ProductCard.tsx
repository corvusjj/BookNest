import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getRequestWithNativeFetch from "../../utils/nativeFetch";

interface ProductCard {
    title: string;
    coverID: number;
    bookKey: string;
}

function ProductCard({title, coverID, bookKey}:ProductCard) {
    const [rating, setRating] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBookRating() {
            try {
                const ratingData = await getRequestWithNativeFetch(
                    `https://openlibrary.org${bookKey}/ratings.json`
                );
                setRating(ratingData.summary.average.toFixed(1));
                setError(null);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                setRating(null);
            } finally {
                setLoading(false);
            }
        } 

        fetchBookRating();
    }, [bookKey]);

    const coverURL = `https://covers.openlibrary.org/b/id/${coverID.toString()}-M.jpg`;

    return (
        <div>
            <Link to={'/'}>
                <img src={coverURL} alt={`${title} book-cover`} />
                <span>{title}</span>
                <p>$17</p>
            </Link>
        </div>
    );
}

function ProductCardLoading () {
    return (
        <div>Loading...</div>
    );
}

export { ProductCard, ProductCardLoading }
