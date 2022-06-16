import { CircularProgressbar } from 'react-circular-progressbar';
import {
  KeyboardArrowDown,
  KeyboardArrowUpOutlined,
  MoreVert,
} from '@mui/icons-material';

import 'react-circular-progressbar/dist/styles.css';
import './featured.scss';

const Featured = () => {
  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Total revenue</h1>
        <MoreVert fontSize='small' />
      </div>
      <div className='bottom'>
        <div className='featured-chart'>
          <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
        </div>
        <p className='title'>Total sales made today</p>
        <p className='amount'>$420</p>
        <p className='description'>
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className='summary'>
          <div className='item'>
            <div className='item-title'>Target</div>
            <div className='item-result negative'>
              <KeyboardArrowDown fontSize='small' />
              <div className='result-amount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='item-title'>Last week</div>
            <div className='item-result positive'>
              <KeyboardArrowUpOutlined fontSize='small' />
              <div className='result-amount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='item-title'>Last month</div>
            <div className='item-result positive'>
              <KeyboardArrowUpOutlined fontSize='small' />
              <div className='result-amount'>$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
