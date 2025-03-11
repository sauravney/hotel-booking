# Hotel Booking System :rocket:

## Overview :mag:

A hotel booking system built with **React** for the frontend and **Node.js** with **Prisma** and **PostgreSQL** for the backend.

## Installation :wrench:

- **Clone the repository**

  ```bash
   git clone https://github.com/sauravney/hotel-booking.git
  ```

- **Navigate to the project directory**

  ```bash
   cd hotel-booking
  ```

- **Install the dependencies (For Frontend)**
  `cd ./frontend
 `
  ```bash
   npm install
  ```
- **Install the dependencies (For Backend)**
  `cd ./backend
 `
  ```bash
   npm install
  ```
- **Create a `.env` file in the backend directory and add the following environment variables**

  ```javascript
  PORT = 5000;
  DATABASE_URL =
    "postgresql://username:password@localhost:5432/dbnameofyourdatabase?schema=public";
  SECRET_KEY = "your-secret-key";
  ```

- **Run the development server (For both Backend and Frontend) in their separate directories**
  ```bash
   For setting up the database - npx prisma migrate dev --name init
  ```
  ```bash
   npm run dev
  ```
