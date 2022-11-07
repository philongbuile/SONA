import { Table, Button, Popconfirm, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const DoctorTable = () =>{
    const navigate = useNavigate();

    interface Params 
    {
        username: string,
    }
    
    //create title of columns in user table information
    const columns = [
        {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        },
        {
        render: (text: string, record: Params) => (
            <Space size="middle">
            <Button
            id={"revoke-button-"+record.username}
            onClick={() => {
            }}>Revoke</Button>
            </Space>
        ),
        }
    ];

    return (
        <div style={{ padding: 25, background: '#fff', minHeight: '360'}}>
      </div>
    );

}

export default DoctorTable;