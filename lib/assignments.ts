import type {
  AssessmentCategory,
  AssessmentResult,
  CategoryScore
} from "@/lib/assessment";

export const ASSIGNMENT_PROGRESS_STORAGE_KEY = "pathforge-assignment-progress";

export type AssignmentRubricItem = {
  criterion: string;
  points: number;
};

export type GeneratedAssignment = {
  id: string;
  title: string;
  category: AssessmentCategory;
  difficulty: "Easy" | "Medium" | "Hard";
  focus: string;
  whyAssigned: string;
  scenario: string;
  objective: string;
  estimatedTime: string;
  impact: number;
  requirements: string[];
  deliverables: string[];
  checklist: string[];
  rubric: AssignmentRubricItem[];
  submission: string[];
};

const fallbackCategoryScores: CategoryScore[] = [
  {
    category: "Technical Skills",
    score: 68,
    description: "Core implementation confidence across modern web work."
  },
  {
    category: "Projects & Practice",
    score: 46,
    description: "Portfolio depth, Git habits, and proof of hands-on work."
  },
  {
    category: "Problem Solving",
    score: 58,
    description: "Debugging, decomposition, and decision-making under uncertainty."
  },
  {
    category: "Career Readiness",
    score: 52,
    description: "Application readiness, communication, and role alignment."
  }
];

