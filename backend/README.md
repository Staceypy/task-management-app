

# Backend

In the back end, I created a server using Express and stored the data in MySQL.

| achieved functions             | missing functions               |
| ------------------------------ | ------------------------------- |
| register and login             | validate the email and password |
| add a new task and delete APIs | update and get APIs             |
|                                |                                 |

to run backend,

```
cd backend
npm run watch
```

## API DESIGN

| Oper   |      | PATH                       | body of request                                   | description                                                 |
| ------ | ---- | -------------------------- | ------------------------------------------------- | ----------------------------------------------------------- |
| POST   |      | /register                  | { email: text, password: text}                    | user register with email and password                       |
| POST   |      | /login                     | { email: text, password: text}                    | user login with email and password                          |
| GET    |      | /tasks/<user_id>           | None                                              | view a list of all their tasks.                             |
| POST   |      | /tasks/<user_id>           | { title: titleText, description: descriptionText} | create a new task with a title and description              |
| UPDATE |      | /tasks/<user_id>/<task_id> | { title: titleText, description: descriptionText} | update the title and description of the task with <task_id> |
| DELETE |      | /tasks/<user_id>/<task_id> | None                                              | delete a task                                               |

# Frontend

In the front end, I plan to a React application with user authentication and task management features. I will use React Hooks and Axios for state management and API interaction.

To run front end,

```
cd client
(npm intall) for the first run
npm start
```

