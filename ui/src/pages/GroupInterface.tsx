import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupCard from '../components/GroupCard';
import { Row, Divider, Button } from 'antd';
import { Class } from '../models/Class';
import { classApi } from '../api/classApi';
import { userApi } from '../api/userApi';
import { authApi } from '../api/authApi';

function GroupInterface() {
  const navigate = useNavigate();
  const [data, setData] = React.useState<Class[]>([] as Class[]);

  const getClasses = async () => {
    const id = (await authApi.getId()) as number;
    const classes = (await userApi.getClass(id)) as Class[];

    setData(classes);
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#fff',
        width: '60%',
      }}
    >
      <Divider
        orientation="left"
        style={{ fontSize: '25px', fontFamily: 'Roboto' }}
      >
        Choose the class
      </Divider>

      <Divider
        orientation="right"
        style={{
          color: '#8172d5',
          fontSize: '56px',
          fontFamily: 'Roboto',
          fontWeight: 700,
        }}
      >
        <Button type="primary" onClick={() => navigate('create')}>
          {' '}
          Create new group{' '}
        </Button>
      </Divider>

      <Row
        gutter={[20, 20]}
        justify="space-evenly"
        style={{ marginBottom: '5em' }}
      >
        {data &&
          data.map((item) => {
            return (
              <div
                style={{
                  borderColor: '#d4d4d6',
                  borderWidth: '1px',
                  borderRadius: '20px',
                }}
              >
                <GroupCard
                  id={item.id}
                  className={item.className}
                  info={item.info}
                  announcement={item.announcement}
                  roomCode={item.roomCode}
                  level={item.level}
                />
              </div>
            );
          })}
      </Row>
      {/* <Row justify="center">
        <Pagination defaultCurrent={1} total={5} style={{ color: '#8172D5' }} />
      </Row> */}
    </div>
  );
}

export default GroupInterface;
