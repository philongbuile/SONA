import { Card, Form, Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import test from '../assets/images/test-cover.jpg';
import { TestCardData } from '../models/TestCardData';
import { unixToDatetime } from '../utils/timeConvert';
import { useTestContext } from '../context/test/TestContext';
import { TestDetails } from '../models/TestDetails';

import { TeamOutlined, CalendarOutlined } from '@ant-design/icons';

const TestCard: React.FC<TestCardData> = ({
  testId,
  groupName,
  deadline,
  description,
  testClassId,
  testName,
  imageLink,
}) => {
  const navigate = useNavigate();
  const { testDetails, setTestDetails } = useTestContext();

  const routeChange = () => {
    let newTestDetails: TestDetails = testDetails;
    newTestDetails.testClassId = testClassId;

    setTestDetails(newTestDetails);

    navigate(`/test/${testId}/details`);
  };

  return (
    <div className="my-3">
      <Card hoverable className="h-50 rounded rounded-xl">
        <div className="lg:grid lg:grid-cols-9 flex flex-col lg:flex-row">
          <div className="lg:col-span-2 overflow-y-hidden flex items-center justify-center mb-5 lg:mb-0">
            <img alt="example" src={test} className="p-0 rounded rounded-lg" />
          </div>

          <div className="lg:col-span-7 lg:grid lg:grid-cols-6 flex flex-col lg:flex-row lg:pl-5">
            <div className="lg:col-span-3 grid grid-rows-2 flex items-center lg:px-3">
              <div className="text-2xl font-bold">{testName}</div>
              <div className="font-medium"> {description} </div>
            </div>

            <div className="lg:col-span-2 grid grid-rows-2 flex items-center py-3 lg:px-3">
              <div className="inline-flex font-medium">
                <TeamOutlined style={{ color: '#8172D5' }} className="mr-3" />
                Group {groupName}
              </div>
              <div className="inline-flex font-medium">
                <CalendarOutlined
                  style={{ color: '#8172D5' }}
                  className="mr-3"
                />
                {unixToDatetime(deadline)}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <button
                className="bg-primary hover:bg-primary/70 px-4 py-2 rounded rounded-lg font-bold text-white"
                onClick={routeChange}
              >
                Take
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TestCard;
