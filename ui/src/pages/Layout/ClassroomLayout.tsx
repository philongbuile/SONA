import './ClassroomLayout.css';

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import { Class } from '../../models/Class';
import { authApi } from '../../api/authApi';
import { classApi } from '../../api/classApi';

const { Content, Sider } = Layout;

const ClassroomLayout = () => {
  return (
    <>
      <div className="classroom_layout__main">
        <div className="classroom_layout__breadcrumb">
          {/* <Breadcrumb>
            {breadcrumb.map((item, index) => {
              return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
            })}
          </Breadcrumb> */}
        </div>
        <Layout style={{ width: '100%', backgroundColor: '#fff' }}>
          <div className="classroom_layout__content">
            <Content className="classroom_layout__ant_content">
              <Outlet />
            </Content>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default ClassroomLayout;
