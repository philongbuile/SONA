import { Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
// toast
import { toast } from 'react-toastify';
// routing
import { useNavigate } from 'react-router-dom';
// context
import { useTestContext } from '../../context/test/TestContext';
// components
import { Progress } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
// fetches
import { testApi } from '../../api/testApi';

interface ResultModalProps {
  resultId: number;
}
export default function ResultModal(props: ResultModalProps) {
  const [visible, setVisible] = useState(true);
  const [score, setScore] = useState<number>();
  const [resultNote, setResultNote] = useState('');
  // context
  const { setReviewMode } = useTestContext();
  // routing
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let result = await testApi.getResult(props.resultId.toString());
      setScore(result.score);
      setResultNote(result.resultNote);
    } catch (error) {
      toast(`error: ${error}`);
    }
  };
  // fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const handleReview = () => {
    setReviewMode(true);
    setVisible(false);
    navigate('../../review');
  };

  const handleHome = () => {
    navigate('/student/dashboard');
  };

  return (
    <>
      <Modal
        title={
          <div className="text-xl font-bold text-center text-green-500 pt-5">
            CONGRATULATIONS
          </div>
        }
        centered
        closable={false}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={500}
        footer={[
          <Button key="retake" onClick={handleHome}>
            <HomeOutlined /> Home
          </Button>,
          <Button key="review" type="primary" onClick={handleReview}>
            Review Test
          </Button>,
        ]}
      >
        <div className="text-xl text-center">
          <Progress
            strokeColor={{
              '0%': (score as number) < 50 ? '#e30b1a' : '#87d068',
            }}
            type="circle"
            percent={score}
            format={(percent) => `${percent}`}
          />
          <div className="py-5">
            <p>You have completed this test.</p>
            <p className="italic">《 {resultNote} 》</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
