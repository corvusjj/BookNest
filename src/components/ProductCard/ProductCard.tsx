import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getRequestWithNativeFetch from "../../utils/nativeFetch";
import getPriceFromRating from "../../utils/bookPriceCalc";
import styles from "./ProductCard.module.scss";

interface ProductCard {
    title: string;
    author: string[];
    coverID: number;
    bookKey: string;
}

function ProductCard({title, author, coverID, bookKey}:ProductCard) {
    const [price, setPrice] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBookRating() {
            try {
                const ratingData = await getRequestWithNativeFetch(
                    `https://openlibrary.org${bookKey}/ratings.json`
                );
                const bookRating = ratingData.summary.average.toFixed(1);
                const bookPrice = getPriceFromRating(bookRating);
                setPrice(bookPrice);
                setError(null);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                setPrice(null);
            } finally {
                setLoading(false);
            }
        } 

        fetchBookRating();
    }, [bookKey]);

    const coverURL = `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`; 

    return (
        <div className={styles.productCard}>
            <Link to={'/'}>
                <img src={coverURL} alt={`${title} book-cover`} loading="lazy" />
                <h3>{title}</h3>
                <span>{`By ${author}`}</span>
                <span>{price}</span>
                <button>Add to Cart</button>
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
