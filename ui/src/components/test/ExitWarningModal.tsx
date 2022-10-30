import { Button, Modal } from 'antd';
import React, { useState } from 'react';
// context
import { useTestContext } from '../../context/test/TestContext';
// mock data
import mockAnswerData from '../../api/mockFilledAnswerData.json';
// components
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function ExitWarningModal() {
  const [visible, setVisible] = useState(true);

  const { setWaitModal, setReviewMode, setSubmitData } = useTestContext();

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = () => {};

  return (
    <>
      <Modal
        title={
          <div className="text-xl text-red-600 font-bold text-center pt-5">
            ARE YOU SURE?
          </div>
        }
        centered
        closable={false}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={500}
        footer={[
          <Button key="retake" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="review" type="primary" onClick={handleSubmit}>
            Submit Now
          </Button>,
        ]}
      >
        <div className="text-7xl text-center pb-7 text-red-600">
          <ExclamationCircleOutlined />
        </div>
        <div className="text-xl">
          <p>If you exit the test right now, it will be submitted.</p>
          <p>Do you want to retake this test?</p>
        </div>
      </Modal>
    </>
  );
}
