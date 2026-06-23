# ⭐ Store Rating System

A full-stack web application that allows users to discover stores, submit ratings, and helps store owners monitor customer feedback through dedicated dashboards.


# ✨ Features

## 👤 User

* Register and login
* Browse available stores
* Search stores by name or address
* Submit store ratings
* Update existing ratings
* View personal ratings
* Edit profile
* Change password

## 🏪 Store Owner

* View store ratings
* See users who submitted ratings
* Track average store rating
* Manage profile
* Change password

## 🛠️ Admin

* Dashboard overview
* Create and manage users
* Create and manage stores
* Assign store owners
* View all stores
* View all users
* Role-based access management


# 🚀 Tech Stack

## 🎨 Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* TanStack Query (React Query)
* React Hook Form
* Yup Validation
* React Router DOM
* Axios
* React Hot Toast
* Lucide React

## ⚙️ Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* JWT Authentication
* bcrypt

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```bash
cd backend
touch .env
```

Add the following variables:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5433/prisma
JWT_SECRET=your_secret_key
```


# 🐳 Docker Database Setup

The application uses PostgreSQL running inside Docker.

```bash
docker compose up -d
```


# 🧩 Main Modules

## 🔑 Authentication

* JWT authentication
* Protected routes
* Role-based authorization
* Persistent login

## ⭐ Store Rating System

* Submit ratings
* Update ratings
* One rating per user per store
* Automatic average rating calculation

## 👥 User Management

* Create users
* Assign roles
* Manage store owners

## 🏪 Store Management

* Create stores
* Assign owners
* View ratings
* Search stores

## 👤 Profile Management

* Edit profile information
* Change password
* Account management


# 📂 Project Structure

```text
store-rating/
│
├── backend/
│   ├── src/
│   ├── prisma/
    ├── docker-compose.yml
│   └── .env
│
├── frontend/
│   ├── src/
│   └── .env
│
├── README.md
└── .gitignore
```


# ⚡ Installation

## Clone Repository

```bash
git clone https://github.com/Maneesh0333/store-rating-system.git

cd store-rating-system
```

## Backend

```bash
cd backend

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

# 🔒 Roles

| Role        | Permissions             |
| ----------- | ----------------------- |
| Admin       | Manage users and stores |
| User        | Browse and rate stores  |
| Store Owner | View store ratings      |


# 📸 Screenshots
<img width="1113" height="629" alt="Screenshot 2026-06-21 220423" src="https://github.com/user-attachments/assets/08f567cb-dd2f-4f6d-986c-1ee0d51deabe" /><img width="1109" height="632" alt="Screenshot 2026-06-21 220502" src="https://github.com/user-attachments/assets/4901f6a5-a9e0-4b57-9580-31fc5c7ca615" />
<img width="1110" height="634" alt="Screenshot 2026-06-21 220540" src="https://github.com/user-attachments/assets/9dc6990b-327e-4ffd-b02e-037f8918fd23" />
<img width="1106" height="626" alt="Screenshot 2026-06-21 220641" src="https://github.com/user-attachments/assets/0f8af9af-baea-4e02-9c3b-613fd1dfb9ee" />
