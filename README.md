# Event Management System

An Event Management System built with Node.js, Express.js, and MongoDB. This system allows admins to create events, manage user participation, and handle waitlists with first-come, first-served logic.

## Table of Contents

- [Features that could be added](#features-that-could-be-added)
- [Structure](#structure)
- [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)

---

## Features that could be added

- **Pagination while fetching the events**
- **Login for participants**
- **Adding logic to remove events from db after they have taken place using ttl**
- **Using better authentication**
- **Using different seed for hashing password everytime**

---

## Structure

- **app.js:** Entry point of the application.
- **config/db.js:** Database connection configuration.
- **dbModels/Event.js:** Mongoose schema for Event & Admin.
- **routes/events.js:** Defines API routes for events.
- **routes/admin.js:** Defines API routes for admin.
- **controllers/eventController.js:** Contains logic for each route.
- **middleware/adminAuth.js:** Admin Authorisation middleware .

---

## Installation

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RSpec25/Unolo-RishitSehgal
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Rename `.env.sample` file in the root directory add mongo url, port, jwt_secret**


4. **Get seed data by running the following command**

  ```bash
   npm run seed:local
   ```

5. **Start the dev server:**

   ```bash
   npm run dev
   ```

   - The server will run on `http://localhost:5000` by default.

---

## Usage

### API Endpoints

#### Base URL - health check

```
http://localhost:5000/
```

#### Admin Login URL
  - Default Admin username:- admin123 / password:- admin123 (send this in req body to login)
  - login with admin to get token to do following things
    - Create new admin
    - Add events
```
http://localhost:5000/admin/login       // for log-in and getting token

```
  - **Request Body For Login:**

  ```json
  {
   "username": "admin123",
   "password": "admin123",
  }
  ```
  - **Response body for login:**

  ```json
  {
    "Msg": "token @gvgvguvu^%kbhjbhjv"
  }
  ```
  - ***Use token in subsequent request to create and add events***
```
http://localhost:5000/admin/create      // for creating other admins, only admin can create admins
http://localhost:5000/admin/add/event   // for adding events
```

#### 1. Getting All Events

- **Endpoint:** `GET /events`
- **Response:**

  ```json
  {
    "events": { /* events object */ }
  }
  ```

#### 2. Adding Event

- **Endpoint:** `POST /admin/add/event`
- **Description:** Admins create a new event.
- **Request Headers:**

  ```http
  Content-Type: application/json
  Authorisation: {token}
  ```

- **Request Body:**

  ```json
  {
   "title": "Tech Meetup",
   "date": "2024-10-15T14:30:00Z",
   "location": "New York",
   "maxParticipants": 100
  }
  ```

- **Response:**

  ```json
  {
    "message": "Event created successfully",
    "event": { /* event object */ }
  }
  ```

#### 3. Join Event

- **Endpoint:** `POST events/:eventId/join`
- **Description:** Users join an event.
- **Request Headers:**

  ```http
  Content-Type: application/json
  ```

- **Request Body:**

  ```json
  {
    "user": "participant-1"
  }
  ```

- **Response:**

  - **If added to confirmed participants:**

    ```json
    {
      "message": "Added to confirmed participants"
    }
    ```

  - **If added to waitlist:**

    ```json
    {
      "message": "Added to waitlist"
    }
    ```

  - **If user already joined:**

    ```json
    {
      "error": "User already joined the event"
    }
    ```

#### 4. View Participants

- **Endpoint:** `GET events/:eventId/participants`
- **Description:** View confirmed and waitlisted participants.
- **Response:**

  ```json
  {
    "confirmedParticipants": ["participant-1", "participant-2"],
    "waitlistParticipants": ["participant-3"]
  }
  ```

#### 5. Cancel Participation

- **Endpoint:** `POST events/:eventId/cancel`
- **Description:** Users cancel their participation.
- **Request Headers:**

  ```http
  Content-Type: application/json
  ```

- **Request Body:**

  ```json
  {
    "user": "participant-1"
  }
  ```

- **Response:**

  - **If participation cancelled:**

    ```json
    {
      "message": "Participation cancelled"
    }
    ```

  - **If removed from waitlist:**

    ```json
    {
      "message": "Removed from waitlist"
    }
    ```

  - **If user not found:**

    ```json
    {
      "error": "User not found in participants list"
    }
    ```

---
