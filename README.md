
# Simple Task Management System

## Description

a RESTful API for a simple task management system.

## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [WebSocket Integration](#websocket-integration)
- [Input Validation](#input-validation)
- [Environment Variables](#environment-variables)
- [Documentation](#documentation)
- [Contributing](#contributing)

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
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Data

### User
- Users can register on the platform with the below fields in the json below and comments explained the details needed
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
- The Header must have an Authorization header with Bearer and the jwt token

```
GET /api/users - It returns all users on the platform with an array of users displaying their name, email and role
{

} 
```

```
GET /api/users/:userId - It returns the specified user with the userId as the parameter from the endpoint.
{

}
```

```
PATCH /api/users/:userId - User can change their name as specified if they are logged in with their account
```




### Task - /api/tasks - Protected routes




## License

Nest is [MIT licensed](LICENSE).
