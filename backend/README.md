# Node.js MySQL Backend API

A RESTful API backend built with Node.js, Express, and MySQL using Sequelize ORM.

## Features

- Express.js framework
- MySQL database with Sequelize ORM
- MVC architecture
- JWT authentication
- Role-based authorization
- Input validation
- Error handling middleware
- Database migrations and seeders
- RESTful API endpoints
- Environment configuration
- CORS support
- Security with Helmet
- Logging with Morgan

## Project Structure

```
backend/
├── src/
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── database/           # Database migrations and seeders
│   ├── middleware/         # Custom middleware
│   ├── models/             # Sequelize models
│   ├── routes/             # Express routes
│   ├── utils/              # Utility functions
│   └── server.js           # Express app entry point
├── .env                    # Environment variables
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore file
├── .sequelizerc            # Sequelize configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and update the values
4. Create the database:
   ```bash
   mysql -u root -p
   CREATE DATABASE app_development;
   exit;
   ```
5. Run database migrations:
   ```bash
   npm run migrate
   ```
6. Seed the database with sample data:
   ```bash
   npm run seed
   ```
7. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Users (Admin only)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/search` - Search products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

## Authentication

The API uses JWT (JSON Web Token) for authentication. To access protected routes, include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Environment Variables

- `NODE_ENV` - Environment (development, test, production)
- `PORT` - Server port
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRES_IN` - JWT expiration time
- `CORS_ORIGIN` - CORS allowed origin
- `LOG_LEVEL` - Logging level

## License

This project is licensed under the ISC License.

