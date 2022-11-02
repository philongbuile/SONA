import React, { useEffect, useState } from 'react';
import UserProfileCard from '../components/UserFrofile/UserProfileCard';
import styles from '../assets/css/UserProfilePage.module.css';
import { Layout, Divider, Typography } from 'antd';
import { userApi } from '../api/userApi';
import { useParams } from 'react-router-dom';
import { UsageRecord } from '../models/UsageRecord';
import { User } from '../models/User';
import {Link} from 'react-router-dom';

const { Title } = Typography;

function UserProfile() {
  type userParams = {
    username: string;
  };


  const {username} = useParams<userParams>()
  const {medical_id} = useParams()

  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch(`http://localhost:8080/patient/query/${username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
          })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.response);
      }).
      catch((error) => {
        console.log(error);
      });
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
              <p style={{ fontWeight: 'Roboto' }}>  

                {user?.AuthorizedDoctors.map((doctor) => (
                  <Link style = {
                    {
                      display: 'block',
                      marginTop: '10px',
                      textDecoration: 'none',
                    }
                  } to={`/doctor/${doctor}`}>username: {doctor}</Link>
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
