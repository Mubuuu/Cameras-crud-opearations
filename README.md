# Camera and Camera Networks REST APIs

This project provides a set of REST APIs for managing `Camera` and `CameraNetworks` entities. The APIs are built using ExpressJS and MySQL, and provide basic CRUD (Create, Read, Update, Delete) operations for both entities.

## Requirements

To use these APIs, you'll need:

- Node.js (version 10 or higher)
- MySQL server (version 5.7 or higher)

## Getting Started

To get started, follow these steps:

1. Clone this repository:

		git clone https://github.com/Mubuuu/Cameras-crud-opearations.git
    
2. Install the dependencies:

		npm install
    

3. Create a MySQL database and table:

		CREATE DATABASE camera_db;

		USE camera_db;

		CREATE TABLE Cameras (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		description TEXT,
		url VARCHAR(255)
		);
  
		CREATE TABLE CameraNetworks (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		description TEXT,
		cameras TEXT
		);
    
4. Create a .env file and add these variables

		host: 'localhost',
		user: 'your_username',
		password: 'your_password',
		database: 'camera_db'

5. Start the server:

		npm start
    
