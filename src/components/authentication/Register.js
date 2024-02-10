import React, { useEffect, useState } from 'react';
import { useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Layout, Form, Input, Button } from 'antd';
import { REGISTER } from '../../graphql/mutations/userMutations';
import { setItem } from '../../utils/localStore';
import { useAuthContext } from '../../hooks/useAuthContext';

const { Content } = Layout;

const Register = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [registerUser, { data, loading, error }] = useMutation(REGISTER);
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleRegister = async (values) => {
    // Handle registration logic here
    console.log('Received values:', values);
    registerUser({ variables: values })
    // You can implement your registration logic here
  };

  useEffect(() => {
    if (!error && !loading && data && data.registerUser && data.registerUser.token) {
      console.log("DATAuoo", data.registerUser.token)
      setItem(data.registerUser.token, "auth_token")
      dispatch({type: 'LOGIN', payload: {user: data.registerUser.userData}})
      navigate("/");
    }
  }, [data])
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ width: '400px', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)' }}>
            <Form
              form={form}
              onFinish={handleRegister}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Register</h2>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please input a valid email!' },
                ]}
              >
                <Input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
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
                <Input placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Register;
