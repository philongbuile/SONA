import React, { useEffect, useState } from 'react';
import { userApi } from '../api/userApi';
import { User } from '../models/User';
import { Table, Button, Popconfirm } from 'antd';

interface UserData {
  key: number;
  username: string;
  fullname: string;
  email: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([] as UserData[]);

  const getData = async () => {
    let data = (await userApi.getAllUsers()) as User[];

    if (data.length === 0) {
      return;
    }

    let newUser: UserData[] = [];
    data.forEach((user, index) => {
      let tempt: UserData = {
        key: index + 1,
        username: user.username,
        fullname: user.fullname,
        email: user.mail,
      };

      newUser.push(tempt);
    });

    setUsers(newUser);
  };

  useEffect(() => {
    getData();
  }, []);

  //create title of columns in user table information
  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      // Button to delete test information
      render: (record: any) => {
        return (
          <Popconfirm
            title=" You want to delete this user?"
            onConfirm={() => onDelete(record)}
          >
            <Button type="primary">Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];

  //GOTO: Call to delete test information from database
  const onDelete = (record: any) => {
    // setDataSource((pre: any) => {
    //   return pre.filter((test: { key: any }) => test.key !== record.key);
    // });
  };

  return (
    <div style={{ padding: 20, background: '#fff', minHeight: '360' }}>
      <span>
        <Table columns={columns} dataSource={users}></Table>
      </span>
    </div>
  );
};

export default UserTable;
