import React, { useEffect } from "react";
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone  } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Layout, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN } from "../../graphql/mutations/userMutations";
import { useMutation} from '@apollo/client';
import { setItem } from "../../utils/localStore";
import { useAuthContext } from "../../hooks/useAuthContext";

const { Content } = Layout;

const Login = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
  const [loginUser, { data, loading, error }] = useMutation(LOGIN);

  const handleLogin = (values) => {
    // e.preventDefault();
    // Handle login logic here, such as authentication
    console.log("Values:", values);
    loginUser({ variables: {email: values.email, password: values.password} })
    // You can implement your authentication logic here
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
      dispatch({type: 'LOGIN', payload: {user: data.loginUser.userData}})
      navigate("/");
    }
  }, [data])
console.log("USERFROMLOGIN", user);

  return (
    <Content>
      <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleLogin}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot">
          Forgot password
        </a>
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <Link style={{marginLeft:20}} to="/register">register now!</Link>
      </Form.Item>
    </Form>
    </Row>
    </Content>
  );
};

export default Login;
