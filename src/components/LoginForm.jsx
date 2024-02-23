import { React, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import usersData from "../users.json";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useLoggedInContext } from "../contexts/LoggedInContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { onFinish } = useLoggedInContext();
  console.log(onFinish);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    console.log(event.target.value);
  };

  // spread, destruct, context

  return (
    <div className="login-form">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            style={{ width: "15rem", height: "2.5rem" }}
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            style={{ width: "15rem", height: "2.5rem" }}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            style={{ height: "2.2rem", width: "7rem", marginLeft: "3rem" }}
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginForm;
