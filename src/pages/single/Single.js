import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useLocation, useParams } from 'react-router-dom';

import { excerpt } from 'utils';
import { db } from '../../firebase';
import List from 'components/table/Table';
import Chart from 'components/chart/Chart';
import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

import './single.scss';

const Single = () => {
  const { pathname } = useLocation();
  const { userId, productId } = useParams();
  const userPath = pathname.includes('users');

  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const docRef = doc(
          db,
          `${userPath ? 'users' : 'products'}`,
          `${userPath ? userId : productId}`
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userId, userPath, productId]);

  return (
    <div className='single'>
      <Sidebar />
      <div className='single-container'>
        <Navbar />
        <div className='top'>
          {userPath ? (
            <div className='left'>
              <div className='edit-button'>Edit</div>
              <h1 className='title'>Information</h1>
              <div className='item'>
                <img
                  src={
                    data?.img ||
                    'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt={data?.username}
                  className='item-img'
                />
                <div className='details'>
                  <h1 className='item-title'>{data?.name}</h1>
                  <div className='detail-item'>
                    <span className='item-key'>Email:</span>
                    <span className='item-value'>{data?.email}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Phone:</span>
                    <span className='item-value'>{data?.phone}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Address:</span>
                    <span className='item-value'>{data?.address}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Country:</span>
                    <span className='item-value'>{data?.country}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Joined:</span>
                    <span className='item-value'>
                      {new Date(data?.timeStamp?.seconds).toLocaleString(
                        'en-us',
                        { day: 'numeric', month: 'long' }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='left'>
              <div className='edit-button'>Edit</div>
              <h1 className='title'>Information</h1>
              <div className='item'>
                <img
                  src={
                    data?.img ||
                    'https://images.pexels.com/photos/163143/sackcloth-sackcloth-textured-laptop-ipad-163143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  }
                  alt={data?.title}
                  className='item-img'
                />
                <div className='details'>
                  <h1 className='item-title'>{data?.title}</h1>
                  <div className='detail-item'>
                    <span className='item-key'>Description:</span>
                    <span className='item-value'>
                      {data &&
                        data.description &&
                        excerpt(data.description, 40)}
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Category:</span>
                    <span className='item-value'>{data?.category}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Price:</span>
                    <span className='item-value'>{data?.price}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Stock:</span>
                    <span className='item-value'>
                      {data?.stock ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Created:</span>
                    <span className='item-value'>
                      {new Date(data?.timeStamp?.seconds).toLocaleString(
                        'en-us',
                        { day: 'numeric', month: 'long' }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='right'>
            <Chart aspect={3 / 1} title='User Spending (Last 6 Months)' />
          </div>
        </div>
        <div className='bottom'>
          <h1 className='title'>Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
