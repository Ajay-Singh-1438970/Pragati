# 📘 **Pragati — Full-Stack MERN Application**

### User Auth • Admin Panel • Email Verification • Gmail SMTP • JWT • Secure Login

---

## 🚀 **Overview**

**Pragati** is a full-stack MERN application with:

* 👤 **User Signup & Login**
* 📧 **Email Verification (Gmail SMTP / App Password)**
* 🔐 **JWT Authentication**
* 🛠️ **Admin Panel**
* 🌐 **React Frontend with Vite**
* 🗄️ **Node.js + Express Backend**
* 🍃 **MongoDB Database**
* 🎨 **Modern UI + Bootstrap**
* ✔ Fully configurable via `.env`

---

# 📂 **Project Structure**

```
/project-root
│
├── /Pragati_Frontend      → React + Vite client
├── /Pragati_Backend       → Node.js + Express API
│── README.md
```

---

# ⚙️ **Installation & Setup**

## 1️⃣ Clone Repo

```bash
git clone https://github.com/Ajay-Singh-1438970/Pragati
cd Pragati
```

---

# 🖥️ **Backend Setup**

Go to backend folder:

```bash
cd Pragati_Backend
npm install
```

## Create `.env` inside **backend**:

```
PORT=5000

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Gmail SMTP
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Frontend URL
FRONTEND_URL=http://localhost:5173

# For frontend access
VITE_BACKEND_URL=http://localhost:5000
```

### Start Backend

```bash
npm start
```

---

# 🎨 **Frontend Setup**

Go to frontend:

```bash
cd Pragati_Frontend
npm install
```

## Create `.env` inside **frontend**:

```
VITE_BACKEND_URL=http://localhost:5000
```

### Start Frontend

```bash
npm run dev
```

---
# 🔐 **Authentication Flow**

### ✔ 1. User signs up

→ Verification email sent

### ✔ 2. User clicks verification link

→ `isVerified = true` in database

### ✔ 3. User logs in

→ Backend checks `isVerified`
→ JWT token generated
→ User redirected based on role:

* **admin → /admin**
* **user → /**

---

# 🗂️ **API Endpoints**

## 🔸 Auth Routes

### **POST /api/auth/signup**

Signup user + sends verification mail.

### **GET /api/auth/verify/:token**

Verify account through email link.

### **POST /api/auth/login**

Login after email verification.

---

# 👑 **Roles**

| Role      | Access        | Redirect |
| --------- | ------------- | -------- |
| **Admin** | Full access   | `/admin` |
| **User**  | Normal access | `/`      |

---

# 🧩 **Frontend Tech Stack**

* React + Vite
* Bootstrap
* Axios
* React Router
* Context API (AuthContext)
* Custom Login/Signup Modal

---

# 🧩 **Backend Tech Stack**

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* Nodemailer (Gmail SMTP)
* Middleware validation

---

# 🛠️ **Scripts**

### Backend

```bash
npm start
npm run dev  # if using nodemon
```

### Frontend

```bash
npm run dev
npm run build
```

 **Pragati MERN app** is now fully functional with:

✔ Authentication
✔ Email Verification
✔ JWT Login
✔ Admin/User Routing
✔ Gmail SMTP
