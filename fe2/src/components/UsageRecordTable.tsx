import { User } from '../models/User';
import { Table, Button, Popconfirm, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { userApi } from '../api/userApi';

const UsageRecordTable = () => {
    interface Params 
    {
        med_id: string,
        operation: string,
        role: string,
        username: string,
        timestamp: string,
    }
    
    //create title of columns in user table information
    const columns = [
        {
        title: 'Medical Infor ID',
        dataIndex: 'med_id',
        key: 'med_id',
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
        title: 'Doctor_Username',
        dataIndex: 'username',
        key: 'username',
        },
        {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        },
        {
        render: (text: string, record: Params) => (
            <Space size="middle">
            <Button onClick={() => {}}>See more</Button>
            </Space>
        ),
        },
    ];

    const data: Params[] = [
        {
        med_id: '1',
        operation: 'read',
        username: 'doctor1',
        role: 'doctor',
        timestamp: '2022-02-11 14:00:00',
        },
        {
        med_id: '2',
        operation: 'write',
        username: 'researcher1',
        role: 'researcher',
        timestamp: '2022-02-11 13:00:00',
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

export default UsageRecordTable;