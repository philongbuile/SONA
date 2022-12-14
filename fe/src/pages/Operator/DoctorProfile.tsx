import React, { useEffect, useState } from 'react';
import UserProfileCard from '../../components/ProfileCard/UserProfileCard';
import styles from '../../assets/css/UserProfilePage.module.css';
import {Divider, Typography, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { User } from '../../models/User';
import {Link} from 'react-router-dom';
import { Button } from '../../components/Button/index2';
import {Operator} from '../../models/Operator';
import PatientTable from '../../components/Table/PatientTable';

const { Title } = Typography;

const BASE_URL = process.env.URL || 'localhost:8080';

function DoctorProfile() {
  const {doctor_username} = useParams<any>()
  const {medical_id} = useParams<any>()

  const [operator, setOperator] = useState<Operator>();


  const getPersonalInfo = () => {
    fetch(`http://${BASE_URL}/operator/query/${doctor_username}`,
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
            fullname= {"Dr David" as string}
            username={operator?.Username as string}
            phone={"0911111111" as string}
            gender={"male" as string}
            dob={"1/1/2001" as string}
            address={"1 Frankfurter Strasse" as string}
            avatar={undefined}
          />
          <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px',
            }}
          >
            <Button
            >
                <Link to={"/operator/addcase/" + operator?.Username}>Create Case</Link>
            </Button>
            <Button>
                <Link to={"/operator/appendcase/" + operator?.Username}>Add Case</Link>
            </Button>
            <Button>
                <Link to={"/operator/search/" + doctor_username}>Search Med Info</Link>
            </Button>
          </div>

          <div className={styles.userinfo}>
            <Title
              level={4}
              style={{ marginLeft: '360px', textDecoration: 'underline', marginTop: '55px' }}
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
