interface Author {
    key: string;
    name: string;
  }
  
interface Availability {
    status: string;
    available_to_browse: boolean;
    available_to_borrow: boolean;
    available_to_waitlist: boolean;
    is_printdisabled: boolean;
    is_readable: boolean;
    is_lendable: boolean;
    is_previewable: boolean;
    identifier: string;
    isbn: string | null;
    oclc: string | null;
    openlibrary_work: string;
    openlibrary_edition: string;
    last_loan_date: string | null;
    num_waitlist: number | null;
    last_waitlist_date: string | null;
    is_restricted: boolean;
    is_browseable: boolean;
    __src__: string;
  }
  
  interface Book {
    key: string;
    title: string;
    edition_count: number;
    cover_id: number;
    cover_edition_key: string | null;
    subject: string[];
    ia_collection: string[];
    lendinglibrary: boolean;
    printdisabled: boolean;
    lending_edition: string;
    lending_identifier: string;
    authors: Author[];
    first_publish_year: number;
    ia: string;
    public_scan: boolean;
    has_fulltext: boolean;
    availability: Availability;
  }

  //  cover_i
  interface Bookv2 {
    key: string;
    title: string;
    edition_count: number;
    cover_i: number;
    cover_edition_key: string | null;
    subject: string[];
    ia_collection: string[];
    lendinglibrary: boolean;
    printdisabled: boolean;
    lending_edition: string;
    lending_identifier: string;
    authors: Author[];
    first_publish_year: number;
    ia: string;
    public_scan: boolean;
    has_fulltext: boolean;
    availability: Availability;
  }

  export {Book, Bookv2}  
