# Namada & Co Advocates Backend API

This is the backend API for Namada Co Advocates, a legal services platform that connects clients with advocates and allows for appointment scheduling, calendar management, and review collection. The backend is built using **Node.js**, **Express**, and **MongoDB**, and supports JWT-based authentication for advocates.

---

## 📦 Tech Stack

- **Node.js** + **Express.js** – Server-side framework
- **MongoDB** + **Mongoose** – Database and ORM
- **JWT (JSON Web Token)** – Authentication
- **bcrypt** – Password hashing
- **dotenv** – Environment variable management


---

## 📚 API Routes

### ✅ Advocates

**Base route:** `/advocates`

| Method | Route          | Description                           | Protected |
|--------|----------------|---------------------------------------|-----------|
| POST   | `/`            | Register a new advocate (hashes password) | ❌ No     |
| POST   | `/login`       | Logs in an advocate and returns JWT   | ❌ No     |
| GET    | `/`            | Get all advocates                     | ❌ No     |

➡️ **Note:** During login, a JWT token is returned that lasts for **12 hours**.

---

### ✅ Clients

**Base route:** `/clients`

| Method | Route  | Description           |
|--------|--------|-----------------------|
| POST   | `/`    | Register a new client |
| GET    | `/`    | Get all clients       |

---

### ✅ Appointments

**Base route:** `/appointments`

| Method | Route  | Description                                      |
|--------|--------|--------------------------------------------------|
| POST   | `/`    | Create an appointment (also adds to calendar)   |
| GET    | `/`    | Get all appointments                            |

---

### ✅ Calendar

**Base route:** `/calendar`

| Method | Route     | Description                                    | Protected |
|--------|-----------|------------------------------------------------|-----------|
| POST   | `/`       | Create a calendar entry                        | ❌ No     |
| GET    | `/`       | Get all calendar entries                       | ❌ No     |
| GET    | `/my`     | Get calendar entries for logged-in advocate    | ✅ Yes    |

To access `/calendar/my`, send a GET request with a **valid JWT token** in the `Authorization` header:

```http
Authorization: Bearer <your_token_here>
```

---

### ✅ Reviews

**Base route:** `/reviews`

| Method | Route  | Description           |
|--------|--------|-----------------------|
| POST   | `/`    | Add a review          |
| GET    | `/`    | Get all reviews       |

---

## 🧪 Testing the API

You can use **Postman** or **cURL** to test the endpoints. Be sure to:

- Set `Content-Type: application/json` for POST requests.
- Send the JWT token in the `Authorization` header for protected routes.

---

## ✅ Future Improvements

- Frontend client for booking appointments
- Admin dashboard
- Email notifications
- Role-based access control

---

## 📬 Contact

Created with 💻 by Namada Jr

Feel free to [reach out](https://namadajr.vercel.app) for questions or collaborations!


