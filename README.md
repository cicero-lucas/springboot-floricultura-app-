# Floricultura - Floral Management System

![Version](https://img.shields.io/badge/version-0.0.1--SNAPSHOT-blue)
![Java](https://img.shields.io/badge/java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.1-brightgreen)
![React](https://img.shields.io/badge/React-19.1.0-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Project Overview

**Floricultura** is a comprehensive full-stack web application for managing a flower shop's operations. The system handles user management, product catalog, and order processing with secure authentication and role-based access control.

## 🏗️ Architecture

This project follows a **monorepo structure** with separate backend and frontend applications:

```
Flores/
├── backend/        # Spring Boot REST API (Java 17)
└── frontend/       # React + Vite SPA (React 19)
```

### Backend Architecture
- **Framework**: Spring Boot 4.0.1
- **Database**: MySQL with Flyway migrations
- **Security**: JWT token-based authentication
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven

### Frontend Architecture
- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.0
- **Routing**: React Router v7
- **Styling**: CSS with component-level styling

## 🚀 Features

### Authentication & Security
- JWT token-based authentication
- Role-based access control (RBAC)
- Secure password handling with Spring Security
- CORS configuration for frontend-backend communication

### Core Modules
- **User Management**: Registration, login, user profile management
- **Product Catalog**: Create, read, update, delete flower products
- **Order Management**: Create and manage customer orders
- **Authorization**: Service layer authorization checks

### API Features
- RESTful API endpoints for all resources
- Global exception handling
- Request/response DTOs for data validation
- Standardized error responses

### Frontend Features
- Protected routes with authentication
- Responsive UI with modern design
- Toast notifications for user feedback
- Client and product listing pages
- Form pages for creating/editing entities
- Authentication context for state management

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Spring Boot | 4.0.1 | Framework |
| Spring Data JPA | Latest | ORM |
| Spring Security | Latest | Authentication/Authorization |
| MySQL Driver | Latest | Database |
| Flyway | 11.14.1 | Database Migrations |
| Validation | Latest | Input Validation |
| JWT (JJWT) | Latest | Token Management |
| Lombok | Latest | Boilerplate Reduction |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.1.0 | UI Framework |
| React Router | 7.6.2 | Client-side Routing |
| Vite | 7.0.0 | Build Tool |
| CSS | Native | Styling |
| ESLint | 9.29.0 | Code Quality |

## 📦 Database Schema

### Tables
- `users` - User accounts and authentication
- `products` - Flower products catalog
- `orders` - Customer orders

### Migrations
Migrations are located in `backend/src/main/resources/db/migration/`:
- `V1__create_user_table.sql` - User table creation
- `V2__create_product_table.sql` - Product table creation
- `V3__create_order_table.sql` - Order table creation

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Users
- `GET /users` - List all users
- `GET /users/{id}` - Get user by ID
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Products
- `GET /products` - List all products
- `GET /products/{id}` - Get product by ID
- `POST /products` - Create product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Orders
- `GET /orders` - List all orders
- `GET /orders/{id}` - Get order by ID
- `POST /orders` - Create order
- `PUT /orders/{id}` - Update order
- `DELETE /orders/{id}` - Delete order

## ⚙️ Configuration

### Backend Configuration
Located in `backend/src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/floricultura
spring.datasource.username=root
spring.datasource.password=your_password

# Server
server.port=3000

# JWT Secret
api.security.token.secret=your_jwt_secret_key
```

### Environment Setup

#### Prerequisites
- Java 27+
- Maven 3.8+
- MySQL 8.0+
- Node.js 18+
- npm or yarn

## 🚀 Getting Started

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Configure MySQL Database**
   - Create database: `CREATE DATABASE floricultura;`
   - Update credentials in `src/main/resources/application.properties`

3. **Set JWT Secret (Optional)**
```bash
export JWT_SECRET="your-secret-key"
```

4. **Build the project**
```bash
mvn clean install
```

5. **Run the application**
```bash
mvn spring-boot:run
```

Backend will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

Frontend will be available at `http://localhost:5173` (default Vite port)

## 📁 Project Structure

```
backend/
├── src/main/java/com/flores/floricultura/
│   ├── controllers/          # REST API endpoints
│   ├── domain/               # Entity classes and DTOs
│   │   ├── user/
│   │   ├── product/
│   │   └── order/
│   ├── repositories/         # Data access layer
│   ├── service/              # Business logic layer
│   │   └── userService/
│   └── infra/                # Infrastructure components
│       ├── cors/             # CORS configuration
│       ├── security/         # Security configuration
│       ├── token/            # JWT token handling
│       └── exceptions/       # Exception handling
└── resources/
    ├── application.properties # Configuration
    └── db/migration/          # Flyway migrations

frontend/
├── src/
│   ├── components/           # Reusable components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   └── Toast/
│   ├── contexts/             # React Context API
│   │   └── AuthContext.jsx
│   ├── pages/                # Page components
│   │   ├── auth/
│   │   ├── home/
│   │   ├── cliente/
│   │   ├── produto/
│   │   ├── venda/
│   │   └── errors/
│   ├── services/             # API calls and utilities
│   │   ├── api.js
│   │   └── authService.js
│   ├── layouts/              # Layout components
│   ├── styles/               # Global styles
│   └── utils/                # Utility functions
├── public/                   # Static assets
└── vite.config.js           # Vite configuration
```

## 🔐 Security Features

1. **Authentication**
   - JWT token-based authentication
   - Token validation on protected routes
   - Secure password storage

2. **Authorization**
   - Role-based access control
   - Protected API endpoints
   - Authorization service layer

3. **Data Protection**
   - Input validation with Spring Validation
   - CORS configuration for cross-origin requests
   - Secure HTTP headers

4. **Error Handling**
   - Global exception handler
   - Standardized error responses
   - Secure error messages

## 🧪 Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 📝 Code Quality

### Linting
```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
mvn checkstyle:check
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check credentials in `application.properties`
- Ensure database exists: `CREATE DATABASE floricultura;`

### Port Already in Use
- Backend default: 3000
- Frontend default: 5173
- Change port in `application.properties` (backend) or `vite.config.js` (frontend)

### JWT Token Issues
- Verify JWT_SECRET environment variable is set
- Check token expiration
- Ensure Authorization header format: `Bearer <token>`

## 📚 Documentation

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Flyway Documentation](https://flywaydb.org)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes using semantic commits
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.



---

**Last Updated**: January 16, 2026  
**Version**: 0.0.1-SNAPSHOT  
**Status**: 🚧 In Development
