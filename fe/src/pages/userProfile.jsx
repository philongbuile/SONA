import { Form } from 'antd';
import '../components/navbar.jsx';
import './userProfile.css';

const userProfile = () => {
  return (
    <Form>
       <Card
        hoverable
        className="profile_image"
        cover={
          <img
            alt="example"
            src={mocktest}
            className="image_cover"
            style={{ alignItems: 'center', borderRadius: 10 }}
          />
        } 
        ></Card>
    </Form>
  );
};