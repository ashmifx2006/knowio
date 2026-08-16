// -----------------------------------------------------------------------
// api.js
// Uses FastAPI when available, otherwise falls back to mock data.
// Stores logged-in user in localStorage so each user sees their own name.
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

const STORAGE_KEY = "knowio_student";

// ---------------- Local Storage Helpers ----------------

function saveStudent(student) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
}

function getStoredStudent() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : currentStudent;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

// ---------------- Generic Fetch Helper ----------------

async function fetchWithFallback(url, options, fallbackData) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error("API Error");

    return await res.json();
  } catch {
    await delay();
    return fallbackData;
  }
}

// ---------------- AUTH ----------------

export async function login(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    if (data.student) saveStudent(data.student);

    return data;
  } catch {
    await delay();

    // Create a user from the email if backend isn't running
    const name = email.split("@")[0];

    const student = {
      ...currentStudent,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      avatarInitials: name.slice(0, 2).toUpperCase(),
    };

    saveStudent(student);

    return {
      token: "mock-jwt-token",
      student,
    };
  }
}

export async function register(name, email, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    if (data.student) saveStudent(data.student);

    return data;
  } catch {
    await delay();

    const student = {
      ...currentStudent,
      name,
      avatarInitials: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    };

    saveStudent(student);

    return {
      token: "mock-jwt-token",
      student,
    };
  }
}

// ---------------- DASHBOARD ----------------

export async function getStudentOverview() {
  return fetchWithFallback(`${BASE_URL}/students/me`, {}, {
    student: getStoredStudent(),
    recentAssessments,
  });
}

// ---------------- SUBJECTS ----------------

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

// ---------------- ASSESSMENT ----------------

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

// ---------------- KNOWLEDGE MIRROR ----------------

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

// ---------------- PROGRESS ----------------

export async function getProgressCharts() {
  return fetchWithFallback(`${BASE_URL}/progress/me`, {}, {
    growthSeries,
    weeklyImprovement,
    gapReduction,
  });
}

// ---------------- PROFILE ----------------

export async function getProfile() {
  return fetchWithFallback(`${BASE_URL}/students/me/profile`, {}, {
    student: getStoredStudent(),
    achievements,
    completedTopics,
  });
}