# GiftLink

A full-stack web application that connects users who want to give away household items with users who prefer to recycle or find free items.

## Features

- User registration and authentication with JWT
- Item listings with categories and search
- Detailed item views
- User profiles
- REST API backend with Node.js and Express
- React frontend
- MongoDB database
- Docker containerization
- CI/CD pipeline with GitHub Actions

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Natural (NLP library)

**Frontend:**
- React
- React Router

**DevOps:**
- Docker
- Docker Compose
- GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Docker (optional)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```
4. Start MongoDB
5. Run the backend:
   ```
   cd backend
   npm start
   ```
6. Run the frontend:
   ```
   cd frontend
   npm start
   ```

### Docker

```bash
docker-compose up --build
```

## API Endpoints

- `GET /api/gifts` - Get all gifts
- `GET /api/gifts/:id` - Get gift by ID
- `GET /api/search?category=X` - Search by category
- `POST /api/register` - Register user
- `POST /api/login` - Login user
- `PUT /api/user/profile` - Update profile
