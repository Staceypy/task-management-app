

# Overview

A fully-functional task app that supports user registration, login, and task management, including adding and updating tasks.

Built with Node.js, React, and TypeScript, the app delivers a user-friendly experience.

A 1-minute demo of the app can be found in the following video link: https://drive.google.com/file/d/1dO39uAilbhxEFn0y99btX8U0YnnsK20z/view?usp=sharing

# Backend

The backend server runs through Express and MySQL, listening on port 2800. 

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
| GET    |      | /tasks/<user_id>/<task_id> | None                                              | get one certain task of the user                            |
| POST   |      | /tasks/<user_id>           | { title: titleText, description: descriptionText} | create a new task with a title and description              |
| UPDATE |      | /tasks/<user_id>/<task_id> | { title: titleText, description: descriptionText} | update the title and description of the task with <task_id> |
| DELETE |      | /tasks/<user_id>/<task_id> | None                                              | delete a task                                               |

# Frontend

Frontend app was based on React and using Ant Design UI library. 

To run front end,

```
cd task-manager
(npm intall) for the first run
npm start
```

- For login (authentication), currently use session storage to keep user logged in. 
