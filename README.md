# 🎙️ IntervueAI

**Transforming Interviews Into Seamless Success Stories**

IntervueAI is a comprehensive interview preparation platform that empowers candidates to prepare smarter with AI-generated questions, detailed explanations, and an intuitive user experience. Built with a modern tech stack to ensure high performance and seamless deployment.

---

## 🚀 Features

- 🤖 **AI-Powered Question Generation** – Get personalized interview questions tailored to your target role, experience level, and industry focus areas.
- 🎯 **Role-Specific Preparation** – Practice with questions designed for your specific job role, from software engineering to product management.
- 📚 **Deep Learning Insights** – Unlock detailed explanations for every question with our 'Learn More' feature, understand the why behind each answer.
- ⭐ **Smart Organization** – Pin important questions, add personal notes to track what you've learned, and build your custom study library for maximum retention.
- 📄 **Export Sessions to PDF** – Easily export questions and answers from any session to a PDF. Remove questions you don’t need and save your personalized practice sets offline.
- ⚙️ **Component-Based Architecture** – Modular React components for questions, notes, profiles, explanations, and more.
- 🔐 **Secure User Management** – User authentication, profiles, and secure session handling.
- 📡 **Robust API Integration** – Node.js + Express backend with centralized API endpoints, powered by Axios for smooth frontend-backend communication.
- 💎 **Rich UI Elements** – Beautiful reusable modals, Components, skeleton loaders, and responsive layouts with Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Cloud)
- **File Storage:** Cloudinary (for uploading and serving profile images)
- **API Client:** Axios
- **Deployment:**
  - Frontend: [Vercel](https://vercel.com)
  - Backend: [Render.com](https://render.com)
- **CRON Job:** Keeps the backend server active by sending a request every 14 minutes (configured in `config/cron.js`)

---

## 🔐 Authentication

IntervueAI uses secure **JWT (JSON Web Tokens)** for user authentication.

### Signup Flow:

1. User enters name, email, password and profile image (optional).
2. App validates fields.
3. Sends data to backend.
4. Backend checks for duplicates and stores the user.
5. JWT token is generated and sent back.
6. Token stored locally.
7. User is redirected to dashboard.

### Login Flow:

1. User enters email, password.
2. App sends credentials to backend.
3. Credentials are verified.
4. If valid, JWT token is returned.
5. Token is stored, and session starts.

---

## 📂 Project Structure

### 📁 `backend/` (Node.js + Express)

- **`config/`**: Configuration files.
  - `cloudinary.js`: Configuration for Cloudinary (image uploads).
  - `cron.js`: Sets up a CRON job to ping the server every 14 minutes, keeping it active on Render.com.
  - `db.js`: MongoDB connection setup.
- **`controllers/`**: Business logic handlers.
  - `aiController.js`: Handles AI-powered question generation and concept explanations using Google GenAI.
  - `authController.js`: Manages user registration, login, and profile retrieval.
  - `questionController.js`: Handles adding questions to sessions, toggling pin status, and updating notes.
  - `sessionController.js`: Manages session creation, retrieval, and deletion.
- **`middlewares/`**: Custom middleware.
  - `authMiddleware.js`: JWT authentication middleware to protect routes.
  - `uploadMiddleware.js`: Middleware for handling image uploads using Multer.
- **`models/`**: MongoDB schemas.
  - `Question.js`: Schema for interview questions with fields for session reference, question, answer, note, and pin status.
  - `Session.js`: Schema for user sessions with fields for user reference, role, experience, topics, description, and linked questions.
  - `User.js`: Schema for users with fields for name, email, password, and profile image URL.
- **`routes/`**: API routes.
  - `authRoutes.js`: Handles `/auth` routes for registration, login, profile retrieval, and image uploads.
  - `questionRoutes.js`: Handles `/questions` routes for adding questions, pinning, and updating notes.
  - `sessionRoutes.js`: Handles `/sessions` routes for creating, retrieving, and deleting sessions.
- **`uploads/`**: Directory for uploaded files.
- **`utils/`**: Utility functions.
  - `prompts.js`: Contains predefined prompts for AI question generation and concept explanations.
- **`.env`**: Environment variables (MongoDB URI, JWT secret, Gemini API key, Cloudinary credentials, etc.).
- **`.gitignore`**: Git ignore file.
- `package-lock.json`: Dependency lock file.
- `package.json`: Backend dependencies and scripts.
- `server.js`: Main Express app setup, mounts all routes, and starts the server.

### 📁 `frontend/` (Vite + React)

- **assets/**
  - `favicon.ico`: Favicon.
  - `vite.svg`: Vite logo.
- **components/**
  - `Cards/`
    - `ProfileCard.jsx`: Profile card component for user profile.
    - `QuestionCard.jsx`: Question card component to render the individual question with pin toggle, note update and learn more functionality.
    - `SummaryCard.jsx`: Summary card component to render the session card in dashboard.
  - `Inputs/`
    - `ProfilePhotoSelector.jsx`: Profile photo selector to select the profile image while doing signup.
    - `Input.jsx`: Generic input component for forms with dynamic icons
  - `layouts/`
    - `Navbar.jsx`: Navigation bar component.
  - `Loader/`
    - `LoaderOverlay.jsx`: Loader overlay component.
    - `QuestionCardSkeleton.jsx`: Question card skeleton.
    - `RoleInfoHeaderSkeleton.jsx`: Question header skeleton.
    - `SkeletonLoading.jsx`: Skeleton loading component.
    - `SummaryCardSkeleton.jsx`: Summary card skeleton component.
  - `DeleteAlertContent.jsx`: Delete alert component.
  - `Drawer.jsx`: Drawer component.
  - `ErrorMessage.jsx`: Error message component.
  - `Modal.jsx`: Modal component.
- **context/**
  - `userContext.jsx`: Manages user authentication state and JWT token.
- **pages/**
  - `Auth/`
    - `Login.jsx`: Login page form handling with validation.
    - `SignUp.jsx`: Sign up page form handling with validation.
  - `Home/`
    - `CreateSessionForm.jsx`: Create session form.
    - `Dashboard.jsx`: Dashboard page for displaying user sessions.
  - `InterviewPrep/`
    - `InterviewPrep.jsx`: Interview prep page which shows the generated question and also able to generate explanation of each question in detail.
  - `components/`
    - `AIResponsePreview.jsx`: AI response preview.
    - `NoteForm.jsx`: Note form component.
    - `PDFExportModal.jsx`: PDF export modal.
    - `RoleInfoHeader.jsx`: Role info header.
    - `LandingPage.jsx`: Landing page introducing IntervueAI features, with call-to-action buttons
- **utils/**
  - `api.js`: API utility.
  - `axiosInstance.js`: Axios instance configuration.
  - `convertMarkdownToHtml.js`: Markdown to HTML converter.
  - `data.js`: Data utility.
  - `helper.js`: Helper functions.
  - `uploadImage.js`: Image upload utility.
- `App.jsx`: Main file where all the routes/pages are handled
- `.env`: Environment variables.
- `.gitignore`: Git ignore file.
- `index.html`: Main HTML file.
- `package-lock.json`: Dependency lock file.
- `package.json`: Project dependencies and scripts.
- `vite.config.js`: Vite configuration.

---

## 🧪 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm
- MongoDB (Cloud or local instance)

---

### 🔧 Backend Setup

The backend is located in the `backend` directory and uses Node.js with Express.js. Refer to the [Project Structure](#-project-structure) for the folder layout.

#### Backend Routes

- **`/auth`** (defined in `authRoutes.js`):
  - `POST /auth/register`: Register a new user.
  - `POST /auth/login`: Authenticate a user and return a JWT.
  - `GET /auth/profile`: Get user profile (protected).
  - `POST /auth/upload-image`: Upload user profile image.
- **`/sessions`** (defined in `sessionRoutes.js`):
  - `POST /sessions`: Create a new session (protected).
  - `GET /sessions/my-sessions`: Get all sessions for the authenticated user (protected).
  - `GET /sessions/:id`: Get a session by ID (protected).
  - `DELETE /sessions/:id`: Delete a session by ID (protected).
- **`/questions`** (defined in `questionRoutes.js`):
  - `POST /questions/add`: Add questions to a session (protected).
  - `POST /questions/:id/pin`: Toggle pin status of a question (protected).
  - `POST /questions/:id/note`: Update note for a question (protected).
- **`/api/ai`** (defined in `aiController.js`):
  - `POST /api/ai/generate-questions`: Generate interview questions (protected).
  - `POST /api/ai/generate-explanation`: Generate concept explanation (protected).

#### Steps to Run Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following:

   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   API_URL=your_render.com_api_deployed_url
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   > This uses `nodemon` to automatically restart the server on changes.

The backend will run on `http://localhost:5000`.

---

### Frontend Setup

The frontend is located in the `frontend` directory and is built with Vite and React. Refer to the [Project Structure](#-project-structure) for the folder layout.

#### Steps to Run Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

   ```bash
   cd intervueai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`.

---

## 🛠️ Development Notes

- **Backend:** Deployed on Render.com with CRON pings to keep active.
- **Frontend:** Deployed on Vercel with Vite for fast development.
- **Database:** MongoDB stores user, session, and question data.
- **CORS:** Backend configured for frontend requests.

---

## 📸 Preview

| Landing Page                                                     | Login/Signup/Dashboard Page                                                                                                                                                                             |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Home](/frontend/intervueai/src/assets/Images/Landing-page.png) | ![Login](/frontend/intervueai/src/assets/Images/Login.png)<br/>![Signup](/frontend/intervueai/src/assets/Images/Signup.png)<br/>![Dashboard](/frontend/intervueai/src/assets/Images/Dashboard-page.png) |

| Interview Prep Page                                                               | Interview Prep With Explanations                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Interview Prep](/frontend/intervueai/src/assets/Images/Interview-prep-page.png) | ![Explanation 1](/frontend/intervueai/src/assets/Images/Explanation-1.png)<br/>![Explanation 1](/frontend/intervueai/src/assets/Images/Explanation-2.png)<br/>![Explanation 1](/frontend/intervueai/src/assets/Images/Explanation-3.png) |

| Full PDF                                                   | Deleted Question PDF                                       | Export as PDF                                              |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| ![PDF-1](/frontend/intervueai/src/assets/Images/PDF-1.png) | ![PDF-2](/frontend/intervueai/src/assets/Images/PDF-2.png) | ![PDF-3](/frontend/intervueai/src/assets/Images/PDF-3.png) |

---
