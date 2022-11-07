import Header from "../../components/Header/Index";
import CaseTableOperator from "../../components/Table/CaseTableOperator";
import {useState} from "react";
import {Divider, Typography, Row, Col } from 'antd';
import UserLayout from "../Layout/UserLayout";
import styles from '../../assets/css/UserProfile.module.css';
import { useParams } from "react-router-dom";

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
            <CaseTableOperator />
            </div>
        </div>
    )
}

export default CaseResult