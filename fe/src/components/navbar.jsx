import './navbar.css';
import { BellOutlined } from '@ant-design/icons';
import  {Button , Card, Form} from 'antd';


const navbar = () => {
  return (
    <div className="md:container md:mx-auto">
    <Form>
        <Card className="navbar">
            <li className="sm:ml-40 md:ml-80 xl:ml-150"><p>Healthcare</p></li>
            <li className="sm:ml-40 md:ml-80 xl:ml-150"><Button className="navbar_button" type="primary">Authorization List</Button></li>
            <li className="sm:ml-40 md:ml-80 xl:ml-150"><Button className="navbar_button" type="primary">Profile</Button>    </li>
            <li className="sm:ml-40 md:ml-80 xl:ml-150"><Button className="navbar_button" type="primary" icon= {<BellOutlined />}></Button></li>
        </Card>
    </Form>
    </div>
  );
}

export default navbar;