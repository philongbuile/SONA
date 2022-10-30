import React from 'react';
import { useState, useEffect } from 'react';
import { testApi } from '../api/testApi';
import { TestDetails } from '../models/TestDetails';
import { Table, Button, Popconfirm } from 'antd';
import { unixToDatetime } from '../utils/timeConvert';

interface TestData {
  key: number;
  testName: string;
  description: string;
  testDate: string;
}

const TestTable: React.FC = () => {
  const [tests, setTests] = useState<TestData[]>([] as TestData[]);

  const getData = async () => {
    let data = (await testApi.getAllTests()) as TestDetails[];

    if (data.length === 0) {
      return;
    }

    let newData: TestData[] = [];

    data.forEach((item, index) => {
      let tempt: TestData = {
        key: index + 1,
        testName: item.testName,
        description: item.title,
        testDate: unixToDatetime(item.dateAssigned),
      };

      newData.push(tempt);
    });

    setTests(newData);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Test Name',
      dataIndex: 'testName',
      key: 'testName',
    },
    {
      title: 'Test Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date Assigned',
      dataIndex: 'testDate',
      key: 'testDate',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      // Button to delete test information
      render: (record: any) => {
        return (
          <Popconfirm
            title=" You want to delete this test?"
            onConfirm={() => onDelete(record)}
          >
            <Button type="primary">Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];

  //TODO: Call to delete test information from database
  const onDelete = (record: any) => {
    // setDataSource((pre: any) => {
    //   return pre.filter((test: { key: any }) => test.key !== record.key);
    // });
  };

  return (
    <div style={{ padding: 20, background: '#fff', minHeight: '360' }}>
      <span>
        <Table columns={columns} dataSource={tests}></Table>
      </span>
    </div>
  );
};

export default TestTable;
