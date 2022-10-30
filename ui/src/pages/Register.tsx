import { Divider, Form, Input } from 'antd';
import React, { useState } from 'react';
import { authApi } from '../api/authApi';
import { classApi } from '../api/classApi';
import { Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Class } from '../models/Class';
import './Login.css';
// toast
import { toast } from 'react-toastify';
import { Select } from 'antd';
const { Option } = Select;

export const Register = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const handleRegister = async () => {
    try {
      const id = (await authApi.register({
        fullname: fullname,
        username: username,
        password: password,
        gender: gender,
        mail: email,
      })) as number;

      if (id > 0) {
        toast('Successful! Redirecting to login...');
        navigate('../login');
      }
    } catch (error) {
      toast(`error: ${error}`);
      console.log(error);
    }
  };

  // const openNotification = () => {
  //   notification.open({
  //     message: 'Create Account Success!',
  //     description:
  //       'Please move to sign-in section to start using our application.',
  //     onClick: () => {
  //       console.log('Notification Clicked!');
  //     },
  //     placement: 'top',
  //   });
  // };

  return (
    <>
      <h1
        className="signup__title"
        style={{ color: '#8172d5', marginLeft: '20px' }}
      >
        Create Account
      </h1>
      <div className="temp__form">
        <Form>
          <Form.Item>
            <label
              style={{ fontSize: 20, fontWeight: '700', color: '#8172d5' }}
            >
              Full name
            </label>
            <Input
              required
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <label
              style={{ fontSize: 20, fontWeight: '700', color: '#8172d5' }}
            >
              Username
            </label>
            <Input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <label
              style={{ fontSize: 20, fontWeight: '700', color: '#8172d5' }}
            >
              Password
            </label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <label
              style={{ fontSize: 20, fontWeight: '700', color: '#8172d5' }}
            >
              Email
            </label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <label
              style={{ fontSize: 20, fontWeight: '700', color: '#8172d5' }}
            >
              Gender
            </label>
            <Select
              onChange={(value) => {
                setGender(value);
              }}
              className={`w-full text-center py-1 bg-gray-200`}
              dropdownClassName="text-center"
            >
              <Option value={'male'}>Male</Option>
              <Option value={'female'}>Female</Option>
              <Option value={'other'}>Other</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <button
              onClick={handleRegister}
              className="login__button login__login"
              style={{
                width: '100%',
                height: '50px',
                borderRadius: '32px',
                paddingTop: '4px',
                border: '2px solid #8172d5',
                paddingBottom: '4px',
                lineHeight: '14px',
                fontSize: '20px',
              }}
            >
              Create Account
            </button>
          </Form.Item>
          <Divider>Or</Divider>
          <Form.Item>
            <button
              className="login__create login__button"
              onClick={() => navigate('/login')}
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '32px',
                border: '2px solid #8172d5',
                paddingTop: '4px',
                paddingBottom: '4px',
                lineHeight: '14px',
              }}
            >
              SIGN IN
            </button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
