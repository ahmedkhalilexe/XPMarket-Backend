# XP Market Backend

## Description
XPMarket is an e-commerce platform designed to facilitate seamless online shopping. The backend is built using Node.js with Express, and it integrates with PostgreSQL via Prisma ORM for efficient database management. It features user authentication, product management, order processing, and payment integration, ensuring a smooth and secure experience for both customers and administrators.
## Features
- **User Authentication & Authorization**: Secure login and registration using JWT tokens.
- **Product Management**: Create, read, update, and delete (CRUD) operations for products, including categories and inventory management.
- **Order Processing**: Handles order creation, tracking, and updating statuses such as pending, confirmed, and canceled.
- **Payment Integration**: Supports secure payment processing via Stripe.
- **Shopping Cart**: Allows users to add, update, and remove products from their cart.
- **Order History**: Users can view their past orders and track current order status.
- **Admin Dashboard**: Provides admins with control over product management, order tracking, and user management.
- **Database Management**: Uses Prisma ORM with PostgreSQL for efficient and scalable database operations.

## Installation

### Prerequisites
- Node.js and npm installed
- Git installed

### Backend
1. Clone the repository:
    ```bash
    git clone https://github.com/ahmedkhalilexe/XPMarket-Backend.git
    cd XPMarket-Backend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Set up the environment variables:
    - Create a `.env` file add your variables (DATABASE_URL, DIRECT_URL, FRONTEND_URL, JWT_SECRET, PORT ,REDIS_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET).

4. Start the backend server:
    ```bash
    npm start
    ```

## Technologies Used
- **Backend**: Node.js, Express.js, webhooks, Redis cashing.

## Project Structure

```bash 
    
XPMarket-Backend/
├── controllers/
├── helpers/
├── middleware/ 
├── models/  
├── prisma/ 
│ └── migration/
├── public/
├── private/
├── routes/
├── webhook/  
├── .env
├── package.json
├── server.js
└── README.md

```
