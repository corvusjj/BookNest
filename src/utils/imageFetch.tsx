import { useState, useEffect } from "react";
import getRequestWithNativeFetch from "./nativeFetch";

const useImageURL = () => {
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = '';

    useEffect(() => {
        getRequestWithNativeFetch(url)
            .then((result) => setImageURL(result))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return { imageURL, error, loading };
}

export default function Image() {
    const { imageURL, error, loading } = useImageURL();
    console.log(imageURL);

    return (
        <img src={imageURL} alt="" />
    )
}
