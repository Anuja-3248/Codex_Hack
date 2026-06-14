export type SkillAnalysis = {
  overallScore: number;
  currentLevel: "Beginner" | "Intermediate" | "Advanced";
  careerReadiness: number;
  strengths: string[];
  weaknesses: string[];
  summary: string;
};

export type Assignment = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  progress: number;
  focus: string;
};

export type Opportunity = {
  id: string;
  role: string;
  company: string;
  location: string;
  matchScore: number;
  requiredSkills: string[];
  type: "Remote" | "Hybrid" | "On-site";
};

export type AssessmentQuestion = {
  id: number;
  category: "Frontend Development" | "Backend Development" | "Data Science" | "AI/ML";
  question: string;
  options: string[];
  answer: string;
};

export function generateSkillAnalysis(): SkillAnalysis {
  return {
    overallScore: 72,
    currentLevel: "Intermediate",
    careerReadiness: 72,
    strengths: ["React", "JavaScript", "REST APIs"],
    weaknesses: ["Redux", "Testing", "Performance Optimization"],
    summary:
      "You have strong frontend fundamentals but need improvement in testing, state management, and application scalability."
  };
}

export function generateAssignments(): Assignment[] {
  return [
    {
      id: "redux-task-manager",
      title: "Build a Redux Task Manager",
      difficulty: "Medium",
      description: "Create a task manager using React and Redux Toolkit.",
      progress: 35,
      focus: "State Management"
    },
    {
      id: "react-performance",
      title: "React Performance Optimization",
      difficulty: "Hard",
      description: "Improve rendering speed using memoization and lazy loading.",
      progress: 12,
      focus: "Application Scalability"
    },
    {
      id: "testing-fundamentals",
      title: "Testing Fundamentals",
      difficulty: "Easy",
      description: "Write unit tests using Jest.",
      progress: 64,
      focus: "Testing"
    }
  ];
}

export function generateCareerReadiness() {
  return {
    score: 72,
    level: "Intermediate",
    skillProgress: [
      { skill: "React", value: 90 },
      { skill: "JavaScript", value: 85 },
      { skill: "Redux", value: 45 },
      { skill: "Testing", value: 35 },
      { skill: "Next.js", value: 60 }
    ],
    milestones: [
      { title: "Assessment Completed", status: "complete" },
      { title: "Skill Analysis Generated", status: "complete" },
      { title: "Assignments Finished", status: "active" },
      { title: "Internship Ready", status: "upcoming" }
    ]
  };
}

export function generateOpportunities(): Opportunity[] {
  return [
    {
      id: "frontend-intern",
      role: "Frontend Developer Intern",
      company: "NovaStack Labs",
      location: "Remote",
      matchScore: 92,
      requiredSkills: ["React", "Next.js", "APIs"],
      type: "Remote"
    },
    {
      id: "react-intern",
      role: "React Engineering Intern",
      company: "PixelFoundry",
      location: "Bengaluru",
      matchScore: 88,
      requiredSkills: ["React", "Redux", "Testing"],
      type: "Hybrid"
    },
    {
      id: "fullstack-fellow",
      role: "Full Stack Fellow",
      company: "OrbitLearn",
      location: "Pune",
      matchScore: 84,
      requiredSkills: ["Next.js", "Node.js", "REST APIs"],
      type: "On-site"
    },
    {
      id: "ai-product-intern",
      role: "AI Product Intern",
      company: "SignalMind AI",
      location: "Remote",
      matchScore: 79,
      requiredSkills: ["Prompting", "Data Analysis", "UX"],
      type: "Remote"
    },
    {
      id: "qa-automation",
      role: "QA Automation Intern",
      company: "TestPilot",
      location: "Hyderabad",
      matchScore: 76,
      requiredSkills: ["Jest", "Playwright", "Debugging"],
      type: "Hybrid"
    },
    {
      id: "web-platform",
      role: "Web Platform Intern",
      company: "CloudNorth",
      location: "Delhi NCR",
      matchScore: 74,
      requiredSkills: ["Performance", "Accessibility", "Next.js"],
      type: "Hybrid"
    }
  ];
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    category: "Frontend Development",
    question: "Which React hook is commonly used for memoizing expensive calculations?",
    options: ["useMemo", "useRef", "useReducer", "useLayoutEffect"],
    answer: "useMemo"
  },
  {
    id: 2,
    category: "Frontend Development",
    question: "What does Next.js App Router use for nested route UI?",
    options: ["layouts", "reducers", "schemas", "plugins"],
    answer: "layouts"
  },
  {
    id: 3,
    category: "Frontend Development",
    question: "Which tool helps measure Core Web Vitals in a browser?",
    options: ["Lighthouse", "ESLint", "Prisma", "Docker"],
    answer: "Lighthouse"
  },
  {
    id: 4,
    category: "Backend Development",
    question: "Which HTTP method is usually used to create a new resource?",
    options: ["POST", "GET", "PATCH", "OPTIONS"],
    answer: "POST"
  },
  {
    id: 5,
    category: "Backend Development",
    question: "What is a common reason to use pagination in an API?",
    options: [
      "Reduce large response payloads",
      "Disable authentication",
      "Avoid type safety",
      "Force client reloads"
    ],
    answer: "Reduce large response payloads"
  },
  {
    id: 6,
    category: "Backend Development",
    question: "Which storage model is best for relational data?",
    options: ["SQL database", "PNG file", "CSS variable", "Browser event"],
    answer: "SQL database"
  },
  {
    id: 7,
    category: "Data Science",
    question: "What does a correlation coefficient help describe?",
    options: [
      "Relationship between variables",
      "CSS specificity",
      "Network latency",
      "Component hierarchy"
    ],
    answer: "Relationship between variables"
  },
  {
    id: 8,
    category: "Data Science",
    question: "Which chart is best for comparing categorical values?",
    options: ["Bar chart", "Password field", "HTTP header", "Git branch"],
    answer: "Bar chart"
  },
  {
    id: 9,
    category: "AI/ML",
    question: "What is overfitting in machine learning?",
    options: [
      "A model memorizes training data too closely",
      "A server scales horizontally",
      "A UI component renders lazily",
      "A database index is missing"
    ],
    answer: "A model memorizes training data too closely"
  },
  {
    id: 10,
    category: "AI/ML",
    question: "Which metric is commonly used for classification models?",
    options: ["Accuracy", "Z-index", "Bundle size", "Port number"],
    answer: "Accuracy"
  }
];
