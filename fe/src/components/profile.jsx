import { Card } from 'antd';
import './Profile.css';
import avatar from '../assets/avatar.png';

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
        </Card>      
    );
}

export default profile;
        
            