# MiniDrive - Cloud File Management System

A full-stack application for secure file management with user and admin authentication. Users can upload, manage, and share files while admins have complete control over all system files.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Running the Application](#running-the-application)

---

## Features

✅ **User Authentication** - Secure signup and login with JWT tokens
✅ **Admin Panel** - Dedicated admin authentication and management
✅ **File Management** - Upload, retrieve, and delete files
✅ **Role-Based Access** - Different permissions for users and admins
✅ **File Sharing** - Share files with other users with specific permissions
✅ **MongoDB Integration** - Persistent data storage
✅ **Cookie-Based Sessions** - Secure JWT token management via cookies

---

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Token-based authentication
- **Multer** - File upload handling
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance running
- npm or yarn package manager

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

---




## Authentication

The API uses **JWT (JSON Web Tokens)** stored in HTTP-only cookies for authentication.

### Token Structure
```javascript
{
  userId: "user_mongodb_id",
  role: "user" | "admin",
  iat: 1234567890,
  exp: 1234654290
}
```

### How Authentication Works
1. User logs in or signs up
2. Server generates a JWT token with `userId`
3. Token is stored in an HTTP-only cookie named `token`
4. Cookie is automatically sent with every request
5. Protected routes verify the token in cookies

---

## USER ROUTES

### Base URL: `/api/user`

---

### 1. User Signup

**Endpoint:** `POST /signup`

**Description:** Register a new user account

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Signup successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (Error - 400):**
```json
{
  "message": "User already exists"
}
```

**Example - cURL:**
```bash
curl -X POST http://localhost:5000/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Example - JavaScript (Fetch):**
```javascript
const signup = async () => {
  const response = await fetch('http://localhost:5000/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'securePassword123'
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

---

### 2. User Login

**Endpoint:** `POST /login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Example - cURL:**
```bash
curl -X POST http://localhost:5000/api/user/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Example - JavaScript (Axios):**
```javascript
import axios from 'axios';

const login = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/user/login',
      {
        email: 'john@example.com',
        password: 'securePassword123'
      },
      {
        withCredentials: true
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Login failed:', error.response.data);
  }
};
```

---

### 3. User Logout

**Endpoint:** `POST /logout`

**Description:** Clear authentication token and end user session

**Request Body:** None (empty)

**Response (Success - 200):**
```json
{
  "message": "Logout successful"
}
```

**Example - cURL:**
```bash
curl -X POST http://localhost:5000/api/user/logout \
  -b cookies.txt
```

**Example - JavaScript (Fetch):**
```javascript
const logout = async () => {
  const response = await fetch('http://localhost:5000/api/user/logout', {
    method: 'POST',
    credentials: 'include'
  });
  
  const data = await response.json();
  console.log(data);
};
```

---

## ADMIN ROUTES

### Base URL: `/api/admin`

---

### 1. Admin Signup

**Endpoint:** `POST /signup`

**Description:** Register a new admin account

**Request Body:**
```json
{
  "fullName": "Admin User",
  "email": "admin@example.com",
  "password": "adminPassword123"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Signup successful",
  "user": {
    "id": "507f1f77bcf86cd799439012",
    "fullName": "Admin User",
    "email": "admin@example.com"
  }
}
```

**Example - cURL:**
```bash
curl -X POST http://localhost:5000/api/admin/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Admin User",
    "email": "admin@example.com",
    "password": "adminPassword123"
  }'
```

---

### 2. Admin Login

**Endpoint:** `POST /login`

**Description:** Authenticate admin user

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "adminPassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "user": {
    "id": "507f1f77bcf86cd799439012",
    "fullName": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Example - cURL:**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -c admin_cookies.txt \
  -d '{
    "email": "admin@example.com",
    "password": "adminPassword123"
  }'
```

---

### 3. Admin Logout

**Endpoint:** `POST /logout`

**Description:** Clear admin authentication token

**Request Body:** None (empty)

**Response (Success - 200):**
```json
{
  "message": "Logout successful"
}
```

**Example - cURL:**
```bash
curl -X POST http://localhost:5000/api/admin/logout \
  -b admin_cookies.txt
```

---

## FILE ROUTES

### Base URL: `/api/files`

> **Note:** File operations require authentication. Include cookies or JWT token in requests.

---

### 1. Upload File

**Endpoint:** `POST /upload`

**Authentication:** Required (User)

**Description:** Upload a new file to the system

**Request Headers:**
```
Content-Type: multipart/form-data
Cookie: token=<jwt_token>
```

**Request Body (Form Data):**
```
file: <binary_file_data>
```

**Supported File Types:**
- Images: jpg, jpeg, png, gif, webp, etc.
- Documents: pdf

**Response (Success - 201):**
```json
{
  "success": true,
  "file": {
    "_id": "607f1f77bcf86cd799439011",
    "owner": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "fileName": "document.pdf",
    "fileType": "pdf",
    "fileUrl": "https://storage.example.com/files/uuid-name.pdf",
    "createdAt": "2024-01-12T10:30:00.000Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "message": "File is required"
}
```

**Example - cURL:**
```bash
curl -X POST http://localhost:5000/api/files/upload \
  -b cookies.txt \
  -F "file=@/path/to/document.pdf"
```

**Example - JavaScript (FormData):**
```javascript
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('http://localhost:5000/api/files/upload', {
    method: 'POST',
    credentials: 'include',
    body: formData
  });
  
  const data = await response.json();
  console.log(data);
};
```

**Example - React Component:**
```jsx
import { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('http://localhost:5000/api/files/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      
      const data = await response.json();
      console.log('File uploaded:', data.file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default FileUpload;
```

---

### 2. Get All Files (Admin Only)

**Endpoint:** `GET /all`

**Authentication:** Required (Admin)

**Description:** Retrieve all files in the system (admin only)

**Query Parameters:** None

**Response (Success - 200):**
```json
{
  "files": [
    {
      "_id": "607f1f77bcf86cd799439011",
      "owner": {
        "_id": "507f1f77bcf86cd799439011",
        "fullName": "John Doe",
        "email": "john@example.com"
      },
      "fileName": "document.pdf",
      "fileType": "pdf",
      "fileUrl": "https://storage.example.com/files/uuid-name.pdf",
      "createdAt": "2024-01-12T10:30:00.000Z"
    },
    {
      "_id": "607f1f77bcf86cd799439012",
      "owner": {
        "_id": "507f1f77bcf86cd799439012",
        "fullName": "Jane Smith",
        "email": "jane@example.com"
      },
      "fileName": "image.jpg",
      "fileType": "image",
      "fileUrl": "https://storage.example.com/files/uuid-name.jpg",
      "createdAt": "2024-01-12T11:45:00.000Z"
    }
  ]
}
```

**Example - cURL:**
```bash
curl -X GET http://localhost:5000/api/files/all \
  -b admin_cookies.txt
```

**Example - JavaScript:**
```javascript
const getAllFiles = async () => {
  const response = await fetch('http://localhost:5000/api/files/all', {
    method: 'GET',
    credentials: 'include'
  });
  
  const data = await response.json();
  console.log(data.files);
};
```

---

### 3. Get User's Files

**Endpoint:** `GET /peruser`

**Authentication:** Required (User)

**Description:** Retrieve all files uploaded by the logged-in user

**Query Parameters:** None

**Response (Success - 200):**
```json
{
  "files": [
    {
      "_id": "607f1f77bcf86cd799439011",
      "owner": "507f1f77bcf86cd799439011",
      "fileName": "document.pdf",
      "fileType": "pdf",
      "fileUrl": "https://storage.example.com/files/uuid-name.pdf",
      "createdAt": "2024-01-12T10:30:00.000Z"
    },
    {
      "_id": "607f1f77bcf86cd799439013",
      "owner": "507f1f77bcf86cd799439011",
      "fileName": "presentation.pdf",
      "fileType": "pdf",
      "fileUrl": "https://storage.example.com/files/uuid-name2.pdf",
      "createdAt": "2024-01-12T12:00:00.000Z"
    }
  ]
}
```

**Example - cURL:**
```bash
curl -X GET http://localhost:5000/api/files/peruser \
  -b cookies.txt
```

**Example - JavaScript:**
```javascript
const getUserFiles = async () => {
  const response = await fetch('http://localhost:5000/api/files/peruser', {
    method: 'GET',
    credentials: 'include'
  });
  
  const data = await response.json();
  console.log(data.files);
};
```

---

### 4. Delete File (User)

**Endpoint:** `DELETE /user/:fileId`

**Authentication:** Required (User)

**Description:** Delete a file uploaded by the current user

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| fileId | String | MongoDB ID of the file to delete |

**Response (Success - 200):**
```json
{
  "message": "File deleted successfully"
}
```

**Response (Error - 403):**
```json
{
  "message": "You are not allowed to delete this file"
}
```

**Response (Error - 404):**
```json
{
  "message": "File not found"
}
```

**Example - cURL:**
```bash
curl -X DELETE http://localhost:5000/api/files/user/607f1f77bcf86cd799439011 \
  -b cookies.txt
```

**Example - JavaScript:**
```javascript
const deleteUserFile = async (fileId) => {
  const response = await fetch(
    `http://localhost:5000/api/files/user/${fileId}`,
    {
      method: 'DELETE',
      credentials: 'include'
    }
  );
  
  const data = await response.json();
  console.log(data);
};
```

---

### 5. Delete File (Admin)

**Endpoint:** `DELETE /admin/:fileId`

**Authentication:** Required (Admin)

**Description:** Delete any file in the system (admin only)

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| fileId | String | MongoDB ID of the file to delete |

**Response (Success - 200):**
```json
{
  "message": "File deleted successfully"
}
```

**Response (Error - 401):**
```json
{
  "message": "Invalid token"
}
```

**Example - cURL:**
```bash
curl -X DELETE http://localhost:5000/api/files/admin/607f1f77bcf86cd799439011 \
  -b admin_cookies.txt
```

**Example - JavaScript:**
```javascript
const deleteFileAsAdmin = async (fileId) => {
  const response = await fetch(
    `http://localhost:5000/api/files/admin/${fileId}`,
    {
      method: 'DELETE',
      credentials: 'include'
    }
  );
  
  const data = await response.json();
  console.log(data);
};
```

---

## Running the Application

### Start Backend Server

```bash
cd backend
npm install
npm start
```

Server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## Common Error Responses

### 400 - Bad Request
```json
{
  "message": "Validation error or missing required fields"
}
```

### 401 - Unauthorized
```json
{
  "message": "Invalid token or user not authenticated"
}
```

### 403 - Forbidden
```json
{
  "message": "You don't have permission to perform this action"
}
```

### 404 - Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 - Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Best Practices

✅ **Always include credentials** when making requests to protected endpoints
```javascript
credentials: 'include'  // For fetch
withCredentials: true   // For axios
```

✅ **Store JWT securely** - Never expose tokens in localStorage
```javascript
// Cookies are automatically managed by the browser
// Just ensure credentials: 'include' is set
```

✅ **Validate input** on frontend before sending requests

✅ **Handle errors gracefully** with user-friendly messages

✅ **Use HTTPS** in production for secure token transmission

---

## Project Structure

```
MiniDrive/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── config/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

## Troubleshooting

### Issue: CORS Error
**Solution:** Ensure `FRONTEND_URL` in `.env` matches your frontend URL

### Issue: Authentication Failed
**Solution:** Verify JWT_SECRET is the same in backend and tokens are stored in cookies

### Issue: File Upload Fails
**Solution:** Check file size limits and ensure multer is configured properly

---

## License

This project is licensed under the MIT License.

---

## Support

For issues and questions, please contact the development team.

**Happy Coding! 🚀**
