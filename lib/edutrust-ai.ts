export type ChatMode = "assistant" | "tutor" | "career";

export type EduTrustMessage = {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: string;
  suggestions?: string[];
};

export const quickActions = [
  "Career Guidance",
  "Course Recommendations",
  "Exam Preparation",
  "Study Resources",
  "College Information"
];

export function createMessage(
  role: EduTrustMessage["role"],
  content: string,
  suggestions?: string[]
): EduTrustMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    }),
    suggestions
  };
}

export function getWelcomeMessage(): EduTrustMessage {
  return createMessage(
    "ai",
    "👋 Hi! I'm EduTrust AI Assistant. How can I help you today?",
    quickActions
  );
}

export function getTimeGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function generateEduTrustResponse(prompt: string, mode: ChatMode) {
  const input = prompt.toLowerCase();

  if (mode === "career" || input.includes("career") || input.includes("salary")) {
    return {
      content:
        "Based on your interests, start by mapping three things: subjects you enjoy, skills you already have, and the type of work environment you want. Strong options include AI/Data Science, UX Design, Cybersecurity, Product Management, Cloud Engineering, and Digital Marketing. A good next step is to pick one path, learn the core tools for 6-8 weeks, build two portfolio projects, and compare entry-level roles. Typical starting ranges vary by country and college, but skill-backed portfolios can improve your chances quickly.",
      suggestions: [
        "Which career fits my interests?",
        "Show skills for AI/Data Science",
        "Create a 3-month career roadmap"
      ]
    };
  }

  if (mode === "tutor" || input.includes("explain") || input.includes("quiz")) {
    return {
      content:
        "Tutor mode: let us break this into simple steps. First, identify the core idea. Second, connect it to one real example. Third, solve a small practice question. Fourth, check the mistake pattern. If you share a topic, I can explain it step by step, create a five-question quiz, and give corrections after each answer.",
      suggestions: [
        "Explain machine learning simply",
        "Generate a quiz on this topic",
        "Help me correct my mistakes"
      ]
    };
  }

  if (input.includes("exam") || input.includes("preparation") || input.includes("study")) {
    return {
      content:
        "For exam preparation, use a 40-40-20 plan: spend 40% of time learning concepts, 40% solving previous questions, and 20% revising mistakes. Keep daily sessions short and measurable: one topic, one timed practice set, one error log. In the final week, focus on mock tests, formula sheets, and sleep consistency.",
      suggestions: [
        "Make a 7-day exam plan",
        "Give me study resources",
        "How do I improve retention?"
      ]
    };
  }

  if (input.includes("course") || input.includes("recommend")) {
    return {
      content:
        "For course recommendations, choose by outcome: foundation, job skill, or specialization. If you are exploring, begin with Python, communication, data literacy, and problem solving. If you want job readiness, add projects, internships, GitHub or portfolio work, and interview practice. Tell me your class, degree, and goal, and I will personalize the roadmap.",
      suggestions: [
        "Recommend courses for beginners",
        "Build my learning roadmap",
        "What skills should I learn first?"
      ]
    };
  }

  if (input.includes("college") || input.includes("university")) {
    return {
      content:
        "When comparing colleges, look beyond ranking. Check accreditation, placement quality, faculty projects, lab access, internship pipelines, alumni outcomes, scholarships, location, and total cost. A smart shortlist has three safe options, three target options, and two ambitious options.",
      suggestions: [
        "How do I shortlist colleges?",
        "What should I ask admissions?",
        "Compare course vs college brand"
      ]
    };
  }

  return {
    content:
      "I can help with courses, careers, colleges, exams, skills, and learning paths. For a personalized answer, share your current class or degree, your goal, your strongest subjects, and how much time you can study each week.",
    suggestions: [
      "Create my learning roadmap",
      "Suggest career options",
      "Help me prepare for exams"
    ]
  };
}
