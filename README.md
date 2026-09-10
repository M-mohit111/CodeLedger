# 🚀 CodeLedger

A modern, full-stack competitive programming and coding platform built with the MERN stack. CodeLedger provides a seamless coding environment with integrated code execution, AI-powered doubt solving, and video editorials.

## ✨ Key Features

* **Interactive Code Workspace:** Write, run, and submit code in C++, Java, and JavaScript using the Monaco Editor (VS Code's core editor).
* **Live Code Execution:** Integrated with the Judge0 API for secure and fast code compilation, returning detailed runtime, memory usage, and test case validations.
* **AI ChatBot Assistant:** Stuck on a problem? Ask the integrated Gemini AI chatbot for step-by-step hints, approach suggestions, and time complexity analysis without revealing the exact solution.
* **Admin Dashboard:** A dedicated, secure admin panel to create, update, and delete problems, manage test cases (hidden and visible), and upload solution videos.
* **Video Editorials:** Built-in video player for problem editorials, powered by Cloudinary for optimized streaming.
* **Submission Tracking:** Track your submission history, past code, test cases passed, and execution metrics.
* **Secure Authentication:** JWT-based authentication with Redis caching for secure session management and instant logout token blacklisting.

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS & DaisyUI
* Redux Toolkit (State Management)
* React Router DOM
* Monaco Editor (`@monaco-editor/react`)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Database)
* Redis (Token Blacklisting & Session Security)
* JWT (Authentication)
* Bcrypt (Password Hashing)

**External APIs & Services:**
* **Judge0 API:** Code compilation and execution.
* **Google Gemini AI API:** Context-aware problem-solving assistant.
* **Cloudinary:** Video upload and delivery network.

## ⚙️ Environment Variables

To run this project locally, you will need to add the following environment variables to your respective `.env` files.

### Backend (`/backend/.env`)
```env
PORT=3000
DB_CONNECT_STRING=your_mongodb_connection_string
JWT_KEY=your_jwt_secret_key
REDIS_PASS=your_redis_cloud_password
JUDGE0_KEY=your_rapidapi_judge0_key
GEMINI_KEY=your_google_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret