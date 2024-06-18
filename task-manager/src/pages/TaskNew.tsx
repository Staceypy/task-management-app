import { Button, Form, Input, Row, Col, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface Task {
  title: string;
  description: string;
}

export const TaskNew = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const onFinish = (n: any) => {
    axios({
      method: "post",
      url: "http://localhost:2800/tasks/" + userId,
      data: {
        title: n.title,
        description: n.description,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          message.success("Task Added");
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
      <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
        <Row>
          <Col span={24}>
            <h2></h2> {/* Replace with your heading content */}
          </Col>
          <Col span={24}>
            <Form
              layout="vertical"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
            >
              <Form.Item name={"title"} label="Task Name">
                <Input.TextArea placeholder="enter task name" />
              </Form.Item>

              <Form.Item label="Enter Description" name="description">
                <Input.TextArea placeholder="enter more details about the task" />
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

export default TaskNew;
