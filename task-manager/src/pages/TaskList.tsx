import { useEffect, useState } from "react";
import {
  Button,
  List,
  Skeleton,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
} from "antd";
import type { PopconfirmProps } from "antd";
import axios from "axios";

interface DataType {
  id: number;
  title: string;
  description: string;
  loading: boolean;
}

interface TaskListProps {
  userId: number;
}

export const TaskList = (props: TaskListProps) => {
  const { userId } = props;
  const apiUrl = "http://localhost:2800/tasks/" + userId;
  const [list, setList] = useState<DataType[]>([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState<DataType | null>(null);
  const [editForm] = Form.useForm();
  const [newTaskForm] = Form.useForm();

  const fetchTasks = () => {
    axios({
      method: "get",
      url: apiUrl,
    }).then(
      (response) => {
        console.log(response.data);
        setList(response.data);
        return response.data;
      },
      (error) => {
        console.log("error", error.message);
      }
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const showEditModal = (item: DataType) => {
    setCurrentTask(item);
    setIsEditModalVisible(true);
    editForm.setFieldsValue({
      title: item.title,
      description: item.description,
    });
  };

  const showNewTaskModal = () => {
    setIsNewTaskModalVisible(true);
    newTaskForm.resetFields();
  };

  const handleEditOk = () => {
    editForm.submit();
  };

  const handleNewTaskOk = () => {
    newTaskForm.submit();
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsNewTaskModalVisible(false);
  };

  const handleDelete = (taskId: number) => {
    axios({
      method: "delete",
      url: `http://localhost:2800/tasks/${userId}/${taskId}`,
    })
      .then((res) => {
        if (res.status === 200) {
          message.success("Task Deleted");
          fetchTasks(); // Fetch updated tasks after deletion
        } else {
          message.error("Task not deleted. Please try again.");
        }
      })
      .catch(() => {
        message.error("Something went wrong. Please try again later.");
      });
  };

  const onEditFinish = (values: any) => {
    if (currentTask) {
      axios({
        method: "put",
        url: `http://localhost:2800/tasks/${userId}/${currentTask.id}`,
        data: {
          title: values.title,
          description: values.description,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            message.success("Task Updated");
            setIsEditModalVisible(false);
            // 更新任务列表中的任务
            setList((prevList) =>
              prevList.map((task) =>
                task.id === currentTask.id
                  ? {
                      ...task,
                      title: values.title,
                      description: values.description,
                    }
                  : task
              )
            );
          } else {
            message.error("Task not updated. Please try again.");
          }
        })
        .catch(() => {
          message.error("Something went wrong. Please try again later.");
        });
    }
  };

  const onNewTaskFinish = (values: any) => {
    axios({
      method: "post",
      url: "http://localhost:2800/tasks/" + userId,
      data: {
        title: values.title,
        description: values.description,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          message.success("Task Added");
          setIsNewTaskModalVisible(false);
          // 将新任务添加到任务列表中
          setList((prevList) => [...prevList, res.data]);
          fetchTasks();
        } else {
          message.error("Task not added. Please try again.");
        }
      })
      .catch(() => {
        message.error("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="container">
      <div
        className="add-new-task"
        style={{
          margin: "10px auto",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button type="primary" onClick={showNewTaskModal}>
          Add New Task
        </Button>
      </div>

      <List
        className="task-list"
        itemLayout="horizontal"
        dataSource={list}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              // <a onClick={() => showEditModal(item)} key="task-edit">
              //   edit
              // </a>,
              <Button type="text" onClick={() => showEditModal(item)}>
                edit
              </Button>,
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => handleDelete(item.id)}
                okText="Yes"
                cancelText="No"
                key="task-delete"
              >
                <Button type="text" danger>
                  delete
                </Button>
              </Popconfirm>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                title={item.title}
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        )}
      />

      <Modal
        title="Edit Task"
        open={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleCancel}
        okText="Save"
      >
        {currentTask && (
          <Form layout="vertical" form={editForm} onFinish={onEditFinish}>
            <Form.Item
              name="title"
              label="New Task Name"
              rules={[
                { required: true, message: "Please input the task title!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="description"
              label="New Description"
              rules={[
                {
                  required: true,
                  message: "Please input the task description!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Modal
        title="Add New Task"
        open={isNewTaskModalVisible}
        onOk={handleNewTaskOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <Form layout="vertical" form={newTaskForm} onFinish={onNewTaskFinish}>
          <Form.Item
            name="title"
            label="Task Name"
            rules={[
              { required: true, message: "Please input the task title!" },
            ]}
          >
            <Input.TextArea placeholder="enter task name" />
          </Form.Item>

          <Form.Item
            label="Enter Description"
            name="description"
            rules={[
              { required: true, message: "Please input the task description!" },
            ]}
          >
            <Input.TextArea placeholder="enter more details about the task" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskList;
