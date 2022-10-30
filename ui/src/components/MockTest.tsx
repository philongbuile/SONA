import { Card, Form, Tag } from 'antd';
import React from 'react';
import './MockTest.css';
import mocktest from '../assets/images/Rectangle 6295.png';
import peopleGroup from '../assets/images/Vector.png';
import { MockTestData } from '../models/MockTestData';

const MockTest: React.FC<MockTestData> = ({ groupId, description, title }) => {
  return (
    <Form>
      <Card
        hoverable
        className="card"
        cover={
          <img
            alt="example"
            src={mocktest}
            className="image_cover"
            style={{ alignItems: 'center', borderTop: 10 }}
          />
        }
      >
        <div className="wrapper">
          {/* <Meta
            title={title}
            className="content"
          // style={{ fontWeight: 'thin' }}
          /> */}
          <h1 className="content">{title}</h1>
          <img
            alt="group"
            src={peopleGroup}
            style={{ zIndex: 1 }}
            className="group_icon"
          />
        </div>
        <Tag color="#F17B7B" style={{ bottom: 'left' }} className="tag_lon">
          #Advance
        </Tag>
      </Card>
    </Form>
  );
};

export default MockTest;
