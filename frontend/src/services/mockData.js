// -----------------------------------------------------------------------
// mockData.js
// Centralized dummy data for the Knowio prototype.
// -----------------------------------------------------------------------

export const currentStudent = {
  id: "stu_1042",
  name: "Ashmi Rao",
  avatarInitials: "AR",
  streakDays: 6,
  todayProgressPercent: 62,
  topicsLearned: 18,
  weakAreas: ["Recursion", "Normalization", "Process Scheduling"],
};

export const subjects = [
  { id: "python", name: "Python", icon: "🐍", mastery: 74, topicCount: 12 },
  { id: "ai", name: "Artificial Intelligence", icon: "🧠", mastery: 58, topicCount: 10 },
  { id: "ml", name: "Machine Learning", icon: "📈", mastery: 49, topicCount: 14 },
  { id: "dbms", name: "DBMS", icon: "🗄️", mastery: 66, topicCount: 11 },
  { id: "os", name: "Operating Systems", icon: "⚙️", mastery: 41, topicCount: 9 },
  { id: "ds", name: "Data Structures", icon: "🌲", mastery: 70, topicCount: 13 },
];

export const topicsBySubject = {
  python: [
    { id: "variables", name: "Variables", mastery: 88 },
    { id: "loops", name: "Loops", mastery: 80 },
    { id: "functions", name: "Functions", mastery: 52 },
    { id: "oop", name: "OOP", mastery: 61 },
    { id: "file-handling", name: "File Handling", mastery: 44 },
    { id: "recursion", name: "Recursion", mastery: 28 },
  ],
  ai: [
    { id: "search-algorithms", name: "Search Algorithms", mastery: 70 },
    { id: "knowledge-rep", name: "Knowledge Representation", mastery: 55 },
    { id: "expert-systems", name: "Expert Systems", mastery: 60 },
    { id: "nlp-basics", name: "NLP Basics", mastery: 47 },
  ],
  ml: [
    { id: "regression", name: "Regression", mastery: 65 },
    { id: "classification", name: "Classification", mastery: 58 },
    { id: "overfitting", name: "Overfitting & Regularization", mastery: 40 },
    { id: "clustering", name: "Clustering", mastery: 51 },
  ],
  dbms: [
    { id: "er-model", name: "ER Model", mastery: 78 },
    { id: "normalization", name: "Normalization", mastery: 33 },
    { id: "transactions", name: "Transactions", mastery: 62 },
    { id: "indexing", name: "Indexing", mastery: 57 },
  ],
  os: [
    { id: "process-scheduling", name: "Process Scheduling", mastery: 30 },
    { id: "deadlocks", name: "Deadlocks", mastery: 45 },
    { id: "memory-management", name: "Memory Management", mastery: 52 },
    { id: "file-systems", name: "File Systems", mastery: 60 },
  ],
  ds: [
    { id: "arrays", name: "Arrays", mastery: 85 },
    { id: "linked-lists", name: "Linked Lists", mastery: 72 },
    { id: "trees", name: "Trees", mastery: 63 },
    { id: "graphs", name: "Graphs", mastery: 48 },
  ],
};

// -----------------------------------------------------------------------
// ADAPTIVE DIAGNOSTIC QUESTION BANK
// -----------------------------------------------------------------------

export const diagnosticQuestions = [
  {
    id: "q1",
    topicId: "functions",
    type: "mcq",
    difficulty: "easy",
    prompt: "Which keyword defines a function in Python?",
    options: ["func", "def", "function", "lambda"],
    answer: 1,
  },
  {
    id: "q2",
    topicId: "functions",
    type: "mcq",
    difficulty: "easy",
    prompt: "What is the purpose of a function?",
    options: [
      "Store data",
      "Repeat code",
      "Reuse a block of code",
      "Create variables",
    ],
    answer: 2,
  },
  {
    id: "q3",
    topicId: "functions",
    type: "mcq",
    difficulty: "medium",
    prompt: "What is the difference between a parameter and an argument?",
    options: [
      "No difference",
      "Parameter is in function definition, argument is passed during the call",
      "Parameter stores files",
      "Argument defines loops",
    ],
    answer: 1,
  },
  {
    id: "q4",
    topicId: "functions",
    type: "mcq",
    difficulty: "medium",
    prompt: "Why does a function print the value but return None?",
    options: [
      "Using return twice",
      "Using print instead of return",
      "Function is too short",
      "Python bug",
    ],
    answer: 1,
  },
  {
    id: "q5",
    topicId: "recursion",
    type: "mcq",
    difficulty: "hard",
    prompt: "What is the base case in recursion?",
    options: [
      "The first loop",
      "The stopping condition",
      "A variable",
      "A class",
    ],
    answer: 1,
  },
  {
    id: "q6",
    topicId: "recursion",
    type: "mcq",
    difficulty: "hard",
    prompt: "Why can excessive recursion crash a program?",
    options: [
      "Too many variables",
      "Stack Overflow",
      "Slow internet",
      "Memory leak only",
    ],
    answer: 1,
  },
];

