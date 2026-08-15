// -----------------------------------------------------------------------
// api.js
// Uses FastAPI when available, otherwise falls back to mock data.
// -----------------------------------------------------------------------

import {
  currentStudent,
  subjects,
  topicsBySubject,
  diagnosticQuestions,
  knowledgeMirrorReport,
  learningPath,
  growthSeries,
  weeklyImprovement,
  gapReduction,
  recentAssessments,
  achievements,
  completedTopics,
} from "./mockData";

export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Generic fetch helper with mock fallback
async function fetchWithFallback(url, options, fallbackData) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error("API Error");

    return await res.json();
  } catch (error) {
    await delay();
    return fallbackData;
  }
}

// ------------------- AUTH -------------------

export async function login(email, password) {
  return fetchWithFallback(
    `${BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
    {
      token: "mock-jwt-token",
      student: currentStudent,
    }
  );
}

export async function register(name, email, password) {
  return fetchWithFallback(
    `${BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    },
    {
      token: "mock-jwt-token",
      student: { ...currentStudent, name },
    }
  );
}

// ------------------- DASHBOARD -------------------

export async function getStudentOverview() {
  return fetchWithFallback(
    `${BASE_URL}/students/me`,
    {},
    { student: currentStudent, recentAssessments }
  );
}

// ------------------- SUBJECTS -------------------

export async function getSubjects() {
  return fetchWithFallback(`${BASE_URL}/subjects`, {}, subjects);
}

export async function getTopics(subjectId) {
  return fetchWithFallback(
    `${BASE_URL}/subjects/${subjectId}/topics`,
    {},
    topicsBySubject[subjectId] || []
  );
}

// ------------------- ASSESSMENT -------------------

export async function getDiagnosticQuestions(topicId) {
  return fetchWithFallback(
    `${BASE_URL}/assessment/${topicId}/questions`,
    {},
    diagnosticQuestions.filter(
      (q) => q.topicId === topicId || q.topicId === "functions"
    )
  );
}

export async function submitAssessment(topicId, answers) {
  return fetchWithFallback(
    `${BASE_URL}/assessment/${topicId}/submit`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    },
    knowledgeMirrorReport
  );
}

// ------------------- KNOWLEDGE MIRROR -------------------

export async function getKnowledgeMirror(topicId) {
  return fetchWithFallback(
    `${BASE_URL}/analysis/${topicId}`,
    {},
    knowledgeMirrorReport
  );
}

export async function getLearningPath(topicId) {
  return fetchWithFallback(
    `${BASE_URL}/learning-path/${topicId}`,
    {},
    learningPath
  );
}

// ------------------- PROGRESS -------------------

export async function getProgressCharts() {
  return fetchWithFallback(
    `${BASE_URL}/progress/me`,
    {},
    {
      growthSeries,
      weeklyImprovement,
      gapReduction,
    }
  );
}

// ------------------- PROFILE -------------------

export async function getProfile() {
  return fetchWithFallback(
    `${BASE_URL}/students/me/profile`,
    {},
    {
      student: currentStudent,
      achievements,
      completedTopics,
    }
  );
}