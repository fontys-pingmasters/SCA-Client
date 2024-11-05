import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import mediaanConclusionLogo from '/mediaan_conclusion_logo.png'

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerRequest();
  }

  const registerRequest = async () => {
    try {
      const response = await fetch("https://localhost:7035/Auth/register", {
          method: "POST",
          headers: {
              "content-type": "application/json",
          },
          body: JSON.stringify({
              email: email,
              password: password,
              confirmPassword: confirmPassword
          }),
      });

      if (response.status === 401) {
          return;
      }

      const data = await response.json();
      console.log(data);
      navigate("/")
  } catch (error) {
      console.error("Error during login: ", error)
      navigate("/sign-up");
  }
}


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-80">
          <div className="flex justify-center items-center">
            <img src={mediaanConclusionLogo} alt="alternate text" />
          </div>
          <h2 className="text-2xl font-semibold text-black mt-2">Sign up</h2>
          <p className="text-sm text-gray-500 mb-4">Create your account.</p>
          <form onSubmit={handleSubmit}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
            <div className="mt-3">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm password"
                className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
              <button
                type="submit"
                className="w-full p-2 rounded-md bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold">
                Continue
              </button>
          </form>
        </div>
        <div className="text-center mt-6">
          <p className="text-xs text-white">
            Already have an account?
          </p>
          <Link to="/" className="text-xs text-white underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;