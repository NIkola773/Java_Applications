# Java Web Shop Application

> A full-stack e-commerce web application built with Java and Spring Boot, featuring a furniture shop theme with product browsing, user registration, checkout, and a protected admin panel.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Database Design](#database-design)
- [Pages](#pages)
- [REST API](#rest-api)
- [Security](#security)
- [Installation](#installation)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Features

### User Features
- User registration with automatic newsletter subscription
- Product browsing and filtering by price
- Shopping cart and checkout with address form
- Email newsletter on registration

### Admin Features
- Protected admin panel with role-based access control
- Product and user management via REST API
- User list accessible only to admins

### Technical Features
- RESTful API architecture
- Layered application structure (Controller → Service → Repository)
- ManyToMany relationship between Users and Products via join table
- Spring Security with in-memory authentication
- TypeScript interfaces matching backend entities
- Animated canvas background on homepage

---

## Technologies

| Layer | Technology |
|-------|-----------|
| Backend | Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate |
| Frontend | HTML, CSS, Bootstrap 5, TypeScript, JavaScript |
| Database | MariaDB |
| Build | Maven |
| Tools | IntelliJ IDEA / VS Code, Git & GitHub, Postman |

---

## Architecture

```
Controller Layer   →   Handles HTTP requests and API endpoints
       ↓
Service Layer      →   Contains business logic
       ↓
Repository Layer   →   Database access via Spring Data JPA
       ↓
MariaDB Database
```

---

## Database Design

| Entity | Description |
|--------|-------------|
| `Users` | Stores user info: username, email, age |
| `Products` | Stores product info: name, price |
| `UserAddress` | Stores checkout address info |
| `users_products` | Join table — ManyToMany between Users and Products |

### Entity Relationship

```
Users ────────────── users_products ────────────── Products
  (userId)               (FK)                       (productId)
```

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page with animated particle background, newsletter signup, product descriptions |
| `shop.html` | Product listing with price filtering |
| `checkout.html` | Order form with address input |
| `adminPanel.html` | Protected admin dashboard (requires `ADMIN` role) |

---

## REST API

### Products

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/products` | Get all products | Public |
| `GET` | `/cheapProducts` | Get products ≤ 200$ | Public |
| `GET` | `/expensiveProducts` | Get products ≥ 500$ | Public |
| `POST` | `/addProducts` | Add a new product | Public |

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/users/allUsers` | Get all users | `ADMIN` |
| `GET` | `/users/youngerUsers` | Users aged ≤ 35 | Public |
| `GET` | `/users/olderUsers` | Users aged > 35 | Public |
| `POST` | `/users/addUsers` | Register a user | Public |

### Other

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/address/addAddress` | Save checkout address | Public |
| `POST` | `/api/newsletter/subscribe` | Subscribe to newsletter | Public |
| `GET` | `/adminPanel` | Admin panel view | `ADMIN` |

---

## Security

Spring Security is configured with two in-memory roles:

| Role | Access |
|------|--------|
| `ROLE_USER` | Standard access to public endpoints |
| `ROLE_ADMIN` | Access to `/adminPanel` and `/users/allUsers` |

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/NIkola773/Java_Applications.git
cd Java_Applications
```

### 2. Configure the Database

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mariadb://localhost:3306/your_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### 3. (Optional) Enable Email

```properties
app.mail.enabled=true
spring.mail.username=${MAIL_USERNAME}
spring.mail.password=${MAIL_PASSWORD}
```

> Set `MAIL_USERNAME` and `MAIL_PASSWORD` as environment variables — do not hardcode credentials.

### 4. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

---

## Future Improvements

- [ ] JWT Authentication
- [ ] Docker support
- [ ] Swagger / OpenAPI documentation
- [ ] Unit and integration testing
- [ ] Payment integration
- [ ] Cloud deployment
- [ ] CI/CD pipeline

---

## Author

**Nikola Korac**

GitHub: [NIkola773](https://github.com/NIkola773)

---

## License

This project is for educational and portfolio purposes.
