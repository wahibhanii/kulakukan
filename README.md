# kulakukan
A to do list application

## To-do-list Scheme
```
User
 |__ Category 1
 |    |__ List 1
 |        |__ Task 1
 |        |__ Task 2
 |
 |__ Category 2
 |    |__ List 2
 |        |__ Task 3
 |        |__ Task 4
 |
 |__ Category 3
 |
 ...

```

## Users API
### List of Users API endpoint:
| Route                     | HTTP   | Description                         | 
| ------------------------- |:------ | ----------------------------------- |
| `/api/users/login`        | POST   | Regular Login, returns access token |
| `/api/users/id`           | GET    | Find one user                       |
| `/api/users/`             | POST   | Create new User / Signup            |
| `/api/users/:id`          | DELETE | Delete User                         |
| `/api/users/:id/addcat`   | PUT    | Add new Category to the User        |
| `/api/users/:id/removecat`| PUT    | Remove Category from the User       |
| `/api/users/:id/rename`   | PUT    | Rename User                         |

### Endpoint Usage
- POST : `/api/users/login` 
- GET : `/api/users/` 
- POST : `/api/users/` 
- DELETE : `/api/users/:id`  
- PUT : `/api/users/:id/addcat`
- PUT : `/api/users/:id/removecat`
- PUT : `/api/users/:id/rename`

## Categories API
### List of Categories API endpoint:
| Route                           | HTTP   | Description                         | 
| ------------------------------- |:------ | ----------------------------------- |
| `/api/categories/id`            | GET    | Find one category                   |
| `/api/categories/`              | POST   | Create new category                 |
| `/api/categories/:id`           | DELETE | Delete a category                   |
| `/api/categories/:id/addlist`   | PUT    | Add new list to the category        |
| `/api/categories/:id/removelist`| PUT    | Remove list from the category       |
| `/api/categories/:id/rename`    | PUT    | Rename category                     |

### Endpoint Usage
- GET : `/api/categories/` 
- POST : `/api/categories/` 
- DELETE : `/api/categories/:id`  
- PUT : `/api/categories/:id/addcat`
- PUT : `/api/categories/:id/removecat`
- PUT : `/api/categories/:id/rename`

## Task-List API
### List of Task-List API endpoint:
| Route                      | HTTP   | Description               | 
| -------------------------- |:------ | ------------------------- |
| `/api/lists/id`            | GET    | Find one list             |
| `/api/lists/`              | POST   | Create new list           |
| `/api/lists/:id`           | DELETE | Delete a list             |
| `/api/lists/:id/addtask`   | PUT    | Add new task to the list  |
| `/api/lists/:id/removetask`| PUT    | Remove task from the list |
| `/api/lists/:id/rename`    | PUT    | Rename list               |

### Endpoint Usage
- GET : `/api/lists/` 
- POST : `/api/lists/` 
- DELETE : `/api/lists/:id`  
- PUT : `/api/lists/:id/addcat`
- PUT : `/api/lists/:id/removecat`
- PUT : `/api/lists/:id/rename`

## Task API
### List of Task API endpoint:
| Route                       | HTTP   | Description                       | 
| --------------------------- |:------ | --------------------------------- |
| `/api/tasks/id`             | GET    | Find one task                     |
| `/api/tasks/`               | POST   | Create new task                   |
| `/api/tasks/:id`            | DELETE | Delete a task                     |
| `/api/tasks/:id/editdesc`   | PUT    | Edit description field on a tasks |
| `/api/tasks/:id/edittags`   | PUT    | Edit tags field on a tasks        |
| `/api/tasks/:id/complete`   | PUT    | Mark task as complete             |
| `/api/tasks/:id/uncomplete` | PUT    | Mark task as outstanding          |

### Endpoint Usage
- GET : `/api/tasks/` 
- POST : `/api/tasks/` 
- DELETE : `/api/tasks/:id`  
- PUT : `/api/tasks/:id/editdesc`
- PUT : `/api/tasks/:id/edittags`
- PUT : `/api/tasks/:id/complete`
- PUT : `/api/tasks/:id/uncomplete`









Access the website via `http://localhost:3000` or API via `http://localhost:3000/api`