# Tokoku API 🛒

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Xendit](https://img.shields.io/badge/Xendit-Payment_Gateway-blue?style=for-the-badge)](https://www.xendit.co/)

**Tokoku API** is a robust, production-ready e-commerce backend built with a focus on scalability, clean architecture, and secure payment processing. Developed using **TypeScript** and **Express.js**, it provides a complete solution for managing products, orders, and automated payment workflows via **Xendit**.

---

## 🚀 Key Features

- **🔐 Secure Authentication**: Implemented via JWT (JSON Web Tokens) and Bcrypt password hashing.
- **📦 Order Management**: Full lifecycle management from cart processing to order fulfillment.
- **💳 Integrated Payments**: Seamless integration with Xendit for automated invoice generation and webhook status tracking.
- **🏗️ Service-Repository Architecture**: Separation of concerns ensuring the codebase is testable, maintainable, and scalable.
- **🛡️ Schema Validation**: Strict request validation using **Zod** to ensure data integrity.
- **🗃️ Type-Safe ORM**: Leveraging Prisma for a type-safe database interface and smooth migrations.

---

## 🛠️ Tech Stack

### Backend Core

- **Runtime**: Node.js
- **Framework**: Express.js (v5.x)
- **Language**: TypeScript

### Database & Security

- **ORM**: Prisma
- **Database**: SQLite (Perfect for lightweight development & prototyping)
- **Security**: JWT & Bcrypt

### Integrations

- **Payment**: Xendit Node.js SDK
- **Validation**: Zod (Schema-based validation)
- **Execution**: `tsx` & `nodemon` for optimized development

---

## 🏗️ Architecture Overview

The project follows a **Layered Architecture** (Service-Repository pattern) to ensure a clean separation of concerns:

1.  **Routes**: Defines API endpoints and connects them to Controllers.
2.  **Controllers**: Handles HTTP requests, extracts parameters, and manages responses.
3.  **Services**: Orchestrates business logic (e.g., calculating totals, calling payment gateways).
4.  **Repositories**: Abstraction layer for data access via Prisma, centralizing all DB queries.
5.  **Middleware**: Handles cross-cutting concerns like Auth guards and Global Error management.

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/tokoku-api.git
    cd tokoku-api
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and configure the following:

    ```env
    DATABASE_URL="file:./dev.db"
    JWT_SECRET_KEY="your_jwt_secret"
    XENDIT_SECRET_KEY="your_xendit_api_key"
    XENDIT_WEBHOOK_VERIFICATION_TOKEN="your_webhook_token"
    ```

4.  **Database Migration**:

    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

---

## 🔌 API Endpoints (Preview)

| Method | Endpoint               | Description                | Auth Required |
| :----- | :--------------------- | :------------------------- | :------------ |
| `POST` | `/api/auth/register`   | User Registration          | No            |
| `POST` | `/api/auth/login`      | User Login & Token Gen     | No            |
| `GET`  | `/api/products`        | Browse Products            | No            |
| `POST` | `/api/orders`          | Create New Order & Invoice | Yes           |
| `GET`  | `/api/orders/user`     | View Order History         | Yes           |
| `POST` | `/api/xendit/callback` | Xendit Webhook Handler     | No (Internal) |

_Full API documentation is available via Postman/Swagger (Optional recommendation for the developer)._

---

## 📝 Performance & Decisions

- **Why SQLite?**: Chosen for its zero-config nature, making the project easily portable for recruiters and reviewers.
- **Zod over manual validation**: Ensured every request is validated against a schema before reaching the business logic, drastically reducing runtime errors.
- **Custom Error Handler**: A centralized middleware captures all errors and returns standardized JSON responses.

---

## 👨‍💻 Author

**Mukhammad Rizki**

---

_This project was built to demonstrate proficiency in modern backend development, API design, and third-party service integration._
