import Header from "../components/Header/Index";
import CaseTable from "../components/CaseTable";
import {useState} from "react";
import {Divider, Typography, Row, Col } from 'antd';
import UserLayout from "./Layout/UserLayout";
import styles from '../assets/css/UserProfile.module.css';

const CaseResult = () => {
    const [loading, setLoading] = useState<boolean>(true);
    return (
        <div
        style={{
            width: '75%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
            <UserLayout />
            <div className={styles.content}
            style={{
                width: '200%',
            }}
            >
            <Divider
            style={{ fontSize: '50px', fontFamily: 'Roboto', color: '#72c6d5', marginTop: '100px' }}
            >
            Your desire result here:
            </Divider>
            <CaseTable/>
            </div>
        </div>
    )
}

export default CaseResult