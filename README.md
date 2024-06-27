```markdown
# Sitemate Challenge

This is a simple client-server application built as a challenge. The server is built with Node.js and Express, and uses a local JSON file (`issues.json`) for persistent storage. The client is built with React. I wanted to include a MongoDB database but never had the time.

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)

## Setup Instructions

### Server Setup

1. **Navigate to the server directory:**

   ```bash
   cd sitemate-backend-challenge/server
   ```

2. **Install server dependencies:**

   ```bash
   npm install
   ```

3. **Start the server:**

   ```bash
   npm run server
   ```

   The server should now be running on `http://localhost:3001`.

### Client Setup

1. **Navigate to the client directory:**

   ```bash
   cd ../client
   ```

2. **Install client dependencies:**

   ```bash
   npm install
   ```

3. **Start the client:**

   ```bash
   npm start
   ```

   The client should now be running on `http://localhost:3000`.

## API Endpoints

### Server Endpoints

- `GET /issues`: Retrieve all issues.
- `POST /issues`: Create a new issue. Expects a JSON object with `title` and `description`.
- `PUT /issues/:id`: Update an issue by ID. Expects a JSON object with `title` and `description`.
- `DELETE /issues/:id`: Delete an issue by ID.

## Running Tests

### Server Tests

1. **Navigate to the server directory:**

   ```bash
   cd ../server
   ```

2. **Run server tests:**

   ```bash
   npm test
   ```

### Client Tests

1. **Navigate to the client directory:**

   ```bash
   cd ../client
   ```

2. **Run client tests:**

   ```bash
   npm test
   ```

## Project Structure

### Server

- `index.js`: Main server file.
- `issues.json`: File used for storing issues locally.

### Client

- `src/App.js`: Main React component.
- `src/index.js`: Entry point for React application.
- `src/tests/App.test.js`: Tests for the React application.

## Notes

- The server runs on `http://localhost:3001` and the client runs on `http://localhost:3000`.
- Ensure that the `issues.json` file exists in the `server` directory. If it doesn't, create it and initialize it with an empty array `[]`.

## Author

- **Oren Levy**
