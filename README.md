# Image Processing Backend

## 📌 Overview

This project is an **asynchronous image processing system** that takes a CSV file containing image URLs, compresses the images, stores them, and returns a processed CSV file. It uses **Node.js, Express.js, BullMQ (Redis), PostgreSQL, and Sharp**.

## 🚀 Features

- 📂 **CSV Upload** – Accepts a CSV file with image URLs.
- ⏳ **Asynchronous Processing** – Uses Redis queue (BullMQ) to handle background tasks.
- 🖼 **Image Compression** – Shrinks images by 50% using **Sharp**.
- 💾 **Database Storage** – Saves metadata in **PostgreSQL**.
- 🌍 **Cloud Storage** – Stores processed images in **AWS S3** (or local storage).
- ✅ **Status API** – Allows users to track the processing status.
- 🔔 **Webhook Notifications** – Notifies when processing is complete.

## 🛠 Tech Stack

- **Backend:** Node.js (Express.js)
- **Queue:** BullMQ (Redis)
- **Database:** PostgreSQL (Sequelize ORM)
- **Image Processing:** Sharp
- **Storage:** AWS S3 / Local Storage

## 📂 Folder Structure

```
📦 image-processing-backend
 ┣ 📂 src
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 services
 ┃ ┣ 📂 routers
 ┃ ┣ 📂 models
 ┣ 📜 app.js
 ┣ 📜 .env
 ┣ 📜 package.json
 ┣ 📜 README.md
```

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-repo/image-processing.git
cd image-processing
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file and add:

```ini
PORT=3000
DB_HOST='localhost'
DB_PORT=5432
DB_USER_NAME='postgres'
DB_DIALECT='postgres'
DB_DATABASE='postgres'
DB_PASSWORD='6xEwjlpC@123'
DB_LOGGING=false
REDIS_PORT=6379
REDIS_PASSWORD = 'redis password'
REDIS_USER_NAME = 'default'
```

### **4️⃣ Start Redis & PostgreSQL**

Ensure Redis and PostgreSQL are running:

```sh
redis-server  # Start Redis
```

### **5️⃣ Run the Server**

```sh
node app.js  # OR use pm2 for production
```

## 📌 API Endpoints

### **1️⃣ Upload CSV File** (`POST /upload`)

- **Request:** Multipart form with CSV file
- **Response:** `{ requestId: "12345-abcde" }`

### **2️⃣ Get Processing Status** (`GET /request/status/:requestId`)

- **Response:** `{ status: "processing", outputUrls: [] }`

### **3️⃣ Download Processed CSV** (`GET /download/:requestId`)

- Returns a **CSV file** with output image URLs.

## 🛠 Deployment

### **🚀 Deploy on AWS (EC2 + RDS)**

1. **Launch an EC2 instance**
2. **Install Node.js & Redis**
3. **Deploy PostgreSQL on AWS RDS**
4. **Run the backend & worker**

## 📜 License

This project is open-source under the **MIT License**.

---

📌 **Now, Your Image Processing Backend is Ready!** 🚀🔥

