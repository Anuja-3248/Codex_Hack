export const ASSESSMENT_STORAGE_KEY = "pathforge-assessment-result";

export type AssessmentProfile = {
  careerGoal: string;
  currentLevel: string;
  learningPace: string;
};

export type AssessmentCategory =
  | "Technical Skills"
  | "Projects & Practice"
  | "Problem Solving"
  | "Career Readiness";

export type AssessmentOption = {
  label: string;
  score: number;
};

export type AssessmentQuestion =
  | {
      id: string;
      category: AssessmentCategory;
      type: "choice";
      prompt: string;
      detail: string;
      options: AssessmentOption[];
    }
  | {
      id: string;
      category: AssessmentCategory;
      type: "rating";
      prompt: string;
      detail: string;
      lowLabel: string;
      highLabel: string;
    };

export type AssessmentSection = {
  id: string;
  title: AssessmentCategory;
  description: string;
  questions: AssessmentQuestion[];
};

export type AssessmentAnswerMap = Record<string, string | number>;

export type CategoryScore = {
  category: AssessmentCategory;
  score: number;
  description: string;
};

export type AssessmentResult = {
  profile: AssessmentProfile;
  overallScore: number;
  readiness: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  strengths: string[];
  weaknesses: string[];
  recommendedFocus: string;
  summary: string;
  categoryScores: CategoryScore[];
  completedAt: string;
};

export const careerGoalOptions = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "ai-ml", label: "AI/ML Engineer" },
  { value: "data", label: "Data Analyst" },
  { value: "fullstack", label: "Full Stack Developer" }
];

export const currentLevelOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" }
];

export const learningPaceOptions = [
  { value: "steady", label: "Steady" },
  { value: "focused", label: "Focused" },
  { value: "intensive", label: "Intensive" }
];

export const assessmentSections: AssessmentSection[] = [
  {
    id: "technical",
    title: "Technical Skills",
    description: "Core implementation confidence across modern web work.",
    questions: [
      {
        id: "react-confidence",
        category: "Technical Skills",
        type: "rating",
        prompt: "React component and state confidence",
        detail: "Rate your comfort with props, state, hooks, and reusable components.",
        lowLabel: "Still learning",
        highLabel: "Confident"
      },
      {
        id: "api-integration",
        category: "Technical Skills",
        type: "choice",
        prompt: "API integration approach",
        detail: "Choose the closest match to how you connect UI to backend data.",
        options: [
          { label: "I have not connected APIs yet", score: 1 },
          { label: "I can call APIs with examples", score: 2 },
          { label: "I handle loading, error, and success states", score: 4 },
          { label: "I design clean data flows and edge cases", score: 5 }
        ]
      },
      {
        id: "code-quality",
        category: "Technical Skills",
        type: "choice",
        prompt: "Production-ready frontend signal",
        detail: "Pick the practice you use most consistently.",
        options: [
          { label: "I focus mainly on making the screen work", score: 2 },
          { label: "I split UI into clear components", score: 3 },
          { label: "I add accessibility, validation, and empty states", score: 4 },
          { label: "I include tests, performance checks, and review notes", score: 5 }
        ]
      }
    ]
  },
  {
    id: "projects",
    title: "Projects & Practice",
    description: "Portfolio depth, Git habits, and proof of hands-on work.",
    questions: [
      {
        id: "portfolio-depth",
        category: "Projects & Practice",
        type: "choice",
        prompt: "Project portfolio depth",
        detail: "Choose the option closest to your current proof of work.",
        options: [
          { label: "No complete project yet", score: 1 },
          { label: "One guided/tutorial project", score: 2 },
          { label: "Two or more self-built projects", score: 4 },
          { label: "Deployed projects with clear case studies", score: 5 }
        ]
      },
      {
        id: "git-workflow",
        category: "Projects & Practice",
        type: "rating",
        prompt: "Git and GitHub workflow",
        detail: "Rate your comfort with commits, branches, pull requests, and README files.",
        lowLabel: "Basic commits",
        highLabel: "Team ready"
      }
    ]
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    description: "Debugging, decomposition, and decision-making under uncertainty.",
    questions: [
      {
        id: "debugging",
        category: "Problem Solving",
        type: "choice",
        prompt: "Debugging a deployment issue",
        detail: "A feature works locally but fails after deployment. What do you do first?",
        options: [
          { label: "Restart and hope it works", score: 1 },
          { label: "Search the exact error and try a random fix", score: 2 },
          { label: "Check logs, env vars, network calls, and build output", score: 5 },
          { label: "Rewrite the feature from scratch", score: 1 }
        ]
      },
      {
        id: "decomposition",
        category: "Problem Solving",
        type: "rating",
        prompt: "Breaking down larger tasks",
        detail: "Rate your ability to split a broad feature into smaller deliverables.",
        lowLabel: "Need structure",
        highLabel: "Very structured"
      }
    ]
  },
  {
    id: "career",
    title: "Career Readiness",
    description: "Application readiness, communication, and role alignment.",
    questions: [
      {
        id: "career-assets",
        category: "Career Readiness",
        type: "choice",
        prompt: "Resume, GitHub, and LinkedIn readiness",
        detail: "Select the option that best describes your current career assets.",
        options: [
          { label: "Not created yet", score: 1 },
          { label: "Created but incomplete", score: 2 },
          { label: "Updated with projects and skills", score: 4 },
          { label: "Tailored for target roles with project proof", score: 5 }
        ]
      },
      {
        id: "role-fit",
        category: "Career Readiness",
        type: "choice",
        prompt: "Checking internship fit",
        detail: "When reading a role description, how do you decide if it fits?",
        options: [
          { label: "I apply if the title sounds interesting", score: 2 },
          { label: "I compare required skills with my current projects", score: 4 },
          { label: "I map gaps, update my resume, and plan practice tasks", score: 5 },
          { label: "I avoid applying unless I know every skill", score: 2 }
        ]
      }
    ]
  }
];

