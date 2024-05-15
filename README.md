# Node.js Task Management API 

This is a simple RESTful API built with Node.js and Express.js for managing tasks. MongoDB is used as the database for storing task data, and Redis is used for caching to improve performance.

## Features

- CRUD operations for tasks (Create, Read, Update, Delete)
- Retrieve tasks by priority and status
- Redis caching for improved performance

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone this repository:
git clone <repository-url>

2. Navigate to the project directory:

cd <project-directory>

3. Install dependencies:

npm install


4. Start the application:

npm start

## Usage

- The API runs on http://localhost:3000 by default.
- Use tools like Postman or cURL to interact with the API endpoints.
- Available endpoints:
- `POST /tasks`: Create a new task.
- `GET /tasks`: Retrieve all tasks.
- `GET /tasks/:id`: Retrieve a task by its ID.
- `PUT /tasks/:id`: Update a task by its ID.
- `DELETE /tasks/:id`: Delete a task by its ID.
- `GET /tasks/priority/:priority`: Retrieve tasks by priority level.
- `GET /tasks/status/:status`: Retrieve tasks by status.

## Configuration

- MongoDB connection URI: `mongodb://localhost:27017/taskDB`

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
