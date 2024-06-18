import React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Image, Col, Row, message } from "antd";
import axios from "axios";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    axios({
      method: "post",
      url: "http://localhost:2800/login",
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          message.success("Login successful!");
          sessionStorage.setItem("user", res.data.user.id);

          // console.log(`Object ${res.data}`);
          console.log(res.data.user.id);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          message.info("Icorrect email or password. Please try again.");
          console.log(res.data);
        }
      })
      .catch(() => {
        console.log("Something went wrong. Plase try again later");
      });
  };

  return (
    <div className="login" style={{ padding: 50 }}>
      <Row>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "100%" }}
          lg={{ flex: "100%" }}
          xl={{ flex: "100%" }}
        >
          <Form
            name="normal_login"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email address!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
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
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <div className="register" style={{ marginTop: "20px" }}>
                <p style={{ display: "inline" }}>
                  Don't have an account? <a href="/register">Register</a>
                </p>
              </div>
            </Form.Item>
          </Form>
        </Col>
        {/* <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "50%" }}
          md={{ flex: "40%" }}
          lg={{ flex: "40%" }}
          xl={{ flex: "40%" }}
        >
          <Image
            src="..\cat.jpg"
            alt="login form"
            style={{ borderRadius: "1rem 0 0 1rem" }}
          ></Image>
        </Col> */}
      </Row>

      {/* <Flex gap="large" align="center">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email address!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <div className="register" style={{ marginTop: "20px" }}>
              <p style={{ display: "inline" }}>
                Don't have an account? <a href="/register">Register</a>
              </p>
            </div>
          </Form.Item>
        </Form>
        <Card hoverable style={{ width: 500 }}>
          <Image
            src="..\cat.jpg"
            alt="login form"
            style={{ borderRadius: "1rem 0 0 1rem" }}
          ></Image>
        </Card>
      </Flex> */}
    </div>
  );
};
