
# Simple Task Management System

## Description

a RESTful API for a simple task management system.

## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Schema](#schema)
- [Endpoints](#endpoints)
- [Websockets](#websockets)

## Installation

- Environment Variables
1. Edit the content of the .env.sample at the root of the app with the details of your environment.
2. Rename the .env.sample to .env at the rot of the folder.

```
DB_URL = mongodb://localhost:27017/simple-task // url for database
TOKEN_SECRET = TheSecretToMyApp //app secrets jor jwt token
EXPIRES_IN = 2000000 // expire time for json web token
```

- Open your terminal at the root of the folder to install the dependencies for the application
```bash
$ npm install
```

## Running the app

```bash
# development and watch mode
$ npm run start:dev


# production mode
$ npm run start
```


## Schema

- User Schema
```
{

  name: string; // required: true
  password: string; // required: true
  email: string; // unique, required
  role: string; // role - USER, ADMIN
}
```


- Task Schema
```
{
  name: string; // required
  due: Date; // required, default is 7 days after creation;
  assignedBy: User; //  required
  assignedTo: User; // optional
  priority: number; // required, default is 1
  description: string; // required;
  status: string; //Enum of values (TODO, IN_PROGRESS, DONE);
}
```

### User
- Users can register on the platform with the below fields in the json below and comments explained the details needed for each field
```
{
    "name": "Bolaji Basia", //  Name(s) of User
    "email": "jasolajohn@gmail.com",  // Email address of user
    "password": "password" // Password of user
}
```
### Task

```
{
    "name": "UPS", // name of the task 
    "status": "TODO" , // status of the task, its an enum within TODO, IN_PROGRESS, DONE
    "description": "Kindly turn of the ups and start it again to understand what we are going through", // details of the task
    "due": "2024-06-12T05:00:10.711Z" //due date of the task, by default it is 7 days after it was created
}
```


## Endpoints

- By default the project is running on http://localhost:6000

### AUTH /api - unprotected route

```
POST /api/auth/register  - Create a new user
{
    "name": "Bolaji Basia", //  Name(s) of User
    "email": "jasolajohn@gmail.com",  // Email address of user
    "password": "password" // Password of user
}

```


```
POST /api/auth/login - Users to login and obtain a JSON web token to be used as Authorization header on protected routes
{
  "email": "jasolajohn@gmail.com",
  "password": "password"
}

```

### Users /api/users - Protected Routes
#### The Header must have an Authorization header with Bearer and the jwt token, if not it will return 

```
{
  statusCode: 401,
  message: 'Unauthorized'
}
```

```
GET /api/users - It returns all users on the platform with an array of users displaying their name, email and role
{
    "path": "/api/users",
    "method": "GET",
    "statusCode": 200,
    "message": "success",
    "data": [
        {
            "_id": "664524741ed0538c20fe0841",
            "name": "Jasola Bryan",
            "email": "jasolabryan@gmail.com",
            "role": "USER"
        },
        {
            "_id": "664524742ed0538c20fe0842",
            "name": "John Etiebet",
            "email": "johnetiebet@gmail.com",
            "role": "USER"
        }
    ]
}

```
GET /api/users/:userId - It returns the specified user with the userId as the parameter from the endpoint.

```
{
    "path": "/api/users/664524741ed0538c20fe0841",
    "method": "GET",
    "statusCode": 200,
    "message": "success",
    "data": 
        {
            "_id": "664524741ed0538c20fe0841",
            "name": "Jasola Bryan",
            "email": "jasolabryan@gmail.com",
            "role": "USER"
        },

}
```

PATCH /api/users/:userId - User can only change their name as specified if they are logged in with their account

```
{
  name: "John Bosco
}
```

```
{
    "path": "/api/users/664524741ed0538c20fe0841",
    "method": "PATCH",
    "statusCode": 200,
    "message": "success",
    "data": {
        "_id": "664b0dac61f57c432cb97fde",
        "name": "John Bosco",
        "email": "jasolabryan@gmail.com",
        "role": "USER",
        "createdAt": "2024-05-20T08:45:32.398Z",
        "updatedAt": "2024-05-20T08:59:31.966Z",
        "__v": 0
    }
}
```




### Task - /api/tasks - Protected routes
#### The Header must have an Authorization header with Bearer and the jwt token, if not it will return 

```
{
  statusCode: 401,
  message: 'Unauthorized'
}
```



```
GET /api/tasks - It returns all tasks on the platform with an array of tasks displaying their name, email and role

{
    "path": "/api/tasks",
    "method": "GET",
    "statusCode": 200,
    "message": "success",
    "data": [
        {
            "_id": "664a004d25d6cc7078b8f145",
            "name": "A sticky Navbar",
            "due": "2024-05-31T05:00:10.711Z",
            "assignedBy": {
                "_id": "664524741ed0538c20fe0841",
                "name": "John Adeniran",
                "email": "jasolajohn@gmail.com",
                "role": "USER"
            },
            "priority": 4,
            "description": "Lets have a sticky navbar at the top of our website",
            "status": "TODO",
            "createdAt": "2024-05-19T13:36:13.307Z",
            "updatedAt": "2024-05-19T13:36:13.307Z",
            "__v": 0
        }
    ]
}

```
GET /api/tasks/:taskId - It returns the specified task with the taskId as the parameter from the endpoint.

```
{
    "path": "/api/tasks/664990270b1525b220d868b4",
    "method": "GET",
    "statusCode": 200,
    "message": "success",
    "data": {
        "_id": "664990270b1525b220d868b4",
        "name": "Check the inverter",
        "assignedBy": "664524741ed0538c20fe0841",
        "assignedTo": null,
        "priority": 5,
        "description": "There is a long beep after putting on the server",
        "status": "TODO",
        "due": "2024-05-26T05:37:43.228Z",
        "createdAt": "2024-05-19T05:37:43.233Z",
        "updatedAt": "2024-05-19T05:37:43.233Z",
        "__v": 0
    }
}
```

```
PATCH /api/tasks/:taskId - Updates can update status of task with with assigned task to user

```
{
  status: "IN_PROGRESS"
}



```
{
    "path": "/api/tasks/664990270b1525b220d868b4",
    "method": "PATCH",
    "statusCode": 200,
    "message": "success",
    "data": {
        "_id": "664990270b1525b220d868b4",
        "name": "Check the inverter",
        "assignedBy": "assignedBy": {
            "_id": "664524741ed0538c20fe0841",
            "name": "John Adeniran",
            "email": "jasolajohn@gmail.com",
            "role": "USER"
        },
        "priority": 5,
        "description": "There is a long beep after putting on the server",
        "status": "IN_PROGRESS",
        "due": "2024-05-26T05:37:43.228Z",
        "createdAt": "2024-05-19T05:37:43.233Z",
        "updatedAt": "2024-05-20T09:30:45.312Z",
        "__v": 0
    }
}
```


DELETE /api/tasks/:taskId - Delete task with specified id in params


```
{
    "path": "/api/tasks/664990270b1525b220d868b4",
    "method": "DELETE",
    "statusCode": 200,
    "message": "success",
    "data": {
        "acknowledged": true,
        "deletedCount": 1
    }
}

```

## Websockets


