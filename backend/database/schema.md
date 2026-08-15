# Knowio — MongoDB Schema (Design Only)

This describes the intended collections for the production backend. The
current prototype does not write to MongoDB; routes return mock data shaped
to match these documents so the switch-over is mostly a data-access change,
not an API contract change.

---

## `students`
```json
{
  "_id": "ObjectId",
  "name": "Ashmi ",
  "email": "ashmi@college.edu",
  "password_hash": "bcrypt-hash",
  "avatar_initials": "AR",
  "streak_days": 6,
  "created_at": "ISODate",
  "last_active_at": "ISODate"
}
```

## `subjects`
```json
{
  "_id": "python",
  "name": "Python",
  "icon": "🐍",
  "topic_count": 12
}
```

## `topics`
```json
{
  "_id": "recursion",
  "subject_id": "python",
  "name": "Recursion",
  "prerequisites": ["functions", "call-stack-fundamentals"]
}
```

## `questions`
Diagnostic question bank, tagged by topic and difficulty so an adaptive
selector can pull an increasingly-hard sequence.
```json
{
  "_id": "q5",
  "topic_id": "recursion",
  "type": "application",
  "difficulty": "Hard",
  "prompt": "Write the base case and recursive case you would use to sum a list of numbers recursively.",
  "options": null
}
```

## `assessments`
One document per diagnostic attempt — the raw record the diagnosis engine
reads to produce a `knowledge_mirrors` report.
```json
{
  "_id": "ObjectId",
  "student_id": "ObjectId",
  "topic_id": "recursion",
  "answers": { "q1": "student's raw text", "q2": "def" },
  "started_at": "ISODate",
  "submitted_at": "ISODate"
}
```

## `knowledge_mirrors`
The diagnosis output — one per assessment attempt.
```json
{
  "_id": "ObjectId",
  "student_id": "ObjectId",
  "assessment_id": "ObjectId",
  "topic_id": "recursion",
  "dimensions": [
    { "key": "definitions", "label": "Definitions", "score": 86 },
    { "key": "criticalThinking", "label": "Critical Thinking", "score": 38 }
  ],
  "strengths": ["Definitions", "Loop syntax"],
  "weaknesses": ["Recursion", "Base case design"],
  "misconceptions": ["Believes return and print are interchangeable"],
  "missing_prerequisites": ["Call stack fundamentals"],
  "generated_at": "ISODate"
}
```

## `learning_paths`
Generated from a `knowledge_mirrors` document's weaknesses/prerequisites.
```json
{
  "_id": "ObjectId",
  "student_id": "ObjectId",
  "topic_id": "recursion",
  "days": [
    { "day": 1, "title": "Revise Functions", "focus": "Parameter passing", "minutes": 25, "done": true },
    { "day": 2, "title": "Practice Recursion", "focus": "Base case design", "minutes": 35, "done": false }
  ],
  "created_at": "ISODate"
}
```

## `progress_snapshots`
Weekly rollups powering the Progress Dashboard charts.
```json
{
  "_id": "ObjectId",
  "student_id": "ObjectId",
  "week_label": "Wk 6",
  "understanding": 74,
  "application": 60,
  "gap_closed_percent": 11
}
```

## `achievements`
```json
{
  "_id": "ach1",
  "student_id": "ObjectId",
  "label": "7-Day Streak",
  "earned": false,
  "progress": 6,
  "target": 7
}
```

---

### Indexing notes
- `assessments`: compound index on `(student_id, topic_id, submitted_at)` for quick history lookups.
- `knowledge_mirrors`: index on `(student_id, topic_id)` to fetch the latest report fast.
- `questions`: index on `(topic_id, difficulty)` to support adaptive selection.
