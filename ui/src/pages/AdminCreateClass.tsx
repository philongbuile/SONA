import React from 'react';
import CreateForm from '../components/AddGroup/CreateClass';
import { Divider, Button, Form, Layout } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Content } = Layout;

function AdminCreateClass() {
  return (
    <body>
      <Divider
        orientation="center"
        style={{ fontSize: '56px', fontFamily: 'Roboto', color: '#8172d5' }}
      >
        Create Group
      </Divider>
      <Content>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <CreateForm />
          <br></br>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Content>
    </body>
  );
}

export default AdminCreateClass;
