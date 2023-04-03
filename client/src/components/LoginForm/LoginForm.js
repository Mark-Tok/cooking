import { Button, Form, Input, Row, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchToken, selectError, resetError } from "model";
import { useEffect } from "react";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const onFinish = (values) => {
    const { username, password } = values;
    dispatch(fetchToken({ userName: username, password }));
  };

  useEffect(() => {
    if (!!error) {
      Modal.error({
        title: "Ошибка",
        content: error,
        onOk: () => {
          dispatch(resetError());
        },
      });
    }
  }, [error]);
  return (
    <Row justify={"center"} align={"middle"}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          labelAlign=""
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};
