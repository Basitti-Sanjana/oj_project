# OnlineJudge

OnlineJudge is a robust platform designed for coding enthusiasts and competitive programmers. It provides a seamless experience for solving coding problems, compiling solutions in multiple programming languages, and managing questions effectively. With its powerful compiler supporting languages like Java, Python, C++, and more, OnlineJudge empowers users to practice and enhance their programming skills.

## Features

- **User Authentication**: Secure login and registration for users.
- **Multi-Language Compiler**: Supports popular programming languages like Java, Python, C++, and others.
- **Create and Manage Questions**: Easily create, update, and manage coding problems.
- **Real-Time Code Execution**: Compile and run code with instant feedback.
- **Responsive UI**: Optimized for devices of all screen sizes.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Compiler**: Custom implementation for multi-language support
- **Authentication**: JSON Web Tokens (JWT)

## Screenshots

### OnlineJudge Login
![image alt](https://github.com/Basitti-Sanjana/oj_project/blob/7d2518736c0e59fcdc470b4bcb25c06d1992463c/OnlineJudgeLogin.png)

### OnlineJudge Signup
![image alt](https://github.com/Basitti-Sanjana/oj_project/blob/7d2518736c0e59fcdc470b4bcb25c06d1992463c/OnlineJudgeSignUp.png)

### OnlineJudge Questions
![image alt](https://github.com/Basitti-Sanjana/oj_project/blob/7d2518736c0e59fcdc470b4bcb25c06d1992463c/OnlineJudge_Questions.png)

### OnlineJudge New Question
![image alt](https://github.com/Basitti-Sanjana/oj_project/blob/7d2518736c0e59fcdc470b4bcb25c06d1992463c/OnlineJudge_CreateNewQuestion.png)

## Installation and Setup

Follow these steps to set up the project on your local machine:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community)
- A package manager (npm or yarn)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Basitti-Sanjana/OnlineJudge.git
   cd OnlineJudge
   ```

2. **Install dependencies**:

   Navigate to the root directory and install backend dependencies:

   ```bash
   npm install
   ```

   Then navigate to the `client` folder and install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the application**:

   - To start the backend:

     ```bash
     npm start
     ```

   - To start the frontend:

     ```bash
     cd client
     npm start
     ```

   The app will be accessible at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

## How to Use

1. **Sign Up or Log In**:
   - Navigate to the login or signup page.
   - Create an account or log in with your credentials.

2. **Browse Questions**:
   - View all available coding problems on the Questions page.
   - Select a question to view its details and solve it.

3. **Submit Solutions**:
   - Write your code in the editor provided.
   - Select your preferred programming language.
   - Click "Run" or "Submit" to compile and test your solution.

4. **Create New Questions**:
   - Navigate to the "New Question" section.
   - Add question details like title, description, input format, and expected output.
   - Save the question for others to solve.

5. **Log Out**:
   - Click the "Log Out" button to securely end your session.

## Folder Structure

```
OnlineJudge
├── client          # Frontend code
│   ├── public      # Static files
│   └── src         # React components and assets
├── server          # Backend code
│   ├── models      # MongoDB models
│   ├── routes      # Express routes
│   └── controllers # Logic for route handling
├── .env.example    # Example environment file
├── package.json    # Backend dependencies
└── README.md       # Project documentation
```

## Features in Progress

- Leaderboard for tracking user performance.
- Enhanced test case management for questions.
- Integration with external coding APIs.
- Dark mode support.


