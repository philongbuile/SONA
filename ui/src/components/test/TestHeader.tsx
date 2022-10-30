import React from 'react';
import {
  LeftOutlined,
  RightOutlined,
  CheckOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import { useNavigate, useParams } from 'react-router-dom';

import { useTestContext } from '../../context/test/TestContext';

// interface
interface TestHeaderProps {
  timeLeft: string;
  handleSubmit: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function TestHeader(props: TestHeaderProps) {
  //routing
  const { id } = useParams();
  const navigate = useNavigate();
  // context
  const { reviewMode, testData } = useTestContext();

  const handleBack = () => {
    navigate(`../${parseInt(id as string) - 1}`);
  };

  const handleNext = () => {
    navigate(`../${parseInt(id as string) + 1}`);
  };

  const handleHome = () => {
    navigate('/student/dashboard');
  };

  return (
    <nav className="sticky top-0 z-30 w-screen bg-white border-gray-200 px-2 sm:px-4 py-2.5">
      <div className="px-5 pcontainer flex flex-wrap justify-between">
        <a href="/student/dashboard" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-primary">
            AprilPE
          </span>
        </a>
        <div>
          <p className="text-primary bg-primary/30 font-bold rounded-lg text-sm px-5 py-2.5 my-auto text-center">
            Time: {props.timeLeft}
          </p>
        </div>
        <div
          className={`items-center space-x-2 ${
            testData.type == 'reading' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <button
            type="button"
            className="disabled:text-white disabled:bg-gray-300 text-primary bg-primary/30 hover:bg-primary/20 hidden md:inline font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
            disabled={parseInt(id as string) <= 1}
            onClick={handleBack}
          >
            BACK
          </button>
          <button
            type="button"
            className="disabled:text-white disabled:bg-gray-300 inline md:hidden text-primary bg-primary/30 font-bold hover:bg-primary/20 rounded-lg text-sm px-2 py-2 text-center mr-3 md:mr-0"
            disabled={parseInt(id as string) <= 1}
            onClick={handleBack}
          >
            <LeftOutlined />
          </button>

          {parseInt(id as string) >= testData.sections.length ? (
            <div>
              <button
                type="button"
                className={`disabled:text-white disabled:bg-gray-300 hidden md:inline text-white ${
                  reviewMode
                    ? 'bg-primary hover:bg-primary/75'
                    : 'bg-green-500 hover:bg-green-00'
                } font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0`}
                onClick={reviewMode ? handleHome : props.handleSubmit}
              >
                {reviewMode ? 'HOME' : 'SUBMIT'}
              </button>
              <button
                type="button"
                className={`disabled:text-white disabled:bg-gray-300 inline md:hidden text-white ${
                  reviewMode
                    ? 'bg-primary hover:bg-primary/75'
                    : 'bg-green-500 hover:bg-green-400'
                } font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0`}
                onClick={reviewMode ? handleHome : props.handleSubmit}
              >
                {reviewMode ? <HomeOutlined /> : <CheckOutlined />}
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                className="disabled:text-white disabled:bg-gray-300 hidden md:inline text-white bg-primary font-bold hover:bg-primary/75 rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                onClick={handleNext}
              >
                NEXT
              </button>
              <button
                type="button"
                className="disabled:text-white disabled:bg-gray-300 inline md:hidden text-white bg-primary font-bold hover:bg-primary/75 rounded-lg text-sm px-2 py-2 text-center mr-3 md:mr-0"
                onClick={handleNext}
              >
                <RightOutlined />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
