import styles from '../assets/css/Navbar.module.css';
import { BellOutlined } from '@ant-design/icons';
import  { Button, Layout} from 'antd';


const AppNavbar = () => {
    return (
      <div className={styles.app_navbar}>
        <li><p>About us</p></li>
        <li><p>Guideline</p></li>
        <li><h1>Sona System</h1></li>
        <Layout>
          <Button className={styles.app_navbar_button} type="primary">Notification</Button>
          <Button className={styles.app_navbar_button} type="primary">Profile</Button>   
          <Button className={styles.app_navbar_button} type="primary" icon= {<BellOutlined />}></Button>
        </Layout>
      </div>
    );
}

export default AppNavbar;