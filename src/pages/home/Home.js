import List from 'components/table/Table';
import Chart from 'components/chart/Chart';
import Navbar from 'components/navbar/Navbar';
import Widget from 'components/widget/Widget';
import Sidebar from 'components/sidebar/Sidebar';
import Featured from 'components/featured/Featured';

import './home.scss';

const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='home__container'>
        <Navbar />
        <div className='widgets'>
          <Widget type='user' />
          <Widget type='product' />
          <Widget type='order' />
          <Widget type='earning' />
        </div>
        <div className='charts'>
          <Featured />
          <Chart aspect={2 / 1} title='Last 6 Months (Revenue)' />
        </div>
        <div className='list-container'>
          <div className='list-title'>Latest transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
