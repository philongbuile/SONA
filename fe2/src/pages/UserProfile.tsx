import React, { useEffect, useState } from 'react';
import UserProfileCard from '../components/UserFrofile/UserProfileCard';
import styles from '../assets/css/UserProfilePage.module.css';
import {Divider, Typography, Row, Col } from 'antd';
import { userApi } from '../api/userApi';
import { useParams } from 'react-router-dom';
import { UsageRecord } from '../models/UsageRecord';
import { User } from '../models/User';
import {Case} from '../models/MedicalInfo';
import {Link} from 'react-router-dom';
import { Button } from '../components/Button/index2';

const { Title } = Typography;

function UserProfile() {
  type userParams = {
    username: string;
  };

  type medicalParams = {
    medical_id: string;
  }


  const {username} = useParams<userParams>()
  const {medical_id} = useParams<medicalParams>()

  const [user, setUser] = useState<User>();
  const [cases, setCase] = useState<Case>();

  const getPersonalInfo = () => {
    fetch(`http://localhost:8080/patient/query/${username}`,
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

  const getCases = () => {
    fetch(`http://localhost:8080/medinfo/patient_query_medicalinfo/${medical_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        },
        })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setCase(data.response);
    }).
    catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getPersonalInfo();
    getCases();
  }, []);

  const handleRevoke = async(doctor_username) => {
    await fetch(`http://localhost:8080/patient/revoke_doctor/${username}/${doctor_username}`,
      {
        })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      }).
      catch((error) => {
        console.log(error);
      });
  }

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
            fontSize: '56px',
            fontFamily: 'Roboto',
            color: '#8172d5',
          }}
        >
          User Profile
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
              Your personal medical information
            </Title>
            <p style={{ marginLeft: '100px', fontWeight: 'Roboto' }}>
              <Link to={`/medical-info/${user?.MedicalInfo_ID}`}>Medical ID: {user?.MedicalInfo_ID}</Link>

            </p>


            <div
              style={{
                marginLeft: '100px',
                fontWeight: 'bold',
                marginTop: '30px',
              }}
            >
              <Title level={4} style={{ textDecoration: 'underline' }}>
                Your authorized doctors
              </Title>
              <p style={{ display: "flex",
                          justifyContent: "space-between",
                          fontWeight: 'Roboto' }}>  

              {user?.AuthorizedDoctors.map((doctor) => (
                <Row>
                  <Col span={12}>
                    <Link style = {
                      {
                        display: 'block',
                        marginTop: '10px',
                        textDecoration: 'none',
                      }
                    } to={`/doctor/${doctor}`}>username: {doctor}</Link>
                  </Col>
                  <Col span={12}>
                    <Button
                      onClick={() => handleRevoke(doctor)}
                    >Revoke</Button>
                  </Col>
                </Row>
              ))}                
              </p>

              <div className={styles.recent_test}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
