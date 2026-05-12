# Week 10: Backend Basics - Node.js & Express

## Author
- **Name:** Gatuku Simon
- **GitHub:** [@gatukusimon6-stack](https://github.com/gatukusimon6-stack)
- **Date:** April 2026

## Project Description
CommunityHub API — A RESTful backend server built with Node.js and Express. This project covers server-side JavaScript fundamentals, including routing, middleware, CRUD operations, error handling, and request/response management. The API powers a community platform with full posts management.

## Technologies Used
- Node.js
- Express.js
- dotenv (environment variables)
- nodemon (development tool)

## Features
- **Express Server Setup** — Running server with configurable port
- **RESTful Posts API** — Full CRUD operations (GET, POST, PUT, DELETE)
- **Route Parameters** — Fetch single posts by ID (`/api/posts/:id`)
- **Query Strings** — Filter by author, sort by newest/popular, paginate results
- **Request Body Parsing** — JSON body handling with `express.json()` middleware
- **Input Validation** — Checks for required fields (title, content, author)
- **Custom Middleware** — Logger middleware for request tracking
- **Error Handling** — Proper HTTP status codes and error responses
- **Health Check Endpoint** — `/api/health` for API status monitoring
- **Like Functionality** — PATCH endpoint to increment post likes

## Lessons Learned
- How to set up an Express server
- Building RESTful APIs with proper status codes
- Using middleware for logging, validation, and error handling
- Organizing code with MVC pattern (routes, controllers)
- Environment variable management with dotenv

## Challenges Faced
- Understanding middleware execution order
- Implementing proper error handling with async operations
- Structuring the project for scalability
