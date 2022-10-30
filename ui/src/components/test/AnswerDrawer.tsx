import React from 'react';
import { Form, Drawer, Space } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CheckOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import { useNavigate, useParams } from 'react-router-dom';

import { useTestContext } from '../../context/test/TestContext';

// local interfaces
interface AnswerDrawerProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  sectionComponent: JSX.Element | undefined;
  handleSubmit: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function AnswerDrawer(props: AnswerDrawerProps) {
  //form
  const [form] = Form.useForm();
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
    <Drawer
      title="Answer Panel"
      placement="bottom"
      closable={true}
      onClose={() => {
        props.setVisible(!props.visible);
      }}
      visible={props.visible}
      extra={
        <Space>
          <button
            type="button"
            className="disabled:text-white disabled:bg-gray-300 text-primary bg-primary/30 hover:bg-primary/20 hidden sm:inline font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-3 sm:mr-0"
            disabled={parseInt(id as string) <= 1}
            onClick={handleBack}
          >
            BACK
          </button>
          <button
            type="button"
            className="disabled:text-white disabled:bg-gray-300 inline sm:hidden text-primary bg-primary/30 font-bold hover:bg-primary/20 rounded-lg text-sm px-4 py-2 text-center mr-3 sm:mr-0"
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
                    : 'bg-green-500 hover:bg-green-400'
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
                className="disabled:text-white disabled:bg-gray-300 hidden sm:inline text-white bg-primary font-bold hover:bg-primary/75 rounded-lg text-sm px-5 py-2.5 text-center mr-3 sm:mr-0"
                onClick={handleNext}
              >
                NEXT
              </button>
              <button
                type="button"
                className="disabled:text-white disabled:bg-gray-300 inline sm:hidden text-white bg-primary font-bold hover:bg-primary/75 rounded-lg text-sm px-4 py-2 text-center mr-3 sm:mr-0"
                onClick={handleNext}
              >
                <RightOutlined />
              </button>
            </div>
          )}
        </Space>
      }
    >
      <Form form={form} layout="vertical" autoComplete="off">
        {props.sectionComponent}
      </Form>
    </Drawer>
  );
}
