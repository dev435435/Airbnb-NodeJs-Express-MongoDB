click/copy on this link for live video of the project(Watch in 2x) = https://drive.google.com/file/d/1IQlfFmObEESR8gmEwmQm8dzb5q85tc6T/view?usp=sharing

# 🏠 Airbnb Clone

A full-stack rental platform inspired by Airbnb, built using **Node.js, Express.js, MongoDB, and EJS**.
The application provides separate experiences for **Hosts** and **Guests**, including property management,
home browsing, favourites, authentication, and session management.

## 🚀 Features

### 👤 Authentication & User Management

- User registration and login
- Session-based authentication
- Login and logout functionality
- Separate **Host** and **Guest** profiles
- Session persistence using MongoDB

### 🏡 Host Features

- Add new properties
- Edit existing property details
- Delete properties
- Upload property images
- Manage properties listed by the host

### 🔎 Guest Features

- Browse available homes
- View detailed property information
- Add properties to favourites
- Remove properties from favourites
- View favourite properties

### 🗄️ Database

MongoDB is used to store and manage:

- User accounts
- Property/home information
- Favourite properties
- User sessions

## 🛠️ Tech Stack

**Frontend**

- HTML
- CSS
- EJS (Embedded JavaScript Templates)

**Backend**

- Node.js
- Express.js

**Database**

- MongoDB

**Authentication & Sessions**

- Express Session
- MongoDB session storage

**Other**

- Image upload handling
- REST-style routing
- Middleware-based authentication and authorization

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/dev435435/Airbnb-NodeJs-Express-MongoDB
```

### 2. Navigate to the project

```bash
cd YOUR-REPOSITORY
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure MongoDB

Create a MongoDB database and update your MongoDB connection string.

Use your Username and password here in Utils/databaseUtil.js and app.js
"mongodb+srv://USERNAME:PASSWORD@cluster0.craillb.mongodb.net/?appName=Cluster0";

````

### 5. Start the application

```bash
npm start
```


The application will be available at:

```text
http://localhost:3000
```

## 🔐 Authentication Flow

The application uses session-based authentication.

```text
User
  ↓
Login / Register
  ↓
Authentication
  ↓
Session Created
  ↓
Access Host / Guest Features
  ↓
Logout
  ↓
Session Destroyed
```

Protected routes ensure that users can only access features available to their respective roles.

## 🏠 Application Workflow

### Host

```text
Login
  ↓
Host Dashboard
  ↓
Add Property
  ↓
Upload Image
  ↓
Manage Properties
  ├── Edit
  └── Delete
```

### Guest

```text
Login
  ↓
Browse Homes
  ↓
View Property Details
  ↓
Add to Favourites
  ↓
View Favourite Homes
```

## 📸 Screenshots

### Guest Home Page
![Guest Home Page](screenshots/Guest-home.png)


### Host Dashboard
![Host Dashboard](screenshots/host-dashboard.png)

### Favourites
![Favourites](screenshots/Favourites.png)

### Login
![Login](screenshots/Login.png)

### Sign up
![Sign up](screenshots/Sign-up.png)

### Add home for host
![Add home](screenshots/Add-home.png)

```

## 🔮 Future Improvements

- Property search and filtering
- Location-based property search
- Booking and reservation system
- Online payment integration
- Reviews and ratings
- Host/Guest messaging
- Responsive mobile design
- Image storage using cloud storage
- Deployment using platforms such as Render, Railway, or AWS

## 👨‍💻 Author

**Devan**

[GitHub](https://github.com/dev435435/Airbnb-NodeJs-Express-MongoDB)
````
