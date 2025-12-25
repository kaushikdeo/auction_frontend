import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { REGISTER } from '../../graphql/mutations/userMutations';
import { setItem } from '../../utils/localStore';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Auth.scss';

const Register = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [registerUser, { data, loading, error }] = useMutation(REGISTER);
  const [form] = Form.useForm();
  
  // State for inputs (though form.getFieldsValue() or onFinish handles this cleaner in AntD, preserving original logic)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleRegister = async (values) => {
    console.log('Received values:', values);
    registerUser({ variables: values })
  };

  useEffect(() => {
    if (!error && !loading && data && data.registerUser && data.registerUser.token) {
      console.log("DATAuoo", data.registerUser.token)
      setItem(data.registerUser.token, "auth_token")
      dispatch({ type: 'LOGIN', payload: { user: data.registerUser.userData } })
      navigate("/");
    }
  }, [data])

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="brand-title">Fantasy <span>Hammer</span></h1>
          <p className="brand-subtitle">New Manager Registration</p>
        </div>

        <Form
          form={form}
          onFinish={handleRegister}
          layout="vertical"
          className="auth-form"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please input a valid email!' },
            ]}
          >
            <Input 
              value={email} 
              placeholder="Email Address" 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </Form.Item>
          
          <Form.Item
            name="mobile"
            rules={[{ required: true, message: 'Please input your mobile number!' }]}
          >
            <Input 
              placeholder="Mobile Number" 
              value={mobileNumber} 
              onChange={(e) => setMobileNumber(e.target.value)} 
            />
          </Form.Item>
          
          <div className="register-grid">
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input 
                placeholder="First Name" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
            </Form.Item>
            
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input 
                placeholder="Last Name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              className="auth-button"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        
        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
