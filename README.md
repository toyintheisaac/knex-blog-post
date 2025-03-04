# Roqqu Back-End Engineer Assessment
### User Management Blog API

This is a simple User Management Blog API built with Node.js, Express, and Knex.js. It provides endpoints for user management, blog post creation, and address handling, with full database migration and testing setup.

## Setup Instructions
### 1. Clone the Repository
`git clone https://github.com/toyintheisaac/knex-blog-post.git && cd knex-blog-post`

### 2. Install Dependencies
`npm install` 

### 3. Configure Environment Variables
`PORT=3000` 

### 4.  Setup the Database
`npx knex migrate:latest --knexfile=src/knexfile.ts` 

### 5.  Setup the Database
`npm run dev` 

After setting up the project and database, you can test the API endpoints using Postman or cURL.

### 6. Run Tests
`npx jest --detectOpenHandles`

API Endpoints
Method	    Endpoint	        Description
POST	    /api/users	        Create a new user
GET	        /api/users	        Retrieve all users
GET	        /api/users/:id	    Get a specific user by ID
GET	        /api/users/count	Get total user count
POST	    /api/addresses	    Create a user address
GET	        /api/addresses/:userId	Get a user’s address
POST	    /api/posts	            Create a new blog post
GET	        /api/posts	            Retrieve all blog posts

Also here is a link to the postman documentation

https://documenter.getpostman.com/view/29522398/2sAYdkGUCY