export const BASE_URL = "https://intervue-ai-backend.onrender.com";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // create a new user account
    LOGIN: "/api/auth/login", // user login and token generation
    GET_PROFILE: "/api/auth/profile", // fetch user profile info
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // upload user profile image
  },

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions", // generate q&a for interviews
    GENERATE_EXPLANATION: "/api/ai/generate-explanation", // generate explanation for concepts
  },

  SESSION: {
    CREATE: "/api/sessions", // start a new interview session
    GET_ALL: "/api/sessions/my-sessions", // get all saved sessions
    GET_ONE: (id) => `/api/sessions/${id}`, // fetch session by id
    DELETE: (id) => `/api/sessions/${id}`, // remove session by id
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add", // insert questions into a session
    PIN: (id) => `/api/questions/${id}/pin`, // toggle pin on a question
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // add or update notes
  },
};
