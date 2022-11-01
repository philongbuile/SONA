import React, { useEffect, useState } from 'react';
import UserProfileCard from '../components/UserFrofile/UserProfileCard';
import styles from '../assets/css/UserProfilePage.module.css';
import { Layout, Divider, Typography } from 'antd';
import { userApi } from '../api/userApi';
import { authApi } from '../api/authApi';
import { UsageRecord } from '../models/UsageRecord';
import { User } from '../models/User';
import { useParams } from 'react-router-dom';

const { Title } = Typography;

function UserProfile() {
  const username = useParams();
  const medicalinforID = useParams();
  const [user, setUser] = useState<User>();
  const [record, setRecord] = useState<UsageRecord>();
  const getData = async () => {
    const userData = (await userApi.getInfoByUsername("philong123")) as User[];
    setUser(userData[0]);

    const recordData = (await userApi.getUsageRecords("medical1") as UsageRecord[]);

    setRecord(recordData[0]);
  };

  useEffect(() => {
    getData();
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
            id={user?.id as string}
            fullname={user?.fullname as string}
            username={user?.username as string}
            email={user?.email as string}
            gender={user?.gender as string}
            dob={user?.dob as string}
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
              Peekaboo is a magical application. It was a question of which of
              the two she preferred. On the one hand, the choice seemed simple.
              The more expensive one with a brand name would be the choice of
              most. It was the easy choice. The safe choice. But she wasn't sure
              she actually preferred it.
            </p>


            <div
              style={{
                marginLeft: '100px',
                fontWeight: 'bold',
                marginTop: '30px',
              }}
            >
              <Title level={4} style={{ textDecoration: 'underline' }}>
                Most Recent Test Results
              </Title>

              <div className={styles.recent_test}>
                    <div
                      style={{
                        width: 220,
                        height: 50,
                        border: '1px solid',
                        borderColor: '#8e9599',
                        borderRadius: '5px',
                        marginRight: '15px',
                      }}
                    >
                      <a
                        style={{ color: 'black' }}
                        //href={`/usage_record/${record.id}/details`}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: '12px',
                            marginRight: '15px',
                            marginLeft: '15px',
                          }}
                        >
                          <p style={{ fontWeight: 'bold' }}>
                            {record?.operator_username}
                          </p>
                          <p>{record?.operation}/100</p>
                        </div>
                      </a>
                    </div>
                  );
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
