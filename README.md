# Recipe Finder

Recipe Finder is a modern web application designed to help users discover authentic Indian recipes. From spicy curries to sweet desserts, explore a variety of dishes categorized for Breakfast, Lunch, Dinner, and Snacks. Users can search for specific recipes, view detailed preparation steps, and save their favorite dishes for quick access.

## Features

-   **Recipe Discovery**: Browse a curated collection of authentic Indian recipes.
-   **Categorization**: Filter recipes by categories like Breakfast, Lunch, Dinner, and Snacks.
-   **Search**: Find recipes by name, ingredients, or region.
-   **Detailed View**: Step-by-step cooking instructions, ingredient lists, preparation time, and difficulty levels.
-   **User Accounts**: Secure registration and login functionality.
-   **Favorites**: Save your favorite recipes to your personal collection.
-   **Responsive Design**: A beautiful, mobile-friendly interface built with Tailwind CSS.

## Tech Stack

### Frontend
-   **React**: UI Library
-   **Vite**: Build tool for fast development
-   **TypeScript**: Type safety and better developer experience
-   **Tailwind CSS**: Utility-first CSS framework for styling
-   **Lucide React**: Beautiful icons

### Backend
-   **Node.js**: Runtime environment
-   **Express.js**: Web framework for API routes
-   **MySQL**: Relational database for storing users
-   **JWT (JSON Web Tokens)**: Secure user authentication
-   **Bcrypt.js**: Secure password hashing

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites
-   Node.js (v16 or higher)
-   MySQL Server installed and running

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Recipe_Finder
    ```

2.  **Backend Setup**
    Navigate to the backend directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory with your database configuration:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=your_password
    DB_NAME=recipe_finder
    JWT_SECRET=your_jwt_secret_key
    ```
    *Note: Ensure you have created a MySQL database named `recipe_finder` (or whatever you specified in DB_NAME) and a `users` table.*

    Start the backend server:
    ```bash
    node server.js
    ```
    The server will start on `http://localhost:5000`.

3.  **Frontend Setup**
    Open a new terminal, navigate to the project root (if not already there), and install frontend dependencies:
    ```bash
    npm install
    ```

    Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Database Schema (Basic)

To run the authentication system, ensure your MySQL database has the required `users` table:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);
```

## License

This project is licensed under the MIT License.
