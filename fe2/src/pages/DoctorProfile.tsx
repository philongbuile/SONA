import React, { useEffect, useState } from 'react';
import UserProfileCard from '../components/UserFrofile/UserProfileCard';
import styles from '../assets/css/UserProfilePage.module.css';
import {Divider, Typography, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { UsageRecord } from '../models/UsageRecord';
import { User } from '../models/User';
import {Link} from 'react-router-dom';
import { Button } from '../components/Button/index2';
import CaseTable from '../components/CaseTable';
import UsageRecordTable from '../components/UsageRecordTable';
import ScrollToTop from '../models/ScrollToTop';
import {Operator} from '../models/Operator';
import PatientTable from '../components/PatientTable';

const { Title } = Typography;

function DoctorProfile() {
  type userParams = {
    username: string;
  };

  type medicalParams = {
    medical_id: string;
  }


  const {username} = useParams<userParams>()
  const {medical_id} = useParams<medicalParams>()

  const [user, setUser] = useState<User>();
  const [operator, setOperator] = useState<Operator>();


  const getPersonalInfo = () => {
    fetch(`http://localhost:8080/operator/query/${username}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        },
        })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setOperator(data.response);
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
        <div>
          <UserProfileCard
            fullname= {operator?.Role + " Co Giao Thao" as string}
            username={operator?.Username as string}
            phone={"0911111111" as string}
            gender={"male" as string}
            dob={"1/1/2001" as string}
            address={"1 Bui Vien" as string}
            avatar={undefined}
          />
          <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px',
            }}
          >
            <Button>
                <Link to="/operator/addcase/medical1">Create Case</Link>
            </Button>
            <Button>
                <Link to="/operator/appendcase/medical1/case1">Add Case</Link>
            </Button>
            <Button>
                <Link to="/operator/search/cancer">Search Case</Link>
            </Button>
          </div>

          <div className={styles.userinfo}>
            <Title
              level={4}
              style={{ marginLeft: '260px', textDecoration: 'underline', marginTop: '55px' }}
            >
              My patient list
            </Title>
            <div style={{ marginLeft: '90px', fontWeight: 'Roboto' }}>
              <PatientTable/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
