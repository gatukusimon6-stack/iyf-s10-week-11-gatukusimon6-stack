# Week 11: Database Integration & Authentication

---

## Author
- **Name:** Gatuku Simon
- **GitHub:** [@gatukusimon6-stack](https://github.com/gatukusimon6-stack)
- **Date:** April 2026

---

## Project Description
CommunityHub API — Now with real data persistence and user authentication! This week the in-memory store from Week 10 is replaced with MongoDB Atlas, and JWT-based authentication is added so users can register, log in, and manage their own posts securely.

---

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas (cloud database)
- Mongoose (ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- dotenv (environment variables)
- Postman / Thunder Client (API testing)

---

## Features
- **MongoDB Atlas Integration** — Cloud-hosted NoSQL database with Mongoose ODM
- **Post Model** — Full CRUD with validation, indexing, and timestamps
- **Comment Model** — Linked to posts via MongoDB references
- **User Model** — Registration with password hashing (bcryptjs), email validation
- **JWT Authentication** — Register, login, and protected routes
- **Auth Middleware** — `protect`, `optionalAuth`, `restrictTo` for role-based access
- **User-Post Relationship** — Posts linked to authenticated users, ownership checks
- **Advanced Queries** — Text search, filtering, sorting, pagination
- **Instance & Static Methods** — Custom Mongoose methods (`.like()`, `.findByAuthor()`)
- **Virtual Populate** — Comments populated on posts without storing in document
- **Proper Error Handling** — Validation errors, CastError, JWT errors

---

## Project Structure
iyf-s10-week-11-gatukusimon6-stack/
├── src/

│   ├── config/

│   │   └── database.js           # MongoDB connection

│   ├── controllers/

│   │   ├── postsController.js    # Post CRUD with Mongoose

│   │   ├── commentsController.js # Comment CRUD

│   │   └── authController.js     # Register, login, getMe

│   ├── middleware/

│   │   ├── logger.js

│   │   ├── errorHandler.js

│   │   ├── validate.js

│   │   └── auth.js               # JWT protect, restrictTo

│   ├── models/                  

│   │   ├── Post.js               # Post schema with validation

│   │   ├── Comment.js            # Comment schema

│   │   └── User.js               # User schema with password hashing

│   ├── routes/

│   │   ├── posts.js              # Post routes (public + protected)

│   │   ├── auth.js               # Auth routes

│   │   └── index.js 

│   └── app.js

├── server.js                     # Connect DB, then start server

├── package.json

├── .env                          # Secrets (not tracked)

├── .env.example

├── .gitignore

└── README.md

---

## How to Run

### Prerequisites
- Node.js installed
- MongoDB Atlas account (free tier)
- Week 10 project as base (or start fresh)

### Installation
1. Clone this repository
   ```bash
   git clone https://github.com/gatukusimon6-stack/iyf-s10-week-11-gatukusimon6-stack.git
   cd iyf-s10-week-11-gatukusimon6-stack
   
2.Install dependencies
bash

npm install

3.Set up environment variables
bash

cp .env.example .env
Edit .env with your values:
env

PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/community-hub?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d

4.Start the server
bash

npm run dev            

### or

npm start              

## API Endpoints
### Authentication
| Method | Endpoint             | Auth         | Description              |
| ------ | -------------------- | ------------ | ------------------------ |
| POST   | `/api/auth/register` | Public       | Register new user        |
| POST   | `/api/auth/login`    | Public       | Login and get JWT token  |
| GET    | `/api/auth/me`       | Bearer Token | Get current user profile |

## Posts
| Method | Endpoint              | Auth         | Description                            |
| ------ | --------------------- | ------------ | -------------------------------------- |
| GET    | `/api/posts`          | Public       | Get all posts (filter, sort, paginate) |
| GET    | `/api/posts/:id`      | Public       | Get single post                        |
| POST   | `/api/posts`          | Bearer Token | Create post (linked to user)           |
| PUT    | `/api/posts/:id`      | Bearer Token | Update own post only                   |
| DELETE | `/api/posts/:id`      | Bearer Token | Delete own post only                   |
| PATCH  | `/api/posts/:id/like` | Public       | Like a post                            |

## Comments
| Method | Endpoint                                 | Auth         | Description             |
| ------ | ---------------------------------------- | ------------ | ----------------------- |
| GET    | `/api/posts/:postId/comments`            | Public       | Get comments for a post |
| POST   | `/api/posts/:postId/comments`            | Bearer Token | Add comment to post     |
| DELETE | `/api/posts/:postId/comments/:commentId` | Bearer Token | Delete comment          |

## Query Parameters (Posts)
| Param      | Example         | Description                         |
| ---------- | --------------- | ----------------------------------- |
| `?author=` | `?author=simon` | Filter by author                    |
| `?search=` | `?search=node`  | Text search in title/content        |
| `?sort=`   | `?sort=popular` | Sort: `newest`, `oldest`, `popular` |
| `?page=`   | `?page=1`       | Pagination page                     |
| `?limit=`  | `?limit=10`     | Items per page                      |

## Lessons Learned
### Lesson 21: MongoDB & Data Persistence
MongoDB Atlas Setup — Creating cloud clusters, whitelisting IPs, getting connection strings
Mongoose ODM — Schemas, models, validation, middleware (pre-save hooks)
CRUD Operations — find(), findById(), create(), findByIdAndUpdate(), findByIdAndDelete()
Advanced Queries — Text search ($text), filtering, sorting, pagination (skip/limit)
Relationships — MongoDB references (ref) and virtual populate for comments
Instance Methods — Custom methods on documents (.like(), .comparePassword())
Static Methods — Custom methods on models (.findByAuthor())
Error Handling — ValidationError, CastError for invalid ObjectIds
### Lesson 22: User Authentication with JWT
- Password Hashing — bcryptjs with salt rounds for secure storage
- JWT Tokens — Signing with secret, setting expiration, verifying tokens
- Auth Middleware — Extracting Bearer tokens, verifying JWT, attaching user to request
- Protected Routes — Requiring authentication for create/update/delete operations
- Role-Based Access — restrictTo() middleware for admin-only routes
- Ownership Checks — Ensuring users can only edit/delete their own posts
- Security Best Practices — select: false on password, proper error messages
## Challenges Faced
- MongoDB Connection Errors — Initial connection failures due to IP whitelist. Solved by adding 0.0.0.0/0 to Atlas network access for development.
- Password Hashing Timing — Forgot that bcrypt.hash() is async. Solved by using async/await in the Mongoose pre('save') middleware.
- JWT Secret Management — Hardcoded secret in early testing. Solved by moving to .env and adding .env to .gitignore.
- Ownership Validation — Comparing ObjectIds with === failed because they're objects. Solved by converting to strings: post.author.toString() !== req.user._id.toString().
- Populate on Create — New posts didn't show author info immediately. Solved by calling .populate('author') after saving.

## Live Demo / Repository
Repository: https://github.com/gatukusimon6-stack/iyf-s10-week-11-gatukusimon6-stack
