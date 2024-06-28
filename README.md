MUSE.IO

Muse.io is a single-page application (SPA) built with React, enabling users to explore museums and their details. The app features user authentication with encrypted passwords, allowing users to create accounts, log in, add reviews to museums, and delete their reviews.

Admins have the capability to manage museum entries by creating, editing, and deleting them. The backend, developed with ExpressJS, MongoDB, and Mongoose, provides a REST API with routes for CRUD actions across three database models: users, museums, and reviews. The app includes backend validation, centralized error handling, and is styled using Tailwind CSS.

This project was created as part of Ironhacks Web Dev Bootcamp. June 2024

API Documentation
# Routes Structure

- **Routes**:
    - User: Sign-up, log-in, log-out, verify, admin
    - Museum: CRUD operations for museums (admin only).
    - Reviews: CRUD operations for reviews.
    - UserList: CRUD operations for personal lists (users)
    
    **Museum Routes**
    
    | HTTP VERB | URL | REQUEST BODY | ACTION |
    | --- | --- | --- | --- |
    | GET | /museums | (empty) | Returns all museums |
    | GET | /museums/:museumId | (empty) | Returns the specified museum |
    | POST | /museums | JSON | Creates a new museum |
    | PUT | /museums/:museumId | JSON | Edits the specified project |
    | DELETE | /museums/:museumsId | (empty) | Deletes the specified project |
    
    **User Routes**
    
    | HTTP VERB | URL | REQUEST BODY | ACTION |
    | --- | --- | --- | --- |
    | POST | /signup | JSON
    { "email": "string", "username": "string", "password": "string" } | Creates a new user |
    | P0ST | /login | JSON
    { "email": "string", "username": "string", "password": "string" } | Logins user |
    | GET | /verify | (empty) | Verifies if user is logged in and returns user details |
    | GET | /admin | (empty) | Verifies if user is an admin and returns user details |
    |  |  |  | Logs out user |
    
    **Reviews Routes**
    
    | HTTP VERB | URL | REQUEST BODY | ACTION |
    | --- | --- | --- | --- |
    | POST | /:museumId | JSON
     | Creates a review for a specific museum |
    | DELETE | /:reviewId | (empty)
     | Deletes a specific review |

# Models Structure

**Museum Model**

| museumSchema |  |
| --- | --- |
| name: | { type: String, required: true, unique: true }, |
| location: | { type: String, required: true } |
| image:  | {
type: String,
default:
"https://assets-global.website-files.com/642d682a6e4ca0d303c81fdf/65155692e2dc9f25a8fa90a5_ezgif.com-resize.webpmuseumimage.com",
}, |
| description: | { type: String, required: true } |
| artType: | { type: String, required: true, |
| website: | { type: String, required, true }, |
| reviews: | [{ type: Schema.Types.ObjectId, ref: "Review" }], |
| {
timestamps:
} | true, |

**User Model**

| userSchema |  |
| --- | --- |
| username | { type: String,
unique: true,
required: true,
maxLength: 20,
minLength: 4,
trim: true, } |
| email | { type: String,
unique: true,
required: true,
maxLength: 50,
trim: true, } |
| password |  { type: String, required: true, minLength: 8 }, |
| reviews | [{ type: Schema.Types.ObjectId, ref: "Review" }], |
| isAdmin | { type: Boolean, default: false }, |
| timestamps | timestamps: true, |

**Review Model**

| reviewSchema |  |
| --- | --- |
| title: | { type: String, required: true, trim: true, maxLength: 64 }, |
| review: | {
type: String,
required: true,
trim: true,
maxLength: 200,
minLength: 20,
}, |
| rating: | { type: Number,
required: true,
enum: [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
}, |
| museum: | { type: Schema.Types.ObjectId, ref: "museum", required: true } |
| creator: | { type: Schema.Types.ObjectId, ref: "User" } |
| timestamps: | true, |
