# CodeLedger

CodeLedger is a MERN Stack coding platform inspired by platforms like LeetCode.

I am building this project from scratch to understand backend development and how a real coding platform works instead of simply following tutorials and copying code.

The goal is to understand every feature from first principles, including why a particular package, middleware, database structure or architecture is required.

---

## Goal

The final goal is to build a complete online coding platform where users can:

* Register and login
* Solve coding problems
* Submit code
* Run code against test cases
* See execution results
* Track solved problems
* Participate in contests
* View leaderboards

The project is being developed step by step, starting with the backend.

---

## Current Progress

### Day 1

* Express server setup
* MongoDB connection
* Mongoose setup
* Environment variables
* User schema
* `express.json()`
* `cookie-parser`

### Day 2

* User input validation
* Email validation
* Strong password validation
* Password hashing using bcrypt
* User registration
* User login
* JWT authentication
* Cookie based authentication
* Admin registration
* User authentication middleware
* Admin authentication middleware
* Redis connection
* Logout using Redis token blacklisting

### Day 3

* Problem schema
* Problem difficulty and tags
* Visible test cases
* Hidden test cases
* Starter code for different programming languages
* Reference solutions
* Problem creator relationship with User model
* Problem controller structure
* Problem routes
* Admin protected problem creation route
* Problem update route structure
* Problem delete route structure
* Get problem by ID route structure
* Get all problems route structure
* Get solved problems by user route structure

### Code Submission Setup

* Created submission controller
* Created submission routes
* Added `/submission/submit` endpoint
* Connected submission router with Express server
* Added Axios for communication with an external code execution service
* Started integration with JDoodle Compiler API

The JDoodle execution request is currently being implemented and is not considered completed yet.

---

## Current Features

### Authentication

* User Registration
* User Login
* Admin Registration
* JWT Authentication
* Password Hashing using bcrypt
* Cookie Authentication
* User Authentication Middleware
* Admin Authentication Middleware
* Logout
* Redis Token Blacklisting

### Problem Management

* Problem Schema
* Problem Title
* Problem Description
* Problem Difficulty
* Problem Tags
* Visible Test Cases
* Hidden Test Cases
* Starter Code
* Reference Solutions
* Problem Creator

### Problem Routes

* Create Problem
* Update Problem
* Delete Problem
* Get Problem by ID
* Get All Problems
* Get Solved Problems by User

### Code Submission

* Submission Controller
* Submission Router
* Code submission endpoint
* JDoodle API integration structure

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JWT
* bcrypt
* cookie-parser
* Redis

### Validation

* validator

### External Services

* JDoodle Compiler API

### Other Tools

* Axios
* dotenv
* Postman
* Git
* GitHub

---

## Backend Structure

```text
src/
│
├── config/
│   ├── db.js
│   └── reddis.js
│
├── controllers/
│   ├── problem.js
│   ├── submission.js
│   └── userAuth.js
│
├── middleware/
│   ├── adminMiddleware.js
│   └── userMiddleware.js
│
├── models/
│   ├── problem.js
│   └── user.js
│
├── routes/
│   ├── problem.js
│   ├── submission.js
│   └── userAuth.js
│
├── utils/
│   ├── problemUtility.js
│   └── validator.js
│
└── index.js
```

---

## Current API Structure

### User APIs

```text
POST /user/register
POST /user/login
POST /user/logout
POST /user/admin/register
```

### Problem APIs

```text
POST /problem/create
PATCH /problem/:id
DELETE /problem/:id
GET /problem/:id
GET /problem/
GET /problem/user
```

### Submission APIs

```text
POST /submission/submit
```

---

## How Code Submission Will Work

The planned flow for code execution is:

```text
User
 ↓
Frontend
 ↓
Backend
 ↓
Submission Controller
 ↓
JDoodle Compiler API
 ↓
Code Execution
 ↓
Execution Result
 ↓
Backend
 ↓
Frontend
```

The backend will receive information such as:

* Source code
* Programming language
* Input

The backend will then send the required information to the code execution service and return the execution result to the user.

---

## Database

MongoDB is being used as the primary database.

Currently there are two main models:

### User

Stores information such as:

* First name
* Last name
* Email
* Age
* Role
* Password
* Solved problems

### Problem

Stores information such as:

* Title
* Description
* Difficulty
* Tags
* Visible test cases
* Hidden test cases
* Starter code
* Problem creator
* Reference solutions

---

## Future Features

* Complete Problem CRUD
* Code Execution
* Test Case Evaluation
* Submission History
* Accepted / Wrong Answer Detection
* Runtime and Memory Information
* User Profiles
* Solved Problem Tracking
* Refresh Tokens
* Advanced Authorization
* Online Judge System
* Contest System
* Leaderboards
* Admin Panel
* Frontend using React
* Redux Toolkit
* React Router
* Deployment

---

## Development Approach

I am following a feature-by-feature development approach.

For every feature I try to understand:

1. Why the feature is required
2. What problem it solves
3. How the request flows through the backend
4. How the database is involved
5. Why a particular package or middleware is used
6. How the feature would be implemented in a real production application

The project is intentionally being built slowly so that I understand the concepts instead of only making the application work.

---

## Learning Journey

This project is also being used as a practical way to improve my backend development and software engineering skills.

I am maintaining a separate `LEARNING.md` file where I record the concepts I learn, mistakes I make, and interview questions related to each development day.

---

## Future Architecture

The long-term architecture of the project is planned around:

```text
React Frontend
       ↓
Express / Node.js Backend
       ↓
MongoDB + Redis
       ↓
Code Execution Service
       ↓
Online Judge
```

The architecture will evolve as more features are implemented.

---

This repository is part of my Software Engineering learning journey and is being developed from scratch to gain practical understanding of backend development and system design.
