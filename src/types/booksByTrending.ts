import { Bookv2} from "./book";

export default interface BooksByTrending {
    days: number;
    hours: number;
    query: string;
    works: Bookv2[];
}
