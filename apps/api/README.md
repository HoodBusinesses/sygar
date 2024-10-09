# Backend API Application

## Prerequisites
- Ensure you have Docker and Docker Compose installed on your machine.
- Node.js and pnpm should also be installed.

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Start the Docker Containers**
   Run the following command in the root directory of the project:
   ```bash
   docker-compose up
   ```

3. **Set Up Environment Variables**
   Navigate to the API folder and export the environment variables:
   ```bash
   cd apps/api
   export $(grep -v '^#' .env_example | xargs)
   ```

4. **Prepare the Database and Seed Admins**
   Run the following commands to prepare the database and seed the admin data:
   ```bash
   pnpm db:prepare && pnpm admins:seed
   ```

5. **Start the Development Server**
   Finally, start the development server with:
   ```bash
   pnpm start:dev
   ```

## Additional Notes
- Make sure to check the `.env_example` file for any required environment variables that need to be set.
- If you encounter any issues, please refer to the documentation or reach out for support.

## API Documentation
  After starting the server, you can access the API documentation at:
  [http://localhost:3000/api/docs](http://localhost:3000/api/docs)