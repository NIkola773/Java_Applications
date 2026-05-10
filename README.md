# Java Web Shop Application

A modern full-stack e-commerce web application built with Java and Spring Boot. The project demonstrates backend development, REST API design, authentication and authorization, database integration, and secure application architecture.

---

# Features

## User Features

* User registration and login
* Secure authentication and authorization
* Product browsing and searching
* Product filtering and category support
* Shopping cart functionality
* Order management
* Newsletter/email support

## Admin Features

* Product management
* User management
* Order monitoring
* Role-based access control

## Technical Features

* RESTful API architecture
* Layered application structure
* Database persistence with JPA/Hibernate
* Spring Security integration
* Validation and exception handling
* Responsive frontend integration

---

# Technologies Used

## Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* Maven

## Database

* MariaDB

## Frontend

* HTML
* CSS
* JavaScript

## Tools

* IntelliJ IDEA / VS Code
* Git & GitHub
* Postman

---

# Project Architecture

The application follows a layered architecture:

```text
Controller Layer
       ↓
Service Layer
       ↓
Repository Layer
       ↓
Database
```

## Main Components

### Controllers

Handle incoming HTTP requests and API endpoints.

### Services

Contain business logic and application rules.

### Repositories

Provide database access using Spring Data JPA.

### Security Layer

Handles authentication, authorization, and protected routes.

---

# Security

The application uses Spring Security for:

* Authentication
* Authorization
* Role management
* Protected API endpoints
* Secure password handling

Example roles:

```text
ROLE_USER
ROLE_ADMIN
```

---

# Database Design

The application uses relational database modeling with entities such as:

* Users
* Products
* Categories
* Orders
* Cart
* Roles

Relationships are implemented using JPA annotations.

---

# REST API Example

## Get All Products

```http
GET /api/products
```

## Create Product

```http
POST /api/products
```

## User Login

```http
POST /api/auth/login
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/NIkola773/Java_Applications.git
```

## Open Project

Open the project in:

* IntelliJ IDEA
* VS Code
* Eclipse

## Configure Database

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mariadb://localhost:3306/database_name
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Run Application

```bash
mvn spring-boot:run
```

---

# Future Improvements

Planned improvements for the project:

* JWT Authentication
* Docker support
* Swagger/OpenAPI documentation
* Unit and integration testing
* Payment integration
* Pagination and advanced filtering
* Cloud deployment
* CI/CD pipeline

---

# Screenshots

Add screenshots of:

* Homepage
* Product page
* Admin dashboard
* Authentication page
* Shopping cart

---

# Learning Goals

This project was created to improve skills in:

* Backend development
* Spring ecosystem
* REST API development
* Database design
* Security concepts
* Full-stack application architecture

---

# Author

Developed by Nikola Korac.

GitHub: [https://github.com/NIkola773](https://github.com/NIkola773)

---

# License

This project is for educational and portfolio purposes.
