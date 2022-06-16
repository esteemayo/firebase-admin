import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

import './notFound.scss';

const NotFound = () => {
  return (
    <div className='notfound'>
      <Sidebar />
      <div className='notfound-container'>
        <Navbar />
        <div className='img-wrapper'>
          <img src='assets/img/404.png' alt='404' />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
