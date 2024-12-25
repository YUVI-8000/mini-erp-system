# Mini ERP System

## Description
The Mini ERP System is a simplified Enterprise Resource Planning (ERP) application designed as part of an internship assignment. This project demonstrates a basic implementation of inventory management, including products and sales orders. The backend is powered by Next.js API routes with Prisma as the ORM, and the frontend is built using Next.js with client-side rendering.

## Features
- **Product Management**:
  - View all products.
  - Add new products.
  - Edit existing products.
  - Delete products.
- **Sales Order Management**:
  - View all sales orders.
  - Add new sales orders.
  - Edit existing sales orders.
  - Delete sales orders.

## Technologies Used
- **Frontend**: Next.js (React)
- **Backend**: Next.js API routes
- **Database**: PostgreSQL
- **ORM**: Prisma

## Setup Instructions

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (v16 or later).
2. Install [PostgreSQL](https://www.postgresql.org/).
3. Install [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli).

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd mini-erp-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database:
   - Create a PostgreSQL database.
   - Set the `DATABASE_URL` in a `.env` file in the root directory:
     ```env
     DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database_name>"
     ```

4. Apply the Prisma migrations to set up the database schema:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the database (optional):
   ```bash
   npx prisma db seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Folder Structure
- **app/**: Contains all the frontend pages and components.
- **pages/api/**: Contains all backend API routes.
- **prisma/**:
  - `schema.prisma`: The Prisma schema defining the database models.
  - `seed.js`: Script to seed the database with initial data.

## Usage
1. Open the application in your browser at `http://localhost:3000`.
2. Navigate to the "Products" page to manage products.
3. Navigate to the "Sales Orders" page to manage sales orders.

## Author
**Yuvraj Singh**

## License
This project is for educational purposes as part of an internship assignment and is not licensed for production use.

