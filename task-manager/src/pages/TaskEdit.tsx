import React, { useEffect, useState } from "react";
import { Button, Form, Input, Row, Col, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface Task {
  title: string;
  description: string;
}

export const TaskEdit = () => {
  const { userId, taskId } = useParams<{ userId: string; taskId: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // get the current task details
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:2800/tasks/" + userId + "/" + taskId,
    }).then(
      (response) => {
        setTitle(response.data[0]?.title);
        setDescription(response.data[0]?.description);
        return response.data;
      },
      (error) => {
        console.log("error", error.message);
      }
    );
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      title: title,
      description: description,
    });
  }, [title, description, form]);

  const onFinish = (n: any) => {
    axios({
      method: "put",
      url: "http://localhost:2800/tasks/" + userId + "/" + taskId,
      data: {
        title: n.title,
        description: n.description,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          message.success("Task Updated");
          console.log(res.data);
          // wait for 2 seconds before redirecting to login page
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          message.error("Task not updated. Please try again.");
          console.log(res.data);
        }
      })
      .catch(() => {
        console.log("Something went wrong. Plase try again later.");
      });
  };

  return (
    <div className="container">
      <div className="container-inside">
        <Row>
          <Col span={24}></Col>
          <Col span={24}>
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
            >
              <Form.Item name={"title"} label="New Task Name">
                <Input.TextArea />
              </Form.Item>

              <Form.Item name="description" label="New Description">
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="task-edit-form-button"
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TaskEdit;
