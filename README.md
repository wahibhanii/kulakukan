# [Kulakukan](http:/kulakukan.wahibhanii.xyz)

A to do list application  
visit
[kulakukan.wahibhanii.xyz](http:/kulakukan.wahibhanii.xyz)
____________________
## App Usage 

### Login Logout
  - facebook login
  - regular signup using email
  - regular login  

to access this feature, simply click icon button on the right end of the toolbar


### To-do-list Scheme
```
User
 |-- Category 1
 |    `--List 1
 |         |-- Task 1
 |         `-- Task 2
 |
 |-- Category 2
 |    `-- List 2
 |        |-- Task 3
 |        `-- Task 4
 |
 |-- Category 3
 |
 ...
```

Open left drawer (left end icon button on toolbar) to use to-do-list features.....

### Using Category
category used to contain lists of tasks, these are available features 
1. create category
2. delete category

-  click category name to show lists under the category

### Using List
category used to contain tasks, these are available features 
1. create list
2. delete list

Click list name on left drawer to show taks under the list

### Using Task 
Task is a to-do list item, tasks have these features
1. create task
2. delete task
3. edit task caption
4. mark task as complete
5. mark task uncomplete

-------
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









Access the website via [kulakukan.wahibhanii.xyz](http:/kulakukan.wahibhanii.xyz) or API via `http://35.186.166.229`