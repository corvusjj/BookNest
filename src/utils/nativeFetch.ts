export default async function getRequestWithNativeFetch(url:string) {
    const response = await fetch(url, { mode: 'cors' });

    if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
    }

    return response.json();
}
