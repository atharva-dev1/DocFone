# 🏥 DocFone - The Future of Healthcare

<img width="1919" height="931" alt="image" src="https://github.com/user-attachments/assets/e24d63fa-b04e-4a9f-94f5-abac81cb08f8" />

---
> A futuristic, diverse, and intelligent medical platform connecting patients with top specialists. Built with a premium **MERN Stack** (MongoDB, Express, React, Node.js) architecture.

## 🚀 Overview

**DocFone** is a state-of-the-art web application designed to simplify healthcare management. It bridges the gap between patients and doctors through a seamless, glassmorphic UI and powerful backend features like real-time chat, OCR prescription scanning, and smart appointment scheduling.

## ✨ Key Features

### 🎨 Frontend (UI/UX)
*   **Futuristic Design**: Glassmorphism, 3D floating cards, and smooth Framer Motion animations.
*   **Responsive**: Fully optimized for Desktop, Tablet, and Mobile devices (using `dvh` for mobile browsers).
*   **Interactive Dashboards**:
    *   **Patient Hub**: Timeline of events, health summary cards, and quick actions.
    *   **Doctor Console**: Schedule management, appointment requests, and availability toggle.
*   **Smart Booking**: Calendar-based appointment slot selection.

### ⚙️ Backend (API & Logic)
*   **Secure Auth**: JWT-based authentication with Role-Based Access Control (RBAC) for Patients, Doctors, and Admins.
*   **Real-time Chat**: `Socket.io` powered instant messaging between doctors and patients.
*   **Prescription OCR**: Upload a prescription image, and our AI (`Tesseract.js`) extracts medicine names automatically.
*   **Geo-Search**: Find doctors near you using MongoDB Geospatial queries.

## 🛠️ Tech Stack

### Frontend
*   **React 19** + **Vite**: Blazing fast SPA framework.
*   **Tailwind CSS**: Utility-first styling with custom animations.
*   **Framer Motion**: Complex layout transitions and micro-interactions.
*   **Lucide React**: Modern, consistent icon set.

### Backend
*   **Node.js** + **Express**: Robust REST API architecture.
*   **MongoDB** + **Mongoose**: NoSQL database with complex schemas.
*   **Socket.io**: Real-time bi-directional event communication.
*   **Tesseract.js**: Optical Character Recognition (OCR) for images.
*   **Cloudinary**: Secure cloud storage for medical records/images.

## 📦 Installation & Setup

### Prerequisites
*   Node.js (v18+)
*   MongoDB Atlas Account
*   Cloudinary Account

### 1. Clone the Repository
```bash
git clone https://github.com/atharva-dev1/Medyxra.git
cd Medyxra
```

### 2. Frontend Setup
```bash
npm install
npm run dev
```
> The frontend will run on `http://localhost:5173`

### 3. Backend Setup
Navigate to the server directory:
```bash
cd server
npm install
```

Create a `.env` file in the `/server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:
```bash
npm run dev
```
> The server will run on `http://localhost:5000`

## 🧪 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new Patient/Doctor |
| **POST** | `/api/auth/login` | Login and get JWT Token |
| **GET** | `/api/doctors` | Search doctors (supports text & geo searches) |
| **POST** | `/api/appointments` | Book a new appointment slot |
| **POST** | `/api/prescriptions` | Upload Rx image & extract text |
| **GET** | `/api/chat` | Fetch user conversations |

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by Atharva & Team
</p>
