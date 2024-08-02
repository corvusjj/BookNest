//  linear interpolation

export default function getPriceFromRating(rating) {
    const minPrice = 7;
    const maxPrice = 23;
    const minRating = 1;
    const maxRating = 5;

    const price = minPrice + ((rating - minRating) / (maxRating - minRating)) * (maxPrice - minPrice);
    return price.toFixed(2);
}
