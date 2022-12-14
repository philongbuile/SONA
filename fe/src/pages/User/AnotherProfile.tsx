import { useEffect, useState } from 'react';
import UserProfileCard from '../../components/ProfileCard/UserProfileCard';
import styles from '../../assets/css/UserProfilePage.module.css';
import {Divider, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { User } from '../../models/User';
import {Link} from 'react-router-dom';
import CaseTableOperator from '../../components/Table/CaseTableOperator';
import ScrollToTop from '../../models/ScrollToTop';

const { Title } = Typography;

const BASE_URL = process.env.URL || 'localhost:8080';
// Profile of user for doctor to access without seeing usage racord
function AnotherProfile() {
  type userParams = {
    username: string;
  };

  type medicalParams = {
    medical_id: string;
  }
  const {username} = useParams<userParams>()
  const {medical_id} = useParams<medicalParams>()
  const {doctor_username} = useParams<any>()
    
  const [user, setUser] = useState<User>();

  const getPersonalInfo = () => {
    fetch(`http://${BASE_URL}/patient/query/${username}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        },
        })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUser(data.response);
    }).
    catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getPersonalInfo();
  }, []);

  return (
    <div
      style={{
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ScrollToTop />
      <div>
        <Divider
          orientation="left"
          style={{
            fontSize: '20px',
            fontFamily: 'Roboto',
            color: '#72c6d5',
          }}
        >
        </Divider>
        <div className={styles.content}>
          <UserProfileCard
            fullname= {user?.FullName as string}
            username={user?.Username as string}
            phone={user?.Phone as string}
            gender={user?.Gender as string}
            dob={user?.DoB as string}
            address={user?.Address as string}
            avatar={undefined}
          />

          <div className={styles.userinfo}>
            <Title
              level={4}
              style={{ marginLeft: '100px', textDecoration: 'underline' }}
            >
              User personal medical information
            </Title>
            <p style={{ marginLeft: '100px', fontWeight: 'Roboto' }}>
              <Link to={`/medical-info/${user?.MedicalInfo_ID}`}>Medical ID: {user?.MedicalInfo_ID}</Link>
            </p>
            <div style={{ marginLeft: '100px', fontWeight: 'Roboto' }}>
              <CaseTableOperator/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnotherProfile;
