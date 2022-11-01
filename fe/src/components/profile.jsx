import { Card } from 'antd';
<<<<<<< HEAD
import './Profile.css';
// import avatar from '../assets/avatar.png';
import avatar from '../assets/avatar.png';
import { PersonalInforFetch } from '../api/userApi';
import { useParams } from 'react-router-dom';

const profile = () => {
    const username = useParams();
    const { data: personalData, isPending, error } = PersonalInforFetch(username);
=======
import './profile.css';
import avatar from '../assets/avatar.png';

const profile = () => {
>>>>>>> 5a89dc1cbabb85a30d1f94474522884856efa84f
    return (
        <Card
            hoverable
            className="profile"
            cover={
            <img
                alt="example"
                
                className="image_cover"
                style={{ alignItems: 'center', borderRadius: 10 }}
            ></img>
            }>
            <div className="profile_info_bio_title">
                Bio
            </div>
            <div className="profile_info_bio_content">
<<<<<<< HEAD
                <p>Name: Long Trung Nguyen</p>
                <p>Dob: 1/1/2021</p>
                <p>Phone: 0123456789</p>
=======
                <div>Name: Long Trung Nguyen</div>
<<<<<<< HEAD
                <div>Dob: 12/12/2001</div>
                <div>Email: longtrung@gmail.com</div>
=======
                <div>Dob: 1/1/2021</div>
>>>>>>> edc5742258e43d351f66ab39c15e98f0c1d86c2d
                <div>Phone: 0123456789</div>
>>>>>>> 5a89dc1cbabb85a30d1f94474522884856efa84f
            </div>

        </Card>      
    );
}

export default profile;
        
            