import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';

import ChangePasswordPage from './pages/ChangePasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Homepage from './pages/HomePage';
import LiveMatchesPage from './pages/LiveMatchesPage';
import ScoreboardPage from './pages/ScoreboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/live-matches" element={<LiveMatchesPage />} />
        <Route path="/scoreboard" element={<ScoreboardPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App