import { Form, Layout, Button, Input, Divider } from 'antd';
// import logo from '../../assets/logo-1.svg';
import { FC, useEffect, useState } from 'react';
import { authApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { roleFunc } from '../utils/Roles';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  let navigate = useNavigate();

  // check if already log-in with JWT
  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'scroll';
    };
  });

  const routeChange = async (path: string) => {
    const role = await roleFunc.getRole().then((res) => {
      navigate(`/${res}/${path}`);
    });
  };

  const checkLogin = async () => {
    let data = await authApi.getId();
    if (data !== null && data !== 0) {
      routeChange('dashboard');
    }
  };

  const handleLogin = () => {
    let data = authApi.login({ username, password }).then((res) => {
      if (res.id !== 0) {
        routeChange('dashboard');
      } else {
        alert('Invalid username or password');
      }
      return res;
    });
    return data;
  };

  return (
    <div>
      <h6
        className="login__title"
        style={{ color: '#8172d5', marginLeft: '20px' }}
      >
        Sign In
      </h6>
      <div className="login__form">
        <Form>
          <Form.Item>
            <label
              style={{ fontSize: 20, fontWeight: '700', color: '#8172d5' }}
            >
              Username
            </label>
            <Input
              type="text"
              value={username}
              style={{
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                backgroundColor: '#F2F5F8',
              }}
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
              value={password}
              style={{
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                backgroundColor: '#F2F5F8',
              }}
              onChange={(e) => setPassword(e.target.value)}
              onPressEnter={handleLogin}
            />
          </Form.Item>
          <Form.Item>
            <button
              onClick={() => {
                handleLogin();
              }}
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
              Login
            </button>
          </Form.Item>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '0.5em',
            }}
          >
            <p>
              <a
                style={{
                  color: '#8172d5',
                  textDecoration: 'underline',
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                }}
              >
                Forgot Password?
              </a>
            </p>
            |{' '}
            <p>
              <a
                style={{
                  color: '#8172d5',
                  textDecoration: 'underline',
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                }}
              >
                Forgot Username?
              </a>
            </p>
          </div>
          <Divider>Or</Divider>
          <Form.Item>
            <button
              className="login__create login__button"
              onClick={() => navigate('temp')}
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
              TEMPORARY ACCOUNT
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
