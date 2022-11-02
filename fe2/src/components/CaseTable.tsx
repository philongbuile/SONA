import { User } from '../models/User';
import { Table, Button, Popconfirm, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';


const CaseTable = () => {
    type medicalParams = {
        medical_id: string;
    }
    const navigate = useNavigate();
    const {medical_id} = useParams<medicalParams>()

    interface Params 
    {
        case_id: string,
        diagnosis: string,
        testresult: string,
        treatment: string,
    }
    
    //create title of columns in user table information
    const columns = [
        {
        title: 'Case_ID',
        dataIndex: 'case_id',
        key: 'case_id',
        },
        {
        title: 'Diagnosis',
        dataIndex: 'diagnosis',
        key: 'diagnosis',
        },
        {
        title: 'Test Result',
        dataIndex: 'testresult',
        key: 'testresult',
        },
        {
        title: 'Treatment',
        dataIndex: 'treatment',
        key: 'treament',
        },
        {
        render: (text: string, record: Params) => (
            <Space size="middle">
            <Button onClick={() => {
                navigate(`/patient/case/${medical_id}`)
            }}>See more</Button>
            </Space>
        ),
        },
        {
            render: (text: string, record: Params) => (
                <Space size="middle">
                <Button onClick={() => {
                    navigate(`/operator/appendcase`)
                }}>Add Case</Button>
                </Space>
            ),
        }
    ];

    const data: Params[] = [
        {
        case_id: '1',
        diagnosis: 'Diagnosis 1',
        testresult: 'Test Result 1',
        treatment: 'Treatment 1',
        },
        {
        case_id: '2',
        diagnosis: 'Diagnosis 2',
        testresult: 'Test Result 2',
        treatment: 'Treatment 2',
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

export default CaseTable;