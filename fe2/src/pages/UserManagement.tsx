import React from 'react';
import { useNavigate } from 'react-router-dom';
// import library from antd
import { Divider, Row, Button } from 'antd';
import { Pagination } from 'antd';

// import Component from components
import UserTable from '../components/UserTable';

function AdminManagement() {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate('/admin/');
  };

  return (
    <div style={{ width: '65%' }}>
      <Divider
        orientation="left"
        style={{ fontSize: '56px', fontFamily: 'Roboto', color: '#8172d5' }}
      >
        User Management
      </Divider>
      <Divider
        orientation="right"
        style={{ fontSize: '20px', fontFamily: 'Roboto' }}
      >
        <Button type="primary" onClick={routeChange}>
          Test Information
        </Button>
      </Divider>

      <UserTable />

      <br></br>
    </div>
  );
}

export default AdminManagement;
