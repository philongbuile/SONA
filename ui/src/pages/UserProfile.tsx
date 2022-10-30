import React, { useEffect, useState } from 'react';
import UserChart from '../components/UserChart';
import UserProfileCard from '../components/UserFrofile/UserProfileCard';
import styles from '../assets/css/UserProfilePage.module.css';
import { Layout, Divider, Typography } from 'antd';
import { userApi } from '../api/userApi';
import { authApi } from '../api/authApi';
import { Result } from '../models/Result';
import { User } from '../models/User';

const { Title } = Typography;

function UserProfile() {
  const [user, setUser] = useState<User>();
  const [results, setResults] = useState<Result[]>([] as Result[]);

  const getData = async () => {
    const id = (await authApi.getId()) as number;
    const userData = (await userApi.getInfoById(id)) as User[];

    setUser(userData[0]);

    const testResult = (await userApi.getAllTestResult(id)) as Result[];

    let res: Result[] = [];
    testResult.forEach((item, index) => {
      if (index + 1 > testResult.length - 3) {
        res.push(item);
      }
    });

    setResults(res);
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
            id={user?.id as number}
            fullname={user?.fullname as string}
            username={user?.username as string}
            email={user?.mail as string}
            gender={user?.gender as string}
            avatar={undefined}
          />

          <div className={styles.userinfo}>
            <Title
              level={4}
              style={{ marginLeft: '100px', textDecoration: 'underline' }}
            >
              Welcome to Peekaboo
            </Title>
            <p style={{ marginLeft: '100px', fontWeight: 'Roboto' }}>
              Peekaboo is a magical application. It was a question of which of
              the two she preferred. On the one hand, the choice seemed simple.
              The more expensive one with a brand name would be the choice of
              most. It was the easy choice. The safe choice. But she wasn't sure
              she actually preferred it.
            </p>

            <UserChart />

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
                {results.map((result, resultIndex) => {
                  return (
                    <div
                      key={resultIndex}
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
                        href={`/test/${result.testId}/details`}
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
                            {result.testName}
                          </p>
                          <p>{result.score}/100</p>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
