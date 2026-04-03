Java Web Shop Application

Description

This project is a full-stack web application built using Spring Boot, MariaDB, and JavaScript (Fetch API).
It represents a simple online shop system where products and users can be managed.

The application includes role-based authentication using Spring Security.

Features

Product Management
Add new products
View all products
Filter products:
Products with price <= 200
Products with price >= 500
User Management
Register users (newsletter system)
View all users (ADMIN only)
Filter users:
Users with age <= 35
Users with age > 35
Security
Basic Authentication
Role-based access:
USER
ADMIN

Protected endpoints:
/adminPanel
/users/allUsers
Technologies Used
Backend
Java
Spring Boot
Spring Data JPA
Spring Security
Database
MariaDB
Frontend
HTML
Bootstrap 5
JavaScript (Fetch API)
API Endpoints
Products
Method	Endpoint	Description
GET	/products	Get all products
POST	/addProducts	Add a new product
GET	/cheapProducts	Get products <= 200
GET	/expensiveProducts	Get products >= 500
Users
Method	Endpoint	Description
GET	/users/allUsers	Get all users (ADMIN only)
POST	/users/addUsers	Add a new user
GET	/users/youngerUsers	Users <= 35
GET	/users/olderUsers	Users > 35
Authentication

Basic Authentication is used.

Default users:

Username: user
Password: user1
Role: USER

Username: admin
Password: admin123
Role: ADMIN

Setup Instructions

Clone the repository:
git clone https://github.com/your-username/your-repo.git
Configure database in application.properties:
spring.datasource.url=jdbc:mariadb://localhost:3306/your_database
spring.datasource.username=root
spring.datasource.password=your_password

Run the application:
mvn spring-boot
Open in browser:
http://localhost:8080

Project Structure
Controller layer: handles HTTP requests
Service layer: contains business logic
Repository layer: database access using JPA
Entity classes: Users, Products
Security configuration: Spring Security setup

Author

Nikola Korac
