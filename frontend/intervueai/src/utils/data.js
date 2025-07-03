import {
  LuBookmark,
  LuBrain,
  LuLightbulb,
  LuShield,
  LuTarget,
} from "react-icons/lu";

export const CARD_BG = [
  { id: 1, bgcolor: "linear-gradient(135deg, #e6f8f3 0%, #f7fcfa 100%)" },
  { id: 2, bgcolor: "linear-gradient(135deg, #fef9e7 0%, #fffdf4 100%)" },
  { id: 3, bgcolor: "linear-gradient(135deg, #eaf7ff 0%, #f3fbff 100%)" },
  { id: 4, bgcolor: "linear-gradient(135deg, #fff2e9 0%, #fff8f3 100%)" },
  { id: 5, bgcolor: "linear-gradient(135deg, #e7f6fe 0%, #f4fafd 100%)" },
  { id: 6, bgcolor: "linear-gradient(135deg, #f5f5f5 0%, #fbfbfb 100%)" },
  { id: 7, bgcolor: "linear-gradient(135deg, #fff4fc 0%, #fff8fd 100%)" },
  { id: 8, bgcolor: "linear-gradient(135deg, #e8fef3 0%, #f5fef8 100%)" },
  { id: 9, bgcolor: "linear-gradient(135deg, #f0ecff 0%, #f7f5ff 100%)" },
  { id: 10, bgcolor: "linear-gradient(135deg, #fef2f2 0%, #fff8f8 100%)" },
];

export const APP_FEATURES = [
  {
    id: "01",
    title: "AI-Powered Question Generation",
    description:
      "Get personalized interview questions tailored to your target role, experience level, and industry focus areas.",
    icon: LuBrain,
    iconClass: "text-blue-500",
  },
  {
    id: "02",
    title: "Smart Session Management",
    description:
      "Create focused prep sessions with role-specific scenarios, track your progress, and resume where you left off.",
    icon: LuTarget,
    iconClass: "text-green-500",
  },
  {
    id: "03",
    title: "Bookmark & Organize",
    description:
      "Pin important questions, add personal notes, and build your custom study library for maximum retention.",
    icon: LuBookmark,
    iconClass: "text-purple-500",
  },
  {
    id: "04",
    title: "Deep Learning Insights",
    description:
      "Unlock detailed explanations for every question with our 'Learn More' feature - understand the why behind each answer.",
    icon: LuLightbulb,
    iconClass: "text-yellow-500",
  },
  {
    id: "05",
    title: "Secure & Private",
    description:
      "Your prep data is protected with enterprise-grade JWT authentication and secure cloud storage.",
    icon: LuShield,
    iconClass: "text-red-500",
  },
];
