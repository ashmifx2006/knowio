import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import SubjectSelection from './pages/SubjectSelection'
import TopicSelection from './pages/TopicSelection'
import DiagnosticAssessment from './pages/DiagnosticAssessment'
import AIAnalysisLoading from './pages/AIAnalysisLoading'
import KnowledgeMirrorDashboard from './pages/KnowledgeMirrorDashboard'
import LearningPath from './pages/LearningPath'
import ProgressDashboard from './pages/ProgressDashboard'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/subjects" element={<SubjectSelection />} />
      <Route path="/subjects/:subjectId/topics" element={<TopicSelection />} />
      <Route path="/assessment/:topicId" element={<DiagnosticAssessment />} />
      <Route path="/analyzing/:topicId" element={<AIAnalysisLoading />} />
      <Route path="/knowledge-mirror/:topicId" element={<KnowledgeMirrorDashboard />} />
      <Route path="/learning-path/:topicId" element={<LearningPath />} />
      <Route path="/progress" element={<ProgressDashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}
