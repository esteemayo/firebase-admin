import { useLocation } from 'react-router-dom';

import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import DataTable from 'components/datatable/DataTable';

import './list.scss';

const List = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];

  return (
    <div className='list'>
      <Sidebar />
      <div className='list-container'>
        <Navbar />
        <DataTable path={path} />
      </div>
    </div>
  );
};

export default List;
