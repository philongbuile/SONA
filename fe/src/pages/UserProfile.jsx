import { Card, Form } from 'antd';
import Navbar from '../components/Navbar.jsx';
import Profile from '../components/Profile.jsx';
import './UserProfile.css';
// import avatar from '../assets/avatar.png';
import RecordList from '../components/RecordList.jsx';

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