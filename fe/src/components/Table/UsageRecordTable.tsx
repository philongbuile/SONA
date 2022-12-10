import { Table, Button, Popconfirm, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { userApi } from '../../api/userApi';
import { useParams } from 'react-router-dom';
import {UsageRecord} from '../../models/UsageRecord';

const BASE_URL = "128.199.203.189:8080" || "localhost:8080"

const UsageRecordTable = () => {
    type medicalParams = {
        medical_id: string;
    }

    const {medical_id} = useParams<medicalParams>()

    const [result, setResult] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    
    useEffect(() => {
        fetch(`http://${BASE_URL}/record/query/${medical_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                console.log(data)
                setResult(data.response);

            }).catch((error) => {
                console.log(error);
                setError(error);
                setLoading(false);
            });
    }, [])

    //create title of columns in user table information
    const columns = [
        {
        title: 'Medical Infor ID',
        dataIndex: 'med_id',
        key: 'med_id',
        },
        {
        title: 'Record ID',
        dataIndex: 'record_id',
        key: 'record_id',
        },
        {
        title: 'Operation',
        dataIndex: 'operation',
        key: 'operation',
        },
        {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        },
        {
        title: 'Operator_Username',
        dataIndex: 'username',
        key: 'username',
        },
        {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        },
    ];
    
    return (
        <div style={{ padding: 25, background: '#fff', minHeight: '360'}}>
        {loading && <div 
                    className="fixed top-0 right-0 bg-black/50 w-screen h-screen flex justify-center items-center"
                    style={{ zIndex: 1000,
                    fontSize: "36px", color: "white"}}>loading...</div>}
          <Table columns={columns} dataSource={
            result?.map((item: any) => {
            
                return {
                    med_id: item.MedicalInfo_ID,
                    record_id: item.Record_ID,
                    operation: item.Operation,
                    role: item.Roles,
                    username: item.OperatorName,
                    timestamp: item.Time
                }  
            })}
            ></Table>
      </div>
    );

}

export default UsageRecordTable;