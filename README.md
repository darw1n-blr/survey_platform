# Survey Platform

A survey platform built with NestJS, PostgreSQL, and Redis. The platform allows users to create surveys with multiple questions and answer choices, enabling effective data collection and analysis.

## Features

- **User Registration and Authentication**: Users can register and log in securely using JWT.
- **Survey Creation**: Create surveys with multiple questions.
- **Answer Choices**: Each question can have multiple answer choices.
- **Response Tracking**: Store user responses for each survey taken.
- **Data Storage**: Utilize PostgreSQL for data storage and Redis for caching.

## Technologies Used

- **Backend**: NestJS
- **Database**: PostgreSQL
- **Caching**: Redis
- **ORM**: Sequelize
- **Validation**: Class-validator


## API Documentation

### Authentication

- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Login an existing user

### Users

- **GET** `/users` - Retrieve all users
- **GET** `/users/:id` - Retrieve user by ID
- **PUT** `/users/:id` - Update user details
- **DELETE** `/users/:id` - Delete a user

### Surveys

- **GET** `/surveys` - Retrieve all surveys
- **POST** `/surveys` - Create a new survey
- **GET** `/surveys/:id` - Retrieve survey by ID
- **PUT** `/surveys/:id` - Update survey details
- **DELETE** `/surveys/:id` - Delete a survey

### Survey Responses

- **POST** `/response/question` - Create a new question
- **POST** `/response/choice` - Create a new answer choice
- **POST** `/response/answer` - Add a new answer to a question
- **POST** `/response` - Submit a new survey response
- **GET** `/response/choices/:id` - Retrieve answer choices for a specific question by question ID
- **GET** `/response/questions/:id` - Retrieve questions for a specific survey by survey ID
- **GET** `/response/answers/:id` - Retrieve answers for a specific survey response by response ID
- **GET** `/response/users/:id` - Get users who participated in a specific survey by survey ID
- **GET** `/response/surveys/:id` - Get surveys associated with a specific user by user ID
- **GET** `/response/users-amount/:id` - Get the number of users who participated in a specific survey by survey ID
