import './Navbar.css';
import { BellOutlined } from '@ant-design/icons';
import  {Button , Layout} from 'antd';
import logo from '../assets/logo.svg';

const AppNavbar = () => {
    return (
      <div className="app_navbar">
        <div className="app_navbar_logo">
          <img src={logo} alt="logo" className="logo"/>
        </div>
  
        <Layout>
          <Button className="app_navbar_button" type="primary">Authorization List</Button>
          <Button className="app_navbar_button" type="primary">Profile</Button>   
          <Button className="app_navbar_button"type="primary" icon= {<BellOutlined />}></Button>
        </Layout>
      </div>
    );
}

export default AppNavbar;