import React, { useEffect } from "react";
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN } from "../../graphql/mutations/userMutations";
import { useMutation } from '@apollo/client';
import { setItem } from "../../utils/localStore";
import { useAuthContext } from "../../hooks/useAuthContext";
import './Auth.scss';

const Login = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
  const [loginUser, { data, loading, error }] = useMutation(LOGIN);

  const handleLogin = (values) => {
    console.log("Values:", values);
    loginUser({ variables: { email: values.email, password: values.password } })
  };

  useEffect(() => {
    if (user?.user) {
      navigate("/");
    }
  }, [user])

  useEffect(() => {
    if (!error && !loading && data && data.loginUser && data.loginUser.token) {
      console.log("DATAuoo", data.loginUser.token)
      setItem(data.loginUser.token, "auth_token")
      dispatch({ type: 'LOGIN', payload: { user: data.loginUser.userData } })
      navigate("/");
    }
  }, [data])

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="brand-title">Fantasy <span>Hammer</span></h1>
          <p className="brand-subtitle">Authorized Access Only</p>
        </div>
        
        <Form
          name="normal_login"
          className="auth-form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email Address" 
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="auth-button"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        
        <div className="auth-footer">
          <span>New to the league?</span>
          <Link to="/register">Apply for access</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
