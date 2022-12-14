import { lazy } from 'react';
import { Form, Layout, Button, Input, Divider } from 'antd';
// import logo from '../../assets/logo-1.svg';
import { useEffect, useState } from 'react';
import { authApi } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { roleFunc } from '../../utils/Roles';
import './Login.css';
import MockUser from '../../api/MockUser.json';

const BASE_URL = process.env.URL || "localhost:8080"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  let navigate = useNavigate();


  const handleLogin = async() => {
    await fetch(`http://${BASE_URL}/patient/query/${username}`, {
      method: 'GET'
      })
      .then((response) => 
        {
          if (response.status === 200 && password === MockUser.password) {
            return response.json();
          } else {
            alert('wrong password or username');
          }
        }
      )
      .then((data) => {
        console.log(data.response.MedicalInfo_ID);
        navigate('/user/patient/profile/' + data.response.Username + '/' + data.response.MedicalInfo_ID);
      }).catch((error) => {
        console.log(error);
      });
    }
  return (
    <div>
      <h6
        className="login__title"
        style={{ color: '#72c6d5', marginLeft: '20px' }}
      >
        Sign In
      </h6>
      <div className="login__form">
        <Form>
          <Form.Item>
            <label
              style={{ fontSize: 20, fontWeight: '700', color: '#72c6d5' }}
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
              style={{ fontSize: 20, fontWeight: '700', color: '#72c6d5' }}
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
                border: '2px solid #72c6d5',
                paddingBottom: '4px',
                lineHeight: '14px',
                fontSize: '20px',
                backgroundColor: '#72c6d5',
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
                  color: '#72c6d5',
                  textDecoration: 'underline',
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                }}
              >
                Forgot Password?
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
                border: '2px solid #72c6d5',
                paddingTop: '4px',
                paddingBottom: '4px',
                lineHeight: '14px',
                backgroundColor: '#72c6d5',
                color: '#fff',
              }}
            >
              CREATE AN ACCOUNT
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