// -----------------------------------------------------------------------
// KNOWLEDGE MIRROR
// -----------------------------------------------------------------------

export const knowledgeMirrorReport = {
  topic: "Functions & Recursion",
  subject: "Python",
  dimensions: [
    { key: "definitions", label: "Definitions", score: 86 },
    { key: "understanding", label: "Understanding", score: 64 },
    { key: "application", label: "Application", score: 47 },
    { key: "criticalThinking", label: "Critical Thinking", score: 38 },
    { key: "confidence", label: "Confidence", score: 71 },
    { key: "problemSolving", label: "Problem Solving", score: 42 },
  ],
  strengths: ["Definitions", "Loop syntax", "Variable scope basics"],
  weaknesses: ["Recursion", "Base case design", "Stack depth reasoning"],
  misconceptions: [
    'Believes "return" and "print" are interchangeable',
    "Assumes recursion always needs two base cases",
  ],
  missingPrerequisites: [
    "Call stack fundamentals",
    "Functions (parameter passing)",
  ],
};

// -----------------------------------------------------------------------
// LEARNING PATH
// -----------------------------------------------------------------------

export const learningPath = [
  { day: 1, title: "Revise Functions", focus: "Parameter passing & return values", minutes: 25, done: true },
  { day: 2, title: "Practice Recursion", focus: "Base case vs recursive case design", minutes: 35, done: true },
  { day: 3, title: "Coding Problems", focus: "Factorial, Fibonacci, sum of list", minutes: 40, done: false },
  { day: 4, title: "Mock Interview", focus: "Explain recursive solutions out loud", minutes: 20, done: false },
];

// -----------------------------------------------------------------------
// PROGRESS DATA
// -----------------------------------------------------------------------

export const growthSeries = [
  { week: "Wk 1", understanding: 40, application: 30 },
  { week: "Wk 2", understanding: 48, application: 36 },
  { week: "Wk 3", understanding: 55, application: 41 },
  { week: "Wk 4", understanding: 61, application: 47 },
  { week: "Wk 5", understanding: 68, application: 53 },
  { week: "Wk 6", understanding: 74, application: 60 },
];

export const weeklyImprovement = [
  { week: "Wk 1", gapClosed: 4 },
  { week: "Wk 2", gapClosed: 7 },
  { week: "Wk 3", gapClosed: 5 },
  { week: "Wk 4", gapClosed: 9 },
  { week: "Wk 5", gapClosed: 6 },
  { week: "Wk 6", gapClosed: 11 },
];

export const gapReduction = [
  { subject: "Python", before: 55, after: 26 },
  { subject: "AI", before: 62, after: 41 },
  { subject: "ML", before: 70, after: 49 },
  { subject: "DBMS", before: 48, after: 22 },
  { subject: "OS", before: 66, after: 44 },
];

export const recentAssessments = [
  { id: "a1", topic: "Recursion", subject: "Python", score: 42, date: "2026-07-27" },
  { id: "a2", topic: "Normalization", subject: "DBMS", score: 55, date: "2026-07-25" },
  { id: "a3", topic: "Process Scheduling", subject: "OS", score: 38, date: "2026-07-22" },
];

export const achievements = [
  { id: "ach1", label: "7-Day Streak", earned: false, progress: 6, target: 7 },
  { id: "ach2", label: "First Knowledge Mirror", earned: true },
  { id: "ach3", label: "Gap Closer (5 gaps resolved)", earned: true },
  { id: "ach4", label: "Recursion Tamed", earned: false, progress: 2, target: 5 },
];

export const completedTopics = [
  "Variables",
  "Loops",
  "ER Model",
  "Arrays",
  "Linked Lists",
  "Search Algorithms",
];