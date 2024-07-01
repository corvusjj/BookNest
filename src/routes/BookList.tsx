import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BookList() {
    const { subject } = useParams();

    useEffect(() => {
        fetch(`https://openlibrary.org/subjects/${subject}.json`, { mode: 'cors' })
            .then(res => res.json())
            .then(json => console.log(json))

        console.log(subject);
    }, [subject]);

    return (
        <div>List</div>
    )
}
