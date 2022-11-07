import { User } from '../../models/User';
import { Table, Button, Popconfirm, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { patientApi } from '../../api/patientApi';

const PatientTable = () => {

    interface Params 
    {
        username: string,
        medical_id: string,
    }

    const navigate = useNavigate();
    const {doctor_username} = useParams<any>()

    const [users, setUsers] = useState<User[]>([] as User[]);

    const getPatient = async() => {
        const response = await patientApi.getPatientsofDoctor(doctor_username);
        setUsers(response);
    }


    useEffect(() => {
        getPatient();
    }, []);

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
        render: (text: string, record: Params) => (
            <Space size="middle">
            <Button onClick={() => {
                navigate(`/user/operator/patient/info/${record.username}/${doctor_username}/${record.medical_id}`)
            }}>Visit them online</Button>
            </Space>
        ),
        },
    ];

    
    return (
        <div style={{ padding: 25, background: '#fff', minHeight: '360'}}>
        <span>
          <Table columns={columns} dataSource={
            users?.map((user: any) => ({
                medical_id: user.MedicalInfo_ID,
                username: user.Username,
            }))
          }></Table>
        </span>
      </div>
    );

}

export default PatientTable;