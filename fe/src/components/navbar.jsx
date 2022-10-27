import './navbar.css';
import  { Card, Button, Col, Row} from 'antd';
import 'antd/dist/antd.css';


const navbar = () => {
  return (
        <div className="navbar"> 
            <li><p>About us</p></li>
            <li><p>Guideline</p></li>
            <li><h1>Sona System</h1></li>
            <li><p>Log in</p></li>
            <li><p>Sign up</p></li>
        </div>
  );
}

export default navbar;