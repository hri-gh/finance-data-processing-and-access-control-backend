# Finance Data Processing & Access Control Backend

A backend system for managing financial records with **role-based access control (RBAC)**.
Built to demonstrate backend design, data handling, and structured API development.

---

## 🚀 Project Overview

This application allows users to manage financial records such as income and expenses, with controlled access based on user roles.

### 👤 Roles

- **Admin**
  - Full access
  - Manage users and records

- **Analyst**
  - View records
  - Access summaries and insights

- **Viewer**
  - Read-only access to data

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express (TypeScript)
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Validation:** Zod
- **Authentication:** JWT
- **Other:** Custom error handling, middleware architecture

---

## 📂 Project Structure

```text
src/
├── controllers/
├── services/
├── routes/
├── middleware/
├── validators/
├── utils/
├── config/
└── app.ts
```

### Architecture Highlights

- Controllers handle request/response
- Services contain business logic
- Middleware handles auth, validation, errors
- Prisma manages database access

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/hri-gh/finance-data-processing-and-access-control-backend.git
cd finance-dashboard-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

#### Create a .env file:

```bash
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
CORS_ORIGIN=*
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the server

```bash
npm run dev
```

---

### 🔐 Authentication

- JWT-based authentication
- Token required in headers:

```bash
Authorization: Bearer <token>
```

---

## 📘 API Explanation

The system provides APIs for:

- **User management** (Admin only)
- **Financial record management**
- **Dashboard summaries and insights**

Role-based access control ensures:

| Role      | Permissions      |
| --------- | ---------------- |
| `Admin`   | Full control     |
| `Analyst` | Read + insights  |
| `Viewer`  | Read-only        |

---

## 📑 API Documentation

### 🔹 Auth

#### `POST /api/auth/login`

Login user and receive JWT token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

### 🔹 Users (Admin Only)

#### `POST /api/users`

Create a new user.

**Request Body:**

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456",
  "role": "VIEWER"
}
```

#### `PATCH /api/users/:id`

Update user role or status.

**Request Body:**

```json
{
  "role": "ADMIN",
  "status": "INACTIVE"
}
```

#### `GET /api/users`

Get all users.

**Response:**

```json
[
  {
    "id": "6695dc01-e0ed-4beb-9945-7de85",
    "name": "John",
    "email": "john@example.com",
    "role": "ANALYST",
    "status": "INACTIVE",
    "createdAt": "2026-04-02T17:50:29.335Z"
  }
]
```

---

### 🔹 Records

#### `POST /api/records` (Admin)

Create record.

**Request Body:**

```json
{
  "amount": 5000,
  "type": "INCOME",
  "category": "Salary",
  "date": "2026-04-01",
  "note": "Monthly salary"
}
```

#### `GET /api/records`

Get all records.

**Response:**

```json
[
  {
    "id": "0d231901-a053-4ee7-936e-e36",
    "amount": 7500,
    "type": "EXPENSE",
    "category": "Shopping",
    "note": "Mobile",
    "date": "2026-04-04T00:00:00.000Z",
    "createdById": "2d27939c-0113-45ab-8249",
    "createdAt": "2026-04-04T07:47:56.905Z",
    "updatedAt": "2026-04-04T07:47:56.905Z"
  }
]
```

#### `PATCH /api/records/:id` (Admin)

Update record.

#### `DELETE /api/records/:id` (Admin)

Delete record.

---

### 🔹 Summary

#### `GET /api/records/summary`

Returns:

```json
{
  "totalIncome": 50000,
  "totalExpense": 20000,
  "netBalance": 30000
}
```

#### `GET /api/records/summary/category`

Category-wise totals.

**Response:**

```json
[
  {
    "_sum": {
      "amount": 18000
    },
    "category": "Salary",
    "type": "INCOME"
  },
  {
    "_sum": {
      "amount": 19500
    },
    "category": "Shopping",
    "type": "EXPENSE"
  }
]
```

---

### 🔹 Recent Activity

#### `GET /api/records/recent`

Returns the most recent financial records.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "record_id",
      "amount": 1200,
      "type": "EXPENSE",
      "category": "Food",
      "date": "2026-04-04"
    }
  ]
}
```

---

### 🔹 Filter Records

#### `GET /api/records/filter?type=INCOME&category=Food`

Filter records based on query parameters.

**Query Params (optional):**

- `type`: INCOME | EXPENSE
- `category`: string
- `date`: YYYY-MM-DD

#### Example:

```bash
GET /api/records/filter?type=INCOME&category=Salary
```

**Response:**

```json
{
  "success": true,
  "data": []
}
```

---

## 📬 API Testing

A Postman collection is included in the `/docs` folder for easy testing of all endpoints.

---

## 🧠 Key Design Decisions

- Used Prisma ORM for flexibility across databases
- Implemented RBAC using JWT role encoding
- Separated controller and service layers
- Centralized error handling middleware

---

## ⚠️ Assumptions

- Dates are accepted in YYYY-MM-DD format
- Only Admin can create/update/delete records
- Passwords are securely hashed using bcrypt

---

## 🔄 Tradeoffs

- The current implementation focuses on core functionality, with room for enhancements such as pagination and advanced filtering for handling larger datasets
- Soft delete can be introduced to improve data auditability
- API documentation can be extended using tools like Swagger for better developer experience

---

## 🚀 Future Improvements

- Pagination and filtering
- Search functionality
- Soft delete support
- Rate limiting
- Unit and integration tests
- Swagger/OpenAPI documentation

---

### 👨‍💻 Author: Hri
