import { Form, Card } from 'antd';
import './profile.css';
import avatar from './avatar.png';

const fullName = 'Vinh'
const phone = '123456789'

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
                <div className="profile_info">
                    <p>Name: {fullName}</p>
                    <p>Phone: {phone}</p>
                </div>
                 </Card>      
    );
}

export default profile;
        
            