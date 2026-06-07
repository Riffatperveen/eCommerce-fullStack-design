# eShop - Full Stack eCommerce Platform

A modern, responsive, and fully functional full-stack eCommerce web application. This project features a robust Node.js backend with an in-memory MongoDB database and a sleek, high-contrast React frontend styled with Tailwind CSS.

## 🌟 Key Features

* **Modern User Interface:** Built with React and Vite, styled using the latest Tailwind CSS v4, featuring frosted glass effects and beautiful typography (Inter font).
* **Complete Shopping Flow:** Browse products, view individual product details, manage your shopping cart, and seamlessly update quantities.
* **Smart Search:** Live debounced search functionality integrated directly into the backend API.
* **Stock Validation:** Real-time stock checking prevents users from adding more items to their cart than are currently available.
* **Protected Admin Panel:** A secure dashboard to manage inventory. Admins can seamlessly Create, Read, Update, and Delete products.
* **JWT Authentication:** Secure login functionality using JSON Web Tokens.
* **Zero-Setup Database:** The backend uses `mongodb-memory-server` to automatically spin up and seed an isolated MongoDB instance in memory, meaning **no database installation is required** to test this project locally!

## 💻 Technology Stack

### Frontend
* **React** (via Vite)
* **Tailwind CSS v4**
* **React Router DOM** (for seamless page navigation)
* **Axios** (for API communication)

### Backend
* **Node.js** & **Express.js**
* **MongoDB** (via Mongoose & `mongodb-memory-server`)
* **JSON Web Tokens (JWT)** (for authentication)
* **Bcrypt.js** (for password hashing)

## 🚀 How to Run Locally

Because the project uses an in-memory database, getting started is incredibly easy.

### Method 1: The Easy Way (Windows)
1. Open your File Explorer and navigate to the project's root folder (`ecommerce-fullstack-design`).
2. Double-click the **`start-project.bat`** file.
3. This will automatically open two terminal windows, start the backend (with the memory database), and launch the frontend.

### Method 2: Manual Terminal Startup
If you prefer to start the servers manually, open two separate terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm run dev
```
*Wait until you see "Data Imported!" in the console.*

**Terminal 2 (Frontend):**
```bash
cd ecommerce-websites
npm install
npm run dev
```

Your frontend will be available at `http://localhost:5173`.

## 🔐 Admin Access
To test the Admin Panel (`/admin`), you can log in using the pre-seeded admin credentials:
* **Email:** `admin@example.com`
* **Password:** `123456`

## 📁 Project Structure
* `/backend` - Contains all Express controllers, routes, Mongoose models, and authentication middleware.
* `/ecommerce-websites` - Contains the React Vite frontend application.
* `start-project.bat` - Global start script for Windows.
