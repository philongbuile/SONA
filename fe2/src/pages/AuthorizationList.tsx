import Navbar from "../components/Navbar";
import TableList from "../components/TableList/TableList";
import styles from '../assets/css/AuthorizationList.module.css'
import {Card} from 'antd'

const AuthorizationList = () => {
    return (
        <Card className={styles.cover}>
            <TableList/>
        </Card>
    );
}

export default AuthorizationList;