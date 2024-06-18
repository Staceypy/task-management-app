

# Overview

I've developed a fully functional app that delivers on all your requirements. While time constraints may have limited some detailed considerations, I've adhered to best practices and implemented responsive web design principles.

Built with Node.js, React, and TypeScript, the app delivers a user-friendly experience.

A 1-minute demo of the app can be found in the following video link: https://drive.google.com/file/d/1dO39uAilbhxEFn0y99btX8U0YnnsK20z/view?usp=sharing

# Backend

In the backend, I developed a server using Express and MySQL, listening on port 2800. All required APIs have been tested and are functioning properly.

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

My App was based on Ant Design UI library. I didn't do much UI design and advancement.

To run front end,

```
cd task-manager
(npm intall) for the first run
npm start
```

- For login (authentication), I currently use session storage to keep user logged in. A more robust approach would be to  use JWT.
- For register, some validation is implemented, but validating the given format of email and password is missing.
- Adding a new task, update a task and view tasks are implemented and tested.
