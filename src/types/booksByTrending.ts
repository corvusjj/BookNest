import Book from "./book";

export default interface BooksByTrending {
    days: number;
    hours: number;
    query: string;
    works: Book[];
}
