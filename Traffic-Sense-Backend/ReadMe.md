## 👥 Project Team & Contributions
TrafficSense was developed as a collaborative Final Year Project by Group 15.

* **Mahin Nadir (Me)**: System Co-Architect & AI Engineer. Developed the core machine learning models for real-time object detection and assisted in designing of the integrated hardware  interfaces. Research paper writing and product marketing design.

* **Warisha Aslam Feroz**: Co-Developer & Data Analyst. Contributed to data preprocessing and project documentation.

* **Syed Muhammad Wahaj Ul Haq**: System Architect Backend Software Engineer. Implemented the API server boilerplate and initial routing architecture. Developed the machine learning models for real-time object detection. Implemented the baseline Express.js routing architecture and authentication boilerplate.

# TrafficSense - Automated Real-Time Traffic Control System

*Note: This repository serves as my personal portfolio showcase to demonstrate how my AI integration and Web App development integrate into a production-ready Node/Express backend infrastructure.*

---

## 🛠️ Installation & Setup Guide

Follow these steps to clone, configure, and run the backend server locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 1. Install Dependencies
Navigate into the backend project root folder and install the required packages using Node Package Manager (`npm`):
```bash
npm install

### 2. Environment Variables Configuration
The server relies on environment variables for security. Create a file named .env in the root of the backend directory and configure the following parameters:

Code snippet
PORT = 5000
MONGODB_URI = your_mongodb_connection_string_here
CRYPT_SECRET = your_encryption_secret
JWT_SECRET = your_jwt_token_secret
JWT_EXPIRES_IN = 90d

### 3. Run the Server
To launch the backend server in development mode with live-reload support (nodemon), execute:

Bash
npm start

### Running Tests
This boilerplate includes an automated testing framework powered by Jest. To execute the test suites, run:

Bash
npm test
