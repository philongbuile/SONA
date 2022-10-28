import { Card, Form } from 'antd';
import Navbar from '../components/navbar.jsx';
import Profile from '../components/profile.jsx';
import './userProfile.css';
import avatar from '../assets/avatar.png';
import RecordList from '../components/recordList.jsx';

const UserProfile = () => {
  return (
    <div className="user_profile">
      <Navbar />
      <div className="user_profile_container container">
        <div className="user_profile_personal">
          <Profile />
        </div>
        <div className="user_profile_medical">
          <RecordList />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;