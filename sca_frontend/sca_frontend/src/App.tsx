import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';

import ChangePasswordPage from './pages/ChangePasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

import HomePage from './pages/HomePage'

function App() {


  return (
    <>
    <Router>
    <Routes>
        <Route path='/' element={<SignInPage />} />
        <Route path='/change-password' element={<ChangePasswordPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/home" element={HomePage} />
      </Routes>
    </Router>
    </>
  );
}

export default App
