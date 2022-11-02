import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import './Login.css';
import { Navigate, redirect, Route, useNavigate } from 'react-router-dom'


const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    // e.preventDefault();
    const userInfo = {userName, password}
    console.log(userInfo)
    console.log(typeof(userInfo))
    fetch('http://localhost:8080/login', {
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": userName,
        "password": password
      }),
    })
    .then((res) =>{
      console.log(res)
      return res.json()
    })
    .then((data) => {
        if(data){
          console.log(data)
          window.localStorage.setItem("username", data.userName);
          <Route path='/userprofile' element={<Navigate to='/' />} />
        }    
        }
    )
  }

  return (
    <div className="login">
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      // action='/login'
      // onFinish={onFinish}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" 
                value={userName} onChange={(e) => setUserName(e.target.value)}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
    </div>
  );
};
export default Login;