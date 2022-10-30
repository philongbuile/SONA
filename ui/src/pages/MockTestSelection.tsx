import React from 'react';
import MockTest from '../components/MockTest';
import { Row, Divider } from 'antd';
import { Pagination } from 'antd';
import { MockTestData } from '..//models/MockTestData';

const defaultData: MockTestData[] = [
  {
    groupId: 1,
    description: 'this is the new group',
    title: 'GROUP 1',
  },
  {
    groupId: 1,
    description: 'this is the new group',
    title: 'GROUP 1',
  },
  {
    groupId: 1,
    description: 'this is the new group',
    title: 'GROUP 1',
  },
  {
    groupId: 1,
    description: 'this is the new group',
    title: 'GROUP 1',
  },
  {
    groupId: 1,
    description: 'this is the new group',
    title: 'GROUP 1',
  },
  {
    groupId: 1,
    description: 'this is the new group',
    title: 'GROUP 1',
  },
  {
    groupId: 1,
    description: 'this is the new group',
    title: 'GROUP 1',
  },
  {
    groupId: 1,
    description: 'this is the new group',
    title: 'GROUP 1',
  },
];

function MockTestSelection() {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <body>
        <Divider orientation="left">Choose the test</Divider>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-md md:max-w-6xl mx-auto">
          {defaultData.map((item) => {
            return (
              <MockTest
                groupId={item.groupId}
                description={item.description}
                title={item.title}
              />
            );
          })}
        </div>
        <br></br>
        <Row justify="center">
          <Pagination
            defaultCurrent={1}
            total={50}
            style={{ color: '#8172D5' }}
          />
        </Row>
      </body>
    </div>
  );
}

export default MockTestSelection;
