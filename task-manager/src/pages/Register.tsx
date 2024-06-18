import { useNavigate } from "react-router-dom";
import { Form, Checkbox, Input, Button, message } from "antd";
import axios from "axios";
import React from "react";

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const Register = () => {
  const navigate = useNavigate();

  const onFinish = (n: any) => {
    axios({
      method: "post",
      url: "http://localhost:2800/register",
      data: {
        email: n.email,
        password: n.password,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          message.success("successfully registered!");
          console.log(res.data);
          // wait for 2 seconds before redirecting to login page
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          message.info("User already exists");
          console.log(res.data);
        }
      })
      .catch(() => {
        console.log("Something went wrong. Plase try again later.");
      });
  };

  return (
    <div className="register">
      <Form
        name="normal_register"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        className="register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {/* email */}
        <Form.Item
          name="email"
          label="email"
          rules={[{ required: true, message: "Please input email address" }]}
        >
          <Input
            placeholder="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        {/* password */}
        <Form.Item
          name="password"
          label="password"
          rules={[{ required: true, message: "Please input password" }]}
          hasFeedback
        >
          <Input.Password
            placeholder="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        {/* reenter password */}
        <Form.Item
          name="confirm1"
          label="confirm password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Please enter again your password" />
        </Form.Item>

        {/* agreement */}
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <span>agreement</span>
          </Checkbox>
        </Form.Item>

        {/* button */}
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
