# To-Do Application

This project consists of two distinct components: a Node+Express backend API with MongoDB, and a React+Vite frontend application that consumes it. Below are the minimal setup instructions needed to run everything smoothly in a standard environment.

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/docs/manual/installation/) installed and running locally on standard port `27017`

---

## 1. Backend Setup

The backend handles the core authentication mapping and data layer API.

1. **Navigate to the server directory**
   ```bash
   cd Backend
   ```

2. **Install project dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   A `.env` file should be located at the root of the `Backend/` directory, containing the following properties (change if necessary):
   ```env
   PORT=4500
   MONGODB_URI=mongodb://localhost:27017/todo_manager
   SECRET_KEY=user_secret_key
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```
   *You should see a log message confirming your database is successfully connected.*

---

## 2. Frontend Setup

The frontend consumes the Todo endpoints mapped alongside `user` tokens from `Backend`.

1. **Navigate to the frontend directory**
   Open a brand new terminal instance to keep the backend running side-by-side, then enter:
   ```bash
   cd Frontend
   ```

2. **Install necessary dependencies**
   ```bash
   npm install
   ```

3. **Run the Vite development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Observe the terminal output for the local machine address (commonly `http://localhost:5173`). Visit that URL in your browser to interact with the frontend.
