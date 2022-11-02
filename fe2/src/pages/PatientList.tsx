import Navbar from "../components/Navbar";
import ListPatient from "../components/TableList/ListPatient";
import styles from '../assets/css/AuthorizationList.module.css'
import {Card} from 'antd'

const PatientList = () => {
    return (
        <Card className={styles.cover}>
            <ListPatient/>
        </Card>
    );
}

export default PatientList;