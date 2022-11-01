import './navbar.css';
import { BellOutlined } from '@ant-design/icons';
import  {Button , Layout} from 'antd';
// import logo from '../assets/logo.svg';

const AppNavbar = () => {
    return (
      <div className="app_navbar">
        <li><p>About us</p></li>
        <li><p>Guideline</p></li>
        <li><h1>Sona System</h1></li>
        <Layout>
          <Button className="app_navbar_button" type="primary">Authorization List</Button>
          <Button className="app_navbar_button" type="primary">Profile</Button>   
          <Button className="app_navbar_button"type="primary" icon= {<BellOutlined />}></Button>
        </Layout>
      </div>
    );
}

export default AppNavbar;