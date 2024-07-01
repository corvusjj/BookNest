import { useEffect } from "react"

export default function BookList() {
    useEffect(() => {
        fetch('https://openlibrary.org/subjects/mystery_and_detective_stories.json', { mode: 'cors' })
            .then(res => res.json())
            .then(json => console.log(json))
    });

    return (
        <div>List</div>
    )
}
