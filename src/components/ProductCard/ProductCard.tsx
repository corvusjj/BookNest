import { BookHero } from "../Book/Book";

interface ProductCard {
    title: string;
    coverID: number | null;
    bookKey: string;
}

export default function ProductCard({title, coverID, bookKey}:ProductCard) {

    return (
        <div>
            <BookHero title={title} coverID={coverID} bookKey={bookKey}/>
            <p>$17</p>
        </div>
    );
}