const assignmentLibrary: Record<AssessmentCategory, GeneratedAssignment[]> = {
  "Technical Skills": [
    {
      id: "skill-api-dashboard-widget",
      title: "Build a Skill Progress API Widget",
      category: "Technical Skills",
      difficulty: "Medium",
      focus: "React data flow and UI states",
      whyAssigned:
        "Your technical score needs stronger proof that you can build features with data, state, validation, and edge-case handling.",
      scenario:
        "A student dashboard needs a widget that shows skill progress fetched from an API. The widget must still look professional when data is loading, missing, or failing.",
      objective:
        "Build one production-style dashboard widget that fetches skill data and handles every visible state cleanly.",
      estimatedTime: "2-3 hours",
      impact: 8,
      requirements: [
        "Create a SkillProgressWidget component with typed skill data.",
        "Fetch data from a local mock API function or static async helper.",
        "Show loading, error, empty, and success states.",
        "Render at least 4 skills with progress bars and status labels.",
        "Keep the component reusable by passing data and labels through props where possible."
      ],
      deliverables: [
        "Working widget inside the dashboard or assignments page.",
        "A short note explaining how each UI state is handled.",
        "One screenshot of the success state and one screenshot of an edge state."
      ],
      checklist: [
        "Define the skill data type and mock API response",
        "Build the widget layout with success data",
        "Add loading, error, and empty state UI",
        "Add progress bars and status labels for each skill",
        "Write a 5-line implementation note"
      ],
      rubric: [
        { criterion: "Handles all UI states", points: 30 },
        { criterion: "Component structure is reusable", points: 25 },
        { criterion: "Visual polish and responsive layout", points: 20 },
        { criterion: "Clear explanation of decisions", points: 15 },
        { criterion: "Accessible labels and readable text", points: 10 }
      ],
      submission: [
        "Live page or localhost route where the widget appears.",
        "GitHub commit link or file list.",
        "Screenshots for success and edge states."
      ]
    },
    {
      id: "skill-form-validation",
      title: "Create a Validated Career Goal Form",
      category: "Technical Skills",
      difficulty: "Easy",
      focus: "Forms and validation",
      whyAssigned:
        "You need more evidence that you can turn user input into clean, predictable UI behavior.",
      scenario:
        "A student updates their target role and learning pace. The app should prevent incomplete data and give helpful feedback.",
      objective:
        "Build a compact form with validation, helpful error text, and a saved preview state.",
      estimatedTime: "60-90 min",
      impact: 5,
      requirements: [
        "Include fields for target role, current level, weekly hours, and learning pace.",
        "Validate required fields and weekly hours.",
        "Show inline error messages without breaking layout.",
        "Show a preview card after successful submit.",
        "Add a reset/edit path."
      ],
      deliverables: [
        "Working form component.",
        "Preview card generated from submitted values.",
        "Short validation checklist."
      ],
      checklist: [
        "Create the form fields",
        "Add validation rules",
        "Show inline errors",
        "Render submitted preview",
        "Test reset and edit behavior"
      ],
      rubric: [
        { criterion: "Validation correctness", points: 35 },
        { criterion: "User feedback clarity", points: 25 },
        { criterion: "Clean layout", points: 20 },
        { criterion: "State handling", points: 20 }
      ],
      submission: [
        "Route or component where the form can be tested.",
        "Screenshot of validation error and successful preview."
      ]
    }
  ],
  "Projects & Practice": [
    {
      id: "portfolio-proof-case-study",
      title: "Publish a Portfolio Case Study",
      category: "Projects & Practice",
      difficulty: "Hard",
      focus: "Project proof",
      whyAssigned:
        "Your project score is weak because your skills need visible proof: live link, GitHub link, screenshots, and explanation.",
      scenario:
        "A recruiter opens your portfolio for 60 seconds. They must quickly understand what you built, why it matters, and what technical decisions you made.",
      objective:
        "Turn one project into a polished case study that proves your target-role skills.",
      estimatedTime: "1-2 days",
      impact: 10,
      requirements: [
        "Choose one project aligned with your target role.",
        "Deploy it and confirm the live URL works on desktop and mobile.",
        "Write a case study with problem, users, features, tech stack, and tradeoffs.",
        "Add at least 3 screenshots or one short demo recording.",
        "Add GitHub link, live link, setup commands, and future improvements."
      ],
      deliverables: [
        "Live project URL.",
        "GitHub repository with README.",
        "Case study section or markdown file.",
        "Screenshots or demo media."
      ],
      checklist: [
        "Select a project and define the target role it supports",
        "Deploy the project and test the live URL",
        "Write problem, features, tech stack, and decisions",
        "Add screenshots and repository setup steps",
        "Add final links to portfolio or README"
      ],
      rubric: [
        { criterion: "Live project works reliably", points: 25 },
        { criterion: "Case study explains decisions", points: 25 },
        { criterion: "README is complete", points: 20 },
        { criterion: "Screenshots or demo are clear", points: 15 },
        { criterion: "Project matches target role", points: 15 }
      ],
      submission: [
        "Live project link.",
        "GitHub repository link.",
        "Case study or README link."
      ]
    },
    {
      id: "github-repo-professional-readme",
      title: "Upgrade One GitHub Repo to Internship Standard",
      category: "Projects & Practice",
      difficulty: "Easy",
      focus: "GitHub presentation",
      whyAssigned:
        "A project without a clear README looks unfinished even when the code is good.",
      scenario:
        "An interviewer opens your GitHub repository before a call. The README should answer what it is, how it works, and why it is worth reviewing.",
      objective:
        "Rewrite one README so the project looks review-ready and easy to run.",
      estimatedTime: "45-60 min",
      impact: 6,
      requirements: [
        "Add project overview in 3-4 lines.",
        "List core features and tech stack.",
        "Add install and run commands.",
        "Add screenshots or demo link.",
        "Add challenges, learnings, and next improvements."
      ],
      deliverables: [
        "Updated README.md.",
        "Screenshots or demo link.",
        "Before/after note."
      ],
      checklist: [
        "Write overview and feature list",
        "Add tech stack and setup commands",
        "Add screenshots or demo link",
        "Write learnings and improvements",
        "Proofread for clarity"
      ],
      rubric: [
        { criterion: "README explains the project clearly", points: 30 },
        { criterion: "Setup instructions work", points: 25 },
        { criterion: "Visual proof is included", points: 20 },
        { criterion: "Learnings show reflection", points: 15 },
        { criterion: "Formatting is clean", points: 10 }
      ],
      submission: [
        "GitHub repository link.",
        "One sentence describing the improvement made."
      ]
    }
  ],
  "Problem Solving": [
    {
      id: "debugging-incident-report",
      title: "Write a Debugging Incident Report",
      category: "Problem Solving",
      difficulty: "Medium",
      focus: "Debugging process",
      whyAssigned:
        "Your problem-solving score needs proof that you can diagnose issues methodically instead of guessing fixes.",
      scenario:
        "A dashboard page works locally but fails after deployment. You need to investigate and explain the root cause like an engineer on a team.",
      objective:
        "Complete a debugging drill and document the investigation path from symptom to fix.",
      estimatedTime: "90-120 min",
      impact: 7,
      requirements: [
        "Pick or simulate one broken feature.",
        "Record the symptom and expected behavior.",
        "Inspect at least 3 evidence sources: console, network, logs, env vars, build output, or data shape.",
        "Identify the root cause and write the fix.",
        "Add a prevention note."
      ],
      deliverables: [
        "Incident report with symptom, evidence, root cause, fix, and prevention.",
        "Screenshot or log snippet showing the issue.",
        "Commit or note showing the fix."
      ],
      checklist: [
        "Describe the broken behavior",
        "Collect evidence from at least 3 sources",
        "Write root cause in plain language",
        "Apply or describe the fix",
        "Add prevention checklist"
      ],
      rubric: [
        { criterion: "Investigation is structured", points: 30 },
        { criterion: "Evidence supports root cause", points: 25 },
        { criterion: "Fix is specific", points: 20 },
        { criterion: "Prevention note is practical", points: 15 },
        { criterion: "Report is readable", points: 10 }
      ],
      submission: [
        "Incident report text or markdown.",
        "Screenshot/log snippet.",
        "Fix commit or explanation."
      ]
    },
    {
      id: "feature-planning-brief",
      title: "Plan a Feature Before Coding",
      category: "Problem Solving",
      difficulty: "Easy",
      focus: "Task breakdown",
      whyAssigned:
        "Breaking work into clear steps will improve delivery quality and reduce stuck time.",
      scenario:
        "You are assigned a feature called Saved Opportunities. Before coding, you must define what done means.",
      objective:
        "Create a feature brief that turns a vague idea into implementation-ready tasks.",
      estimatedTime: "45 min",
      impact: 5,
      requirements: [
        "Write one user story.",
        "Define at least 5 acceptance criteria.",
        "List edge cases and empty states.",
        "Break the build into 6-8 implementation steps.",
        "Add a simple test checklist."
      ],
      deliverables: [
        "Feature brief markdown.",
        "Implementation checklist.",
        "Test checklist."
      ],
      checklist: [
        "Write user story",
        "Add acceptance criteria",
        "List edge cases",
        "Break into implementation steps",
        "Add test checklist"
      ],
      rubric: [
        { criterion: "User story is clear", points: 20 },
        { criterion: "Acceptance criteria are testable", points: 30 },
        { criterion: "Edge cases are realistic", points: 20 },
        { criterion: "Implementation steps are sequenced", points: 20 },
        { criterion: "Test checklist is useful", points: 10 }
      ],
      submission: [
        "Feature brief text or markdown.",
        "Implementation checklist."
      ]
    }
  ],
  "Career Readiness": [
    {
      id: "resume-project-section-rewrite",
      title: "Rewrite Resume Project Bullets",
      category: "Career Readiness",
      difficulty: "Medium",
      focus: "Resume proof",
      whyAssigned:
        "Your profile needs stronger proof of outcomes, not just a list of technologies.",
      scenario:
        "A recruiter scans your resume for 20 seconds. Your project bullets must show what you built, the stack, and the result.",
      objective:
        "Rewrite two project entries into outcome-focused resume bullets.",
      estimatedTime: "60-90 min",
      impact: 7,
      requirements: [
        "Choose two projects relevant to your target role.",
        "Write 2-3 bullets per project.",
        "Include action, technical detail, and outcome.",
        "Add live/GitHub links if available.",
        "Match keywords from one internship posting."
      ],
      deliverables: [
        "Before and after resume project bullets.",
        "Target internship posting link or copied requirements.",
        "Final project section ready to paste into resume."
      ],
      checklist: [
        "Choose two strongest projects",
        "Find one target internship posting",
        "Rewrite bullets with action, tech, and result",
        "Add links and keywords",
        "Review for clarity and length"
      ],
      rubric: [
        { criterion: "Bullets show impact", points: 30 },
        { criterion: "Technical details are specific", points: 25 },
        { criterion: "Role keywords are included naturally", points: 20 },
        { criterion: "Links and proof are present", points: 15 },
        { criterion: "Writing is concise", points: 10 }
      ],
      submission: [
        "Before bullets.",
        "After bullets.",
        "Target role or posting used."
      ]
    },
    {
      id: "internship-application-pack",
      title: "Create One Internship Application Pack",
      category: "Career Readiness",
      difficulty: "Easy",
      focus: "Role alignment",
      whyAssigned:
        "A targeted application will perform better than sending the same profile everywhere.",
      scenario:
        "You found an internship role. Build a small application pack that shows why you match it and what gaps you are improving.",
      objective:
        "Prepare one role-specific application pack with resume summary, proof links, and a short note.",
      estimatedTime: "45-75 min",
      impact: 6,
      requirements: [
        "Pick one internship role.",
        "Extract 5 required skills from the posting.",
        "Map each skill to a project, assignment, or honest gap.",
        "Write a 5-sentence application note.",
        "Choose 2 GitHub/portfolio links to include."
      ],
      deliverables: [
        "Role-skill match table.",
        "Short application note.",
        "Two proof links."
      ],
      checklist: [
        "Select one internship role",
        "Extract required skills",
        "Map skills to proof or gaps",
        "Write application note",
        "Attach proof links"
      ],
      rubric: [
        { criterion: "Role requirements are understood", points: 25 },
        { criterion: "Proof links match the role", points: 25 },
        { criterion: "Application note is specific", points: 25 },
        { criterion: "Gaps are handled honestly", points: 15 },
        { criterion: "Pack is easy to review", points: 10 }
      ],
      submission: [
        "Internship role title/company.",
        "Role-skill match table.",
        "Application note and proof links."
      ]
    }
  ]
};

function getSourceScores(result?: AssessmentResult | null) {
  return result?.categoryScores ?? fallbackCategoryScores;
}

function getAssignmentCount(score: number) {
  if (score < 55) {
    return 2;
  }

  return 1;
}

export function generateAssignmentsFromAssessment(
  result?: AssessmentResult | null
): GeneratedAssignment[] {
  const sortedScores = [...getSourceScores(result)].sort((a, b) => a.score - b.score);
  const selectedAssignments = sortedScores.flatMap((categoryScore) =>
    assignmentLibrary[categoryScore.category]
      .slice(0, getAssignmentCount(categoryScore.score))
      .map((assignment) => ({
        ...assignment,
        id: `${assignment.id}-${categoryScore.score}`
      }))
  );

  return selectedAssignments.slice(0, 5);
}
