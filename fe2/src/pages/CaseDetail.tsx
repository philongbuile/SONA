import Navbar from "../components/Navbar";
import CaseCard from "../components/TableList/CaseCard";
import styles from '../assets/css/AuthorizationList.module.css'
import {Card, Divider, Typography} from 'antd'
const { Title } = Typography;

const AuthorizationList = () => {
    return (

        <Card className={styles.cover}>
            <Divider orientation="left"style={{fontSize: 40}}>Your Examination Result</Divider> 
            {/* <Title>
                Case_ID: medical1
            </Title> */}
        <CaseCard
            case_id="medical2"
            testresult="new test"
            diagnosis="cough"
            treatment="medicine"
        />
        <CaseCard
            case_id="medical2"
            testresult="true"
            diagnosis="giang mai"
            treatment="wash"
        />
        </Card>
    );
}

export default AuthorizationList;