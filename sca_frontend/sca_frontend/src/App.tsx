import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';

import ChangePasswordPage from './pages/ChangePasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Homepage from './pages/HomePage';
import LiveMatchesPage from './pages/LiveMatchesPage';
import ScoreboardPage from './pages/ScoreboardPage';
import UpdateScorePage from './pages/UpdateScorePage';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<SignInPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          {/* Protected routes */}
          <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/live-matches" element={<ProtectedRoute><LiveMatchesPage /></ProtectedRoute>} />
          <Route path="/scoreboard" element={<ProtectedRoute><ScoreboardPage /></ProtectedRoute>} />
          <Route path="/update-score/:matchId" element={<ProtectedRoute><UpdateScorePage /></ProtectedRoute>} />

          {/* Unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App