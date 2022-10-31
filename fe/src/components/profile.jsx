import { Card } from 'antd';
import './profile.css';
import avatar from '../assets/avatar.png';
import { PersonalInforFetch } from '../api/userApi';

const profile = () => {
    const { data: personalData, isPending, error } = PersonalInforFetch('philong123');
    return (
        <Card
            hoverable
            className="profile"
            cover={
            <img
                alt="example"
                src={ avatar }
                className="image_cover"
                style={{ alignItems: 'center', borderRadius: 10 }}
            ></img>
            }>
            <div className="profile_info_bio_title">
                Bio
            </div>
            <div className="profile_info_bio_content">
                <div>Name: Long Trung Nguyen</div>
                <div>Dob: 1/1/2021</div>
                <div>Phone: 0123456789</div>
            </div>

        </Card>      
    );
}

export default profile;
        
            