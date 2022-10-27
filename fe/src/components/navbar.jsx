import './Navbar.css';
import { BellOutlined } from '@ant-design/icons';
import  {Button , Card, Form} from 'antd';
import logo from '../assets/logo.svg';


const navbar = () => {
  return (
    <div className="md:container md:mx-auto">
      <div className="navbar">
        <div className="navbar_logo">
          <img src={logo} alt="logo" className="logo"/>
        </div>
        <div>
          <Button className="navbar_button" type="primary">Authorization List</Button>
          <Button className="navbar_button" type="primary">Profile</Button>   
          <Button className="navbar_button"type="primary" icon= {<BellOutlined />}></Button>
        </div>
      </div>
    </div>
  );
}

export default navbar;