import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

import { db } from '../../firebase';
import { productColumns, userColumns } from 'data';

import './datatable.scss';

const DataTable = ({ path }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // (async () => {
    //   let lists = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, 'users'));
    //     querySnapshot.forEach((doc) => {
    //       lists.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(lists);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // })();

    // listen (realtime)
    const unsub = onSnapshot(
      collection(db, path),
      (doc) => {
        let lists = [];
        doc.docs.forEach((doc) => {
          lists.push({ id: doc.id, ...doc.data() });
        });
        setData(lists);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsub();
  }, [path]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user')) {
      try {
        await deleteDoc(doc(db, path, id));
        setData((data) => {
          return data.filter((item) => item.id !== id);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cell-action'>
            <Link to={`/${path}/${params.row.id}`}>
              <button className='view-button'>View</button>
            </Link>
            <button
              className='delete-button'
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className='datatable'>
      <div className='datatable-title'>
        {path === 'users' ? 'Add new user' : 'Add new product'}
        <Link to={`/${path}/new`} className='link'>
          Add new
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={
          path === 'users'
            ? userColumns.concat(actionColumn)
            : productColumns.concat(actionColumn)
        }
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        className='data-grid'
      />
    </div>
  );
};

export default DataTable;
