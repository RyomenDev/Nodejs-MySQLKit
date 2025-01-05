# NodeJs app with MySQL Database

A simple Node.js application connected to a MySQL database for basic CRUD operations. This app serves as an example of integrating Node.js with MySQL.

**Features**

- Connect to a MySQL database using environment variables for configuration.
- Perform CRUD (Create, Read, Update, Delete) operations.
- Modular and clean project structure.
- Easy-to-use setup instructions.

## Getting Started

## 1. Clone the repo

```bash
git clone https://github.com/verma-kunal/nodejs-mysql.git
cd nodejs-mysql
```

> Make sure to create the database and the corresponding table in your mySQL database.

## 2. Configure the database

Create a new MySQL database:**sql**

CREATE DATABASE my_database_name;
Create the necessary table(s) in the database. For example:
sql

```
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Update the .env file with your MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=my_database_name
TABLE_NAME=""
PORT=3000
```

## 3. Initialize and start the development server:

```bash
npm install
npm run dev
```

