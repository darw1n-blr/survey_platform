# Survey API Backend

This repository contains the backend for the Survey Application. The backend is built using **NestJS** and connects to a **PostgreSQL** database to manage users, surveys, questions, and responses.

## Features

- **User Authentication**: Register and log in using JWT.
- **Survey Management**: Create, read, update, and delete surveys, questions, and answer choices.
- **Answer Submission**: Users can submit their responses to surveys.
- **Dynamic Data Fetching**: Endpoints to fetch surveys, questions, and results.

## Technologies Used

- **Backend**: NestJS
- **Database**: PostgreSQL (via Sequelize ORM)
- **Authentication**: JWT (JSON Web Token)

## API Endpoints

### Authentication
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Log in and receive a JWT.

### Surveys
- **GET /surveys**: Get a list of all surveys.
- **GET /surveys/:id/questions**: Get all questions for a specific survey.

### Responses
- **POST /response**: Submit answers to a survey.
- **POST /response/answer**: Submit a specific answer for a question.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** (or any other SQL database compatible with Sequelize)
- **Git**