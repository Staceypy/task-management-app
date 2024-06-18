import { useEffect, useState } from "react";
import { Button, List, Skeleton, Popover } from "antd";
import axios from "axios";

interface DataType {
  id: number;
  title: string;
  description: string;
  loading: boolean;
}

const count = 3;

interface TaskListProps {
  userId: number;
}

export const TaskList = (props: TaskListProps) => {
  const { userId } = props;
  const apiUrl = "http://localhost:2800/tasks/" + userId;
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
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
  }, []);

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
        <Button type="primary" href={`/tasks/new/${userId}`}>
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
              <a href={`/tasks/edit/${userId}/${item.id}`} key="task-edit">
                edit
              </a>,
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
    </div>
  );
};

export default TaskList;
