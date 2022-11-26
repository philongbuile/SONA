import React, { useEffect, useState } from 'react';
import UserProfileCard from '../../components/ProfileCard/UserProfileCard';
import styles from '../../assets/css/UserProfilePage.module.css';
import {Divider, Typography, Row, Col } from 'antd';
import { userApi } from '../../api/userApi';
import { useParams, useNavigate } from 'react-router-dom';
import { UsageRecord } from '../../models/UsageRecord';
import { User } from '../../models/User';
import {Case} from '../../models/MedicalInfo';
import {Link} from 'react-router-dom';
import { Button } from '../../components/Button/index2';
import CaseTable from '../../components/Table/CaseTable';
import UsageRecordTable from '../../components/Table/UsageRecordTable';
import ScrollToTop from '../../models/ScrollToTop';
import DoctorTable from '../../components/Table/DoctorTable';

const { Title } = Typography;

function UserProfile() {
  const navigate = useNavigate();
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
    fetch(`http://128.199.203.189:8080/patient/query/${username}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        },
      mode: 'cors',
        })
    .then((response) => response.json()
    .then((data) => {
      setUser(data.response);
    }).
    catch((error) => {
      console.log(error);
    }));
  }

  useEffect(() => {
    getPersonalInfo();
  }, []);

  const handleRevoke = async(doctor_username) => {
    await fetch(`http://128.199.203.189:8080/patient/revoke_doctor/${username}/${doctor_username}`,
      {
        })
      .then((response) => {
        if (response.status === 200) {
          console.log("success");
          window.location.reload();
        }
        else {
          console.log("500 server error");
        }
      })
      .then((data) => {
        console.log(data);
      }).
      then(() => {
        navigate(0);
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
      <ScrollToTop />
      <div>
        <Divider
          orientation="left"
          style={{
            fontSize: '20px',
            fontFamily: 'Roboto',
            color: '#72c6d5',
            position: 'relative',
          }}
        >
        </Divider>
        <div>
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
              style={{ marginLeft: '100px', textDecoration: 'underline', marginTop: "10%" }}
            >
              Your personal medical information
            </Title>
            <p style={{ marginLeft: '100px', fontWeight: 'Roboto' }}>
              <Link to={`/user/patient/case/${user?.MedicalInfo_ID}`}>Medical ID: {user?.MedicalInfo_ID}</Link>
            </p>
            <div style={{ marginLeft: '100px', fontWeight: 'Roboto' }}>
              <CaseTable/>
            </div>
            

            <div
              style={{
                marginLeft: '100px',
                fontWeight: 'bold',
                marginTop: '30px',
              }}
            >
              <Title level={4} style={{ textDecoration: 'underline' }}>
                Your usage history here
              </Title>
              
              <div style={{ marginTop: '5px' }}>
                <UsageRecordTable />
              </div>

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
                      } to={`/user/operator/profile/${doctor}`}>username: {doctor}</Link>
                    </Col>
                    <Col span={12}>
                      <Button
                        onClick={() => handleRevoke(doctor)}
                      >Revoke</Button>
                    </Col>
                  </Row>
              ))}                
              </p>

              <div>
                  <Button>
                    <Link to={`/user/patient/authorize/${username}/${medical_id}`}>Add more doctor</Link>
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
