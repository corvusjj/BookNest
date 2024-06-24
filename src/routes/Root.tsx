import BooksTrending from './BooksTrending';
import { Outlet } from 'react-router-dom';

function Root() {

  return (
    <>
        <BooksTrending />
        <div id="categories">
            <Outlet />
        </div>
    </>
  );
}

export default Root;
