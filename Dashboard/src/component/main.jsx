import React, { useState } from 'react';
import './main.css';
import User from './pages/User/User';
import Subscription from './pages/Subscription/Subscrition';
import Post from './pages/Post/Post';
import Quize from './pages/Quize/Quize';
import YogaPoses from './pages/YogaPoses/YogaPoses';
import Educational from './pages/Educational/Educational';
import Audio from './pages/audio/audio';

function Main() {
  const [activeComponent, setActiveComponent] = useState('User'); // Default to User component

  const handleItemClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'User':
        return <User />;
      case 'Subscription':
        return <Subscription />;
      case 'Post':
        return <Post />;
      case 'Quize':
        return <Quize />;
      case 'YogaPoses':
        return <YogaPoses />;
      case 'Educational':
        return <Educational />;
      case  'audio':
         return <Audio />
      default:
        return null;
    }
  };

  return (
    <div className='h-screen flex'>
      <div className='w-96 p-5 main'>
        <ul>
          <li
            className={`mt-10 text-3xl p-5 hover:cursor-pointer hover:bg-white hover:text-black ${activeComponent === 'User' ? 'bg-white text-black' : ''}`}
            onClick={() => handleItemClick('User')}
          >
            User
          </li>
          <li
            className={`mt-10 text-3xl p-5 hover:cursor-pointer hover:bg-white hover:text-black ${activeComponent === 'Subscription' ? 'bg-white text-black' : ''}`}
            onClick={() => handleItemClick('Subscription')}
          >
            Subscription
          </li>
          <li
            className={`mt-10 text-3xl p-5 hover:cursor-pointer hover:bg-white hover:text-black ${activeComponent === 'Post' ? 'bg-white text-black' : ''}`}
            onClick={() => handleItemClick('Post')}
          >
            Post
          </li>
          <li
            className={`mt-10 text-3xl p-5 hover:cursor-pointer hover:bg-white hover:text-black ${activeComponent === 'Quize' ? 'bg-white text-black' : ''}`}
            onClick={() => handleItemClick('Quize')}
          >
            Quize
          </li>
          <li
            className={`mt-10 text-3xl p-5 hover:cursor-pointer hover:bg-white hover:text-black ${activeComponent === 'YogaPoses' ? 'bg-white text-black' : ''}`}
            onClick={() => handleItemClick('YogaPoses')}
          >
            Yoga Poses
          </li>
          <li
            className={`mt-10 text-3xl p-5 hover:cursor-pointer hover:bg-white hover:text-black ${activeComponent === 'Educational' ? 'bg-white text-black' : ''}`}
            onClick={() => handleItemClick('Educational')}
          >
            Educational
          </li>
          <li
            className={`mt-10 text-3xl p-5 hover:cursor-pointer hover:bg-white hover:text-black ${activeComponent === 'Educational' ? 'bg-white text-black' : ''}`}
            onClick={() => handleItemClick('audio')}
          >
            Audio
          </li>
        </ul>
      </div>
      <div className='flex-1'>
        {/* Render the selected component */}
        {renderComponent()}
      </div>
    </div>
  );
}

export default Main;
