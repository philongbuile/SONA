import React, { useEffect, useState } from 'react';
// toast
import { toast } from 'react-toastify';
// context
import { useTestContext } from '../context/test/TestContext';
// fetches
import { testApi } from '../api/testApi';
import { classApi } from '../api/classApi';
// routing
import { useParams, useNavigate } from 'react-router-dom';

function PreTest() {
  // context
  const { testDetails, setTestDetails } = useTestContext();

  // routing
  const navigate = useNavigate();
  const { testId } = useParams();

  // change classId here
  const classId = 0;

  const fetchData = async () => {
    try {
      let data = await classApi.getSingleTest(
        testId as string,
        classId.toString()
      );
      setTestDetails(data);
      console.log('lỗi ở đây nè: ', data);
    } catch (error) {
      toast(`error: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen grid grid-rows-6 bg-gray-200">
      <div className="row-span-1 flex justify-center items-center bg-primary rounded rounded-lg m-5 p-3">
        <h1
          className="font-bold text-xl text-white"
          style={{
            color: '#8172d5',
            marginLeft: '20px',
            fontFamily: 'Roboto',
            fontWeight: 700,
          }}
        >
          Before The Test
        </h1>
      </div>

      <div className="flex flex-col justify-between row-span-5 rounded rounded-lg m-5 p-10 h-3/4 bg-white">
        <div className="text-center">
          <h1 className="font-black text-3xl">{testDetails.testName}</h1>
          <h1 className="font-black text-xl">{testDetails.title}</h1>
        </div>

        <div className="flex justify-center mt-5 py-10">
          <p>{testDetails.info}</p>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-primary hover:bg-primary/70 mx-3 rounded rounded-lg px-3 py-2 font-bold text-white text-xl"
            onClick={() => {
              navigate(`../do/${testId}`);
            }}
          >
            Start
          </button>
          <button
            className="bg-primary hover:bg-primary/70 mx-3 rounded rounded-lg px-3 py-2 font-bold text-white text-xl"
            onClick={() => {
              navigate(`../review/${testId}`);
            }}
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreTest;
