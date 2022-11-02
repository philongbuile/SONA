import { User } from '../models/User';
import { Table, Button, Popconfirm, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';


const PatientTable = () => {
    type userParams = {
        username: string;
    }
    const navigate = useNavigate();
    const {username} = useParams<userParams>()

    const [user, setUser] = useState<User>();

    interface Params 
    {
        username: string,
        gender: string,
        medical_id: string,
        phone: string,
    }
    
    //create title of columns in user table information
    const columns = [
        {
        title: 'Medical ID',
        dataIndex: 'medical_id',
        key: 'medical_id',
        },
        {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        },
        {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        },
        {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        },
        {
        render: (text: string, record: Params) => (
            <Space size="middle">
            <Button onClick={() => {
                // ${user?.MedicalInfo_ID}
                navigate(`/user/patient/profile/philong123/medical2`)
            }}>Visit them online</Button>
            </Space>
        ),
        },
    ];

    const data: Params[] = [
        {
        medical_id: "medical1",
        username: "philong123",
        gender: "male",
        phone: "123456789",
        },
        {
        medical_id: "medical2",
        username: "mrC",
        gender: "male",
        phone: "999999999",
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

export default PatientTable;