import { User } from '../models/User';
import { Table, Button, Popconfirm, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {MedicalInfo} from '../models/MedicalInfo';
import {userApi} from '../api/userApi';


const CaseTable = () => {

    const {username} = useParams<any>();
    interface caseParams {
        Case_ID: string;
    }
    const navigate = useNavigate();
    const [medical_id, setMedicalID] = useState<any>();
    const id = userApi.getId(username).then((data) => {
        setMedicalID(data);
    });

    const [result, setResult] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetch(`http://localhost:8080/medinfo/patient_query_medicalinfo/${medical_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setResult(data.response.Cases);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setError(error);
                setLoading(false);
            });
    }, [])


    //create title of columns in user table information
    const columns = [
        {
        title: 'Case ID',
        dataIndex: 'Case_ID',
        key: 'Case_ID',
        },
        {
        render: (text: string, record: caseParams) => (
            <Space size="middle">
            <Button onClick={() => {
                navigate(`/user/patient/case/${medical_id}/${record.Case_ID}`)
            }}>See more</Button>
            </Space>
        ),
        },
    ];

    
    return (
        <div style={{ padding: 25, background: '#fff', minHeight: '360'}}>
        <span>
          <Table columns={columns} dataSource={
                result?.map((items: any) => {
                    return {
                        Case_ID: items.Case_ID,
                    }
                })
          }></Table>
        </span>
      </div>
    );

}

export default CaseTable;