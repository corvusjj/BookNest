import Book from "./book";

export default interface BooksBySubject {
    key: string;
    name: string;
    subject_type: string;
    work_count: number;
    works: Book[];
}
