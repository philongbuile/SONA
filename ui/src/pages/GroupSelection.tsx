import React, { useState, useEffect } from 'react';
import GroupCard from '../components/GroupCard';
import { Row, Divider, Button } from 'antd';
import { Class } from '../models/Class';
import { classApi } from '../api/classApi';
import { userApi } from '../api/userApi';
import { authApi } from '../api/authApi';

function GroupSelection() {
  const [data, setData] = React.useState<Class[]>([] as Class[]);

  const getClasses = async () => {
    const id = (await authApi.getId()) as number;
    const allClasses = (await classApi.getAll()) as Class[];
    allClasses.forEach(async (item, index) => {
      await classApi.addMember({ classId: item.id, userId: id });
    });

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
        style={{
          fontSize: '56px',
          fontFamily: 'Roboto',
          color: '#8172d5',
        }}
      >
        Choose the class
      </Divider>

      <Row
        gutter={[20, 20]}
        justify="space-evenly"
        style={{ marginBottom: '5em' }}
        className="py-5"
      >
        {data &&
          data.map((item, index) => {
            return (
              <div
                key={index}
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

export default GroupSelection;