const categoryGuidance: Record<
  AssessmentCategory,
  { strength: string; weakness: string; focus: string }
> = {
  "Technical Skills": {
    strength: "Technical fundamentals",
    weakness: "Core implementation confidence",
    focus: "Build one feature that includes API data, loading states, validation, and reusable components."
  },
  "Projects & Practice": {
    strength: "Portfolio proof",
    weakness: "Project depth and Git workflow",
    focus: "Ship one polished project with a README, screenshots, deployment link, and clear commit history."
  },
  "Problem Solving": {
    strength: "Structured problem solving",
    weakness: "Debugging and task breakdown",
    focus: "Practice debugging from logs and split each feature into small, testable tasks before coding."
  },
  "Career Readiness": {
    strength: "Career presentation",
    weakness: "Role alignment and application readiness",
    focus: "Update your resume, GitHub, and LinkedIn around one target role and map gaps from three job posts."
  }
};

function getQuestionScore(question: AssessmentQuestion, answer: string | number) {
  if (question.type === "rating") {
    return Number(answer);
  }

  return question.options.find((option) => option.label === answer)?.score ?? 0;
}

export function calculateAssessmentResult(
  profile: AssessmentProfile,
  answers: AssessmentAnswerMap
): AssessmentResult {
  const categoryScores = assessmentSections.map((section) => {
    const total = section.questions.reduce((sum, question) => {
      const answer = answers[question.id];

      return answer === undefined ? sum : sum + getQuestionScore(question, answer);
    }, 0);
    const max = section.questions.length * 5;
    const score = Math.round((total / max) * 100);

    return {
      category: section.title,
      score,
      description: section.description
    };
  });

  const overallScore = Math.round(
    categoryScores.reduce((sum, category) => sum + category.score, 0) /
      categoryScores.length
  );
  const readiness = Math.max(0, Math.min(100, overallScore));
  const level =
    readiness >= 82 ? "Advanced" : readiness >= 56 ? "Intermediate" : "Beginner";
  const sortedScores = [...categoryScores].sort((a, b) => b.score - a.score);
  const strengths = sortedScores
    .filter((category) => category.score >= 70)
    .slice(0, 2)
    .map((category) => categoryGuidance[category.category].strength);
  const weaknessScores = [...categoryScores].sort((a, b) => a.score - b.score);
  const weaknesses = weaknessScores
    .slice(0, 2)
    .map((category) => categoryGuidance[category.category].weakness);
  const recommendedFocus = categoryGuidance[weaknessScores[0].category].focus;
  const normalizedStrengths =
    strengths.length > 0 ? strengths : [categoryGuidance[sortedScores[0].category].strength];

  return {
    profile,
    overallScore,
    readiness,
    level,
    strengths: normalizedStrengths,
    weaknesses,
    recommendedFocus,
    summary: `You are currently at ${level.toLowerCase()} readiness with the strongest signal in ${sortedScores[0].category.toLowerCase()} and the biggest growth area in ${weaknessScores[0].category.toLowerCase()}.`,
    categoryScores,
    completedAt: new Date().toISOString()
  };
}
