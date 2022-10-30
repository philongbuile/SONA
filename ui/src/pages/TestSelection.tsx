import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Pagination, Divider } from 'antd';
import { TestDetails } from '../models/TestDetails';
import { classApi } from '../api/classApi';
import { Empty } from 'antd';
import { Class } from '../models/Class';
import TestCard from '../components/TestCard';

function TestSelection() {
  const { id } = useParams();
  const [className, setClassName] = useState('');
  const [data, setData] = useState<TestDetails[]>([] as TestDetails[]);

  const getTests = async () => {
    if (id === undefined) {
      toast('No test id provided');
    }

    let cId: number = parseInt(id as string, 10);

    const tests = await classApi.getTests(cId);
    setData(tests);

    const classInfo = await classApi.getAll();
    let classes: Class[] = classInfo;
    classes.forEach((c) => {
      if (c.id === cId) {
        setClassName(c.className);
      }
    });
  };

  const getPag = () => {
    return (
      <Pagination defaultCurrent={1} total={50} style={{ color: '#8172D5' }} />
    );
  };

  const getEmpty = () => {
    return <Empty />;
  };

  useEffect(() => {
    getTests();
  }, []);

  return (
    <div>
      <Divider
        orientation="left"
        style={{ fontSize: '56px', fontFamily: 'Roboto', color: '#8172d5' }}
      >
        Choose the test
      </Divider>

      <div className="py-5">
        {data &&
          data.map((item, index) => {
            return (
              <TestCard
                key={index}
                testId={item.id}
                groupName={className}
                testClassId={item.testClassId}
                testName={item.testName}
                description={item.info}
                deadline={item.deadline}
                imageLink={'https://i.imgur.com/JKJZuLa.jpeg'}
              />
            );
          })}
      </div>
      {/* <div className="flex justify-center">{data && getPag()}</div> */}
      <div className="flex justify-center">{!data && getEmpty()}</div>
    </div>
  );
}

export default TestSelection;
