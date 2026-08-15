import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AppShell from '../components/AppShell'
import GlassCard from '../components/GlassCard'
import Button from '../components/Button'
import { getDiagnosticQuestions, submitAssessment } from '../services/api'

const typeLabels = {
  mcq: 'Multiple Choice',
  'short-answer': 'Short Answer',
  scenario: 'Scenario',
  conceptual: 'Conceptual',
  application: 'Application',
}

const difficultyColor = {
  easy: 'text-glow-green bg-glow-green/15',
  medium: 'text-glow-amber bg-glow-amber/15',
  hard: 'text-glow-rose bg-glow-rose/15',
}

export default function DiagnosticAssessment() {
  const { topicId } = useParams()
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [secondsElapsed, setSecondsElapsed] = useState(0)

  // Adaptive states
  const [difficulty, setDifficulty] = useState('easy')
  const [confidence, setConfidence] = useState(3)
  const [usedQuestions, setUsedQuestions] = useState([])

  useEffect(() => {
    getDiagnosticQuestions(topicId).then(setQuestions)
  }, [topicId])

  useEffect(() => {
    const timer = setInterval(() => setSecondsElapsed((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  if (questions.length === 0) {
    return (
      <AppShell>
        <p className="text-mist">Preparing your adaptive questions…</p>
      </AppShell>
    )
  }

  // Pick next question based on difficulty
  const availableQuestions = questions.filter(
    (q) => q.difficulty === difficulty && !usedQuestions.includes(q.id)
  )

  const question =
    availableQuestions[0] ||
    questions.find((q) => !usedQuestions.includes(q.id))

  // All questions finished
  if (!question) {
    submitAssessment(topicId, answers)
    navigate(`/analyzing/${topicId}`)
    return null
  }

  const progressPercent = Math.round(
    (usedQuestions.length / questions.length) * 100
  )

  const mm = String(Math.floor(secondsElapsed / 60)).padStart(2, '0')
  const ss = String(secondsElapsed % 60).padStart(2, '0')

  const handleNext = async () => {
    let isCorrect = true

    // Auto-check MCQs
    if (question.type === 'mcq') {
      isCorrect = currentAnswer === question.options[question.answer]
    }

    const updatedAnswers = {
      ...answers,
      [question.id]: {
        answer: currentAnswer,
        confidence,
        correct: isCorrect,
        difficulty: question.difficulty,
      },
    }

    setAnswers(updatedAnswers)
    setUsedQuestions([...usedQuestions, question.id])
    setCurrentAnswer('')
    setConfidence(3)

    // Adaptive difficulty
    if (isCorrect) {
      if (difficulty === 'easy') setDifficulty('medium')
      else if (difficulty === 'medium') setDifficulty('hard')
    } else {
      if (difficulty === 'hard') setDifficulty('medium')
      else if (difficulty === 'medium') setDifficulty('easy')
    }

    // Finish when all questions are attempted
    if (Object.keys(updatedAnswers).length === questions.length) {
      await submitAssessment(topicId, updatedAnswers)
      navigate(`/analyzing/${topicId}`)
    }
  }

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-3 text-sm text-mist">
          <span>
            Question {usedQuestions.length + 1} of {questions.length}
          </span>
          <span className="font-mono">
            {mm}:{ss}
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-white/8 overflow-hidden mb-8">
          <motion.div
            className="h-full bg-mirror-line rounded-full"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
          >
            <GlassCard strong className="p-8">
              {/* Labels */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/8 text-mist">
                  {typeLabels[question.type]}
                </span>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${difficultyColor[question.difficulty]}`}
                >
                  {question.difficulty.toUpperCase()}
                </span>
              </div>

              {/* Question */}
              <h2 className="text-xl font-display font-medium leading-snug mb-6">
                {question.prompt}
              </h2>

              {/* Answer UI */}
              {question.type === 'mcq' ? (
                <div className="space-y-3">
                  {question.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setCurrentAnswer(opt)}
                      className={`w-full text-left px-4 py-3 rounded-xl2 border transition-colors ${
                        currentAnswer === opt
                          ? 'border-reflect-indigo bg-reflect-indigo/15 text-white'
                          : 'border-white/10 bg-white/5 text-mist hover:text-white hover:border-white/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  rows={5}
                  placeholder="Type your answer in your own words…"
                  className="w-full rounded-xl2 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:outline-none focus:border-reflect-indigo transition-colors resize-none"
                />
              )}

              {/* Confidence Slider */}
              <div className="mt-6">
                <label className="block text-sm text-mist mb-2">
                  Confidence: {confidence}/5
                </label>

                <input
                  type="range"
                  min="1"
                  max="5"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Next Button */}
              <div className="flex justify-end mt-8">
                <Button onClick={handleNext} disabled={!currentAnswer}>
                  {Object.keys(answers).length + 1 === questions.length
                    ? 'Finish & Analyze'
                    : 'Next Question'}
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  )
}