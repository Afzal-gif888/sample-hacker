# Student Registration API

A production-ready REST API for student registration.

## Technology Stack
- Node.js
- TypeScript
- Express.js
- MongoDB & Mongoose
- Zod (Validation)
- Helmet & Express Rate Limit (Security)

## Folder Structure
- `src/config/`: Database configuration
- `src/controllers/`: Request handlers
- `src/middleware/`: Express middlewares
- `src/models/`: Mongoose schemas
- `src/routes/`: API routes
- `src/services/`: Business logic
- `src/types/`: TypeScript type definitions
- `src/validators/`: Zod validation schemas

## Prerequisites
- Node.js (v18+)
- MongoDB (running locally or remote)

## Environment Variables
Create a `.env` file based on `.env.example`:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/student_registration
CLIENT_URL=http://localhost:5173
```

## Installation & Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start MongoDB locally.

## Development
```bash
npm run dev
```

## Production Build
```bash
npm run build
npm run start
```

## API Endpoints

### 1. Register a Student
**Endpoint:** `POST /api/students`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "collegeName": "ABC Engineering College",
  "branch": "Computer Science Engineering",
  "rollNumber": "CSE2026001"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Student registration successful.",
  "data": {
    "id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "collegeName": "ABC Engineering College",
    "branch": "Computer Science Engineering",
    "rollNumber": "CSE2026001",
    "createdAt": "..."
  }
}
```

**Error Response Example (400 Bad Request - Validation Failed):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Please enter a valid email address."
  }
}
```

### 2. Get a Student by ID
**Endpoint:** `GET /api/students/:id`

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

### 3. List Students
**Endpoint:** `GET /api/students?page=1&limit=10`

**Response:**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### 4. Health Check
**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "success": true,
  "message": "Student Registration API is running."
}
```

## Frontend Integration
The API expects cross-origin requests from `CLIENT_URL`. Validation errors return structured field-level error messages to easily bind them to frontend form fields.
