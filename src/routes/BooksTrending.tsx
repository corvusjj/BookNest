import { useEffect, useState } from "react";

export default function BooksTrending() {
    const [ book, setBook ] = useState();

    useEffect(() => {
        fetch('https://openlibrary.org/trending/daily.json', { mode: 'cors' })
            .then(res => res.json())
            .then(json => console.log(json))
    });
    
    return (
        <div>Main</div>
    );
}
