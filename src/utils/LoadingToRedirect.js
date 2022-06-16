import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from 'components/navbar/Navbar';

import './loadingtoredirect.scss';

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate('/login');
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className='redirect'>
      <div className='redirect-container'>
        <Navbar />
        <h5>Redirecting you in {count} seconds</h5>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
