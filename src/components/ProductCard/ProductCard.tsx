import { Link } from "react-router-dom";

interface ProductCard {
    title: string;
    coverID: number;
    bookKey: string;
}

function ProductCard({title, coverID, bookKey}:ProductCard) {

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
