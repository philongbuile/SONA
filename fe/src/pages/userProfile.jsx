import { Card, Form } from 'antd';
import Navbar from '../components/Navbar.jsx';
import Profile from '../components/Profile.jsx';
import './UserProfile.css';
import avatar from '../assets/avatar.png';
import RecordList from '../components/RecordList.jsx';

const UserProfile = () => {
  return (
    <div className="user_profile">
      <Navbar />
      <div className="user_profile_container container">
        <Profile />
        <RecordList />
      </div>
    </div>
  );
};

export default UserProfile;