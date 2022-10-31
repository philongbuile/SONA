import { Card } from 'antd';
import './Profile.css';
import avatar from '../assets/avatar.png';

const profile = () => {
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
                <div>Dob: 12/12/2001</div>
                <div>Email: longtrung@gmail.com</div>
                <div>Phone: 0123456789</div>
            </div>

        </Card>      
    );
}

export default profile;
        
            