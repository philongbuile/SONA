import { Table, Button, Popconfirm, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';


const DoctorTable = () => {
    const navigate = useNavigate();

    interface Params 
    {
        username: string,
        role: string,
    }
    
    //create title of columns in user table information
    const columns = [
        {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        },
        {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        },
        {
        render: (text: string, record: Params) => (
            <Space size="middle">
            <Button onClick={() => {
            }}>Revoke</Button>
            </Space>
        ),
        }
    ];

    const data: Params[] = [
        {
        username: 'Doctor1',
        role: 'Doctor',
        },
        {
        username: 'Doctor2',
        role: 'Researcher',
        },
    ]

    
    return (
        <div style={{ padding: 25, background: '#fff', minHeight: '360'}}>
        <span>
          <Table columns={columns} dataSource={data}></Table>
        </span>
      </div>
    );

}

export default DoctorTable;