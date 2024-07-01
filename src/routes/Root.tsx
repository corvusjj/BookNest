import BooksTrending from './BooksTrending';
import { Outlet, Link } from 'react-router-dom';

function Root() {

  return (
    <>
        <BooksTrending />
        <section id="categories">
            <h3>Categories</h3>
            <nav>
                <ul>
                    <li><Link to={'book-list/mystery'}>Mystery</Link></li>
                </ul>
                <ul>
                    <li><Link to={'book-list/fantasy'}>Fantasy</Link></li>
                </ul>
                <ul>
                    <li><Link to={'book-list/thriller'}>Thriller</Link></li>
                </ul>
                <ul>
                    <li><Link to={'book-list/romance'}>Romance</Link></li>
                </ul>
                <ul>
                    <li><Link to={'book-list/science_fiction'}>Science Fiction</Link></li>
                </ul>
                <ul>
                    <li><Link to={'book-list/history'}>History</Link></li>
                </ul>
                <ul>
                    <li><Link to={'book-list/personal_development'}>Personal Development</Link></li>
                </ul>
            </nav>
            <Outlet />
        </section>
    </>
  );
}

export default Root;
