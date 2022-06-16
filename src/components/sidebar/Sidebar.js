import { Link } from 'react-router-dom';
import {
  AccountCircleOutlined,
  CreditCard,
  Dashboard,
  ExitToApp,
  InsertChartSharp,
  LocalShipping,
  NotificationsNone,
  PersonOutlineOutlined,
  PsychologySharp,
  SettingsApplications,
  SettingsSystemDaydreamOutlined,
  Store,
} from '@mui/icons-material';

import { useGlobalAuthContext } from 'context/auth/AuthContext';
import { useGlobalContext } from 'context/darkMode/DarkModeContext';

import './sidebar.scss';

const Sidebar = () => {
  const { dark, light } = useGlobalContext();
  const { logoutUser } = useGlobalAuthContext();

  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/' className='link'>
          <span className='logo'>Admin</span>
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>Main</p>
          <li>
            <Dashboard className='icon' />
            <span>Dashboard</span>
          </li>
          <p className='title'>Lists</p>
          <Link to='/users' className='link'>
            <li>
              <PersonOutlineOutlined className='icon' />
              <span>Users</span>
            </li>
          </Link>
          <Link to='/products' className='link'>
            <li>
              <Store className='icon' />
              <span>Products</span>
            </li>
          </Link>
          <li>
            <CreditCard className='icon' />
            <span>Orders</span>
          </li>
          <li>
            <LocalShipping className='icon' />
            <span>Delivery</span>
          </li>
          <p className='title'>Useful</p>
          <li>
            <InsertChartSharp className='icon' />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNone className='icon' />
            <span>Notifications</span>
          </li>
          <p className='title'>Service</p>
          <li>
            <SettingsSystemDaydreamOutlined className='icon' />
            <span>System Health</span>
          </li>
          <li>
            <PsychologySharp className='icon' />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplications className='icon' />
            <span>Settings</span>
          </li>
          <p className='title'>User</p>
          <li>
            <AccountCircleOutlined className='icon' />
            <span>Profile</span>
          </li>
          <li onClick={logoutUser}>
            <ExitToApp className='icon' />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className='bottom'>
        <div className='color-options' onClick={light}></div>
        <div className='color-options' onClick={dark}></div>
      </div>
    </div>
  );
};

export default Sidebar;
