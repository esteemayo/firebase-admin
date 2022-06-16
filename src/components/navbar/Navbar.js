import {
  ChatBubbleOutlineOutlined,
  DarkModeOutlined,
  FullscreenExitOutlined,
  LanguageOutlined,
  LightModeOutlined,
  ListOutlined,
  NotificationsNoneOutlined,
  SearchOutlined,
} from '@mui/icons-material';

import { useGlobalContext } from 'context/darkMode/DarkModeContext';

import './navbar.scss';

const Navbar = () => {
  const { darkMode, toggle } = useGlobalContext();

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='Search...' />
          <SearchOutlined />
        </div>
        <div className='items'>
          <div className='item'>
            <LanguageOutlined className='icon' />
            English
          </div>
          <div className='item'>
            {darkMode ? (
              <DarkModeOutlined className='icon' onClick={toggle} />
            ) : (
              <LightModeOutlined className='icon' onClick={toggle} />
            )}
          </div>
          <div className='item'>
            <FullscreenExitOutlined className='icon' />
          </div>
          <div className='item'>
            <NotificationsNoneOutlined className='icon' />
            <div className='counter'>1</div>
          </div>
          <div className='item'>
            <ChatBubbleOutlineOutlined className='icon' />
            <div className='counter'>2</div>
          </div>
          <div className='item'>
            <ListOutlined className='icon' />
          </div>
          <div className='item'>
            <img
              src='https://images.pexels.com/photos/11293709/pexels-photo-11293709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='avatar'
              className='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
