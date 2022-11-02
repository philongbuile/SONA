import { Card } from 'antd';
import './profile.css';
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
<<<<<<< HEAD
                <div>Dob: 12/12/2001</div>
                <div>Email: longtrung@gmail.com</div>
=======
                <div>Dob: 1/1/2021</div>
>>>>>>> edc5742258e43d351f66ab39c15e98f0c1d86c2d
                <div>Phone: 0123456789</div>
            </div>

        </Card>      
    );
}

export default profile;
        
            