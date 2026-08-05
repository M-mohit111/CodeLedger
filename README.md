# CodeLedger

CodeLedger is a full-stack MERN coding platform inspired by LeetCode. The objective of this project is not just to build a coding platform but to understand how a production-level backend works from the ground up.

I am building this project from scratch to learn backend development through first principles. Every feature is implemented after understanding why it exists, how it works internally, and how it is used in real-world applications.

---

## Current Features

### Authentication System

- User Registration
- User Login
- User Logout
- Password Hashing using bcrypt
- JWT Authentication
- Cookie-based Authentication
- Redis Token Blacklisting
- Role-based User Management (User/Admin)

---

### Authorization

- User Authentication Middleware
- Admin Authentication Middleware
- Protected Routes
- JWT Verification
- Token Validation
- Redis Blacklist Verification

---

### User Management

- User Schema using Mongoose
- Email Validation
- Strong Password Validation
- Unique Email Constraint
- User Roles
- Solved Problems Tracking

---

### Problem Module

- Problem Schema
- Difficulty Levels
- Topic Tags
- Visible Test Cases
- Hidden Test Cases
- Starter Code for Multiple Languages
- Problem Creator Reference

---

### Backend Infrastructure

- Express.js
- MongoDB Atlas
- Mongoose ODM
- dotenv Configuration
- Cookie Parser
- Validator Package
- Modular Folder Structure
- Redis Integration

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication & Security

- JWT
- bcrypt
- cookie-parser
- Redis

### Utilities

- dotenv
- validator

---

## Project Structure

```

src/
├── config/
├── controller/
├── middleware/
├── models/
├── utils/

routes/

package.json

README.md

```

---

## Upcoming Features

- Problem CRUD APIs
- Code Submission API
- Online Judge
- Contest System
- Leaderboard
- User Profile
- React Frontend
- Redux Toolkit
- Deployment

---

## Why I Built This

The purpose of this repository is to understand backend engineering instead of following tutorials blindly.

My goal is to understand every middleware, every request flow, every database operation, every package, and every architectural decision so that I can confidently explain the complete project during interviews and build similar systems independently in the future.

---

## Status

🚧 Backend Development in Progress

Frontend development will begin after completing the backend APIs.