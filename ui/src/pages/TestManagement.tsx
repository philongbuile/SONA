import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Button } from 'antd';
import TestTable from '../components/TestTable';

function TestManagement() {
  const navigate = useNavigate();

  const routeChange = () => {
    navigate('users');
  };

  return (
    <body style={{ width: '65%' }}>
      <Divider
        orientation="left"
        style={{ fontSize: '56px', fontFamily: 'Roboto', color: '#8172d5' }}
      >
        Test Management
      </Divider>
      <Divider
        orientation="right"
        style={{ fontSize: '20px', fontFamily: 'Roboto' }}
      >
        <Button type="primary" onClick={routeChange}>
          User Information
        </Button>
      </Divider>

      <TestTable />
      <br></br>
    </body>
  );
}
export default TestManagement;
