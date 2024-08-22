import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getRequestWithNativeFetch from "../../utils/nativeFetch";
import getPriceFromRating from "../../utils/bookPriceCalc";
import AddToCartBtn from "./AddToCartButton/AddToCartBtn";
import styles from "./ProductCard.module.scss";

interface ProductCard {
    title: string;
    author: string[];
    coverID: number;
    bookKey: string;
}

function ProductCard({title, author, coverID, bookKey}:ProductCard) {
    const [price, setPrice] = useState<string | null>(null);
    const [cartAdded, setCardAdded] = useState(false);
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

    function addToCart() {
        if (cartAdded) return;
        setCardAdded(true);
    }

    const coverURL = `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`; 

    return (
        <div className={styles.productCard}>
            <Link to={'/'}>
                <img src={coverURL} alt={`${title} book-cover`} loading="lazy" />
                <h3>{title}</h3>
                <span>{`By ${author}`}</span>
                <span className={styles.price}>{`$${price}`}</span>
                <AddToCartBtn active={cartAdded} addToCart={addToCart}/>
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
