Employee Management System (EMS) Backend
Overview
This project implements the backend for an Employee Management System (EMS) using Node.js, Express, GraphQL (Apollo Server), and MongoDB. It features secure authentication with JWT and provides API endpoints for efficient management of employee data.

Features
User Authentication:

Secure signup and login using JWT-based authentication.

Employee Management:

Retrieve all employees.

Fetch employee details by ID.

Search employees by department or designation.

Add, update, and delete employee records.

Validation & Error Handling:

Input validation with express-validator.

Comprehensive error handling for API stability.

Project Structure
graphql
Copy
Edit
COMP3133_Assignment1/
├── .env                  # Environment configuration
├── .gitignore            # Files and directories to ignore in Git
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation (this file)
└── src/
    ├── config/
    │   ├── db.js         # MongoDB connection configuration
    │   └── jwt.js        # JWT token generation and verification
    ├── middleware/
    │   ├── auth.js       # Authentication middleware
    │   └── validators.js # Input validation using express-validator
    ├── models/
    │   ├── Employee.js   # Mongoose schema for employees
    │   └── User.js       # Mongoose schema for users
    ├── resolvers/
    │   ├── employeeResolver.js  # GraphQL resolvers for employees
    │   ├── userResolver.js      # GraphQL resolvers for authentication
    │   └── index.js             # Combined resolvers
    ├── typeDefs/
    │   ├── employee.graphql     # GraphQL schema for employee operations
    │   ├── user.graphql         # GraphQL schema for user authentication
    │   └── index.js             # Merged type definitions
    ├── utils/
    │   └── errorHandler.js      # Custom error handling utility
    └── server.js         # Entry point for the server
Installation
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/yourusername/COMP3133_Assignment1.git
cd COMP3133_Assignment1
Install Dependencies:

bash
Copy
Edit
npm install
Set Up Environment Variables:

Create a .env file in the project root with the following content:

ini
Copy
Edit
PORT=4000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
TOKEN_EXPIRES_IN=1h
Run the Server:

bash
Copy
Edit
npm start
For development with auto-restart, use:

bash
Copy
Edit
npx nodemon src/server.js
API Usage
GraphQL Playground
Access the GraphQL Playground at:

bash
Copy
Edit
http://localhost:4000/graphql
For protected operations, include the JWT token in your HTTP headers:

json
Copy
Edit
{
  "Authorization": "Bearer <your_jwt_token>"
}
Example GraphQL Operations
User Authentication
Signup:

graphql
Copy
Edit
mutation {
  signup(
    username: "testuser"
    email: "test@example.com"
    password: "password123"
  ) {
    token
    user {
      id
      username
      email
    }
  }
}
Login:

graphql
Copy
Edit
query {
  login(usernameOrEmail: "testuser", password: "password123") {
    token
    user {
      id
      username
      email
    }
  }
}
Employee Operations (Requires Authorization)
Get All Employees:

graphql
Copy
Edit
query {
  getAllEmployees {
    id
    first_name
    last_name
    email
    designation
    department
    salary
    date_of_joining
  }
}
Get Employee by ID:

graphql
Copy
Edit
query {
  getEmployeeById(id: "employee_id_here") {
    id
    first_name
    last_name
    email
    gender
    designation
    salary
    date_of_joining
    department
    employee_photo
  }
}
Search Employee by Department/Designation:

graphql
Copy
Edit
query {
  searchEmployeeByDeptDesg(
    department: "Engineering"
    designation: "Developer"
  ) {
    id
    first_name
    last_name
    email
    designation
    department
  }
}
Add Employee:

graphql
Copy
Edit
mutation {
  addEmployee(
    first_name: "John"
    last_name: "Doe"
    email: "john.doe@example.com"
    gender: "Male"
    designation: "Developer"
    salary: 1500
    date_of_joining: "2023-01-15"
    department: "Engineering"
    employee_photo: "john_doe.png"
  ) {
    id
    first_name
    last_name
    email
  }
}

 Contributor: Miguel Gutierrez
