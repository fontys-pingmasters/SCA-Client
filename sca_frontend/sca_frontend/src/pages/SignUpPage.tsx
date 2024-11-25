import React, { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import mediaanConclusionLogo from '/mediaan_conclusion_logo.png';

interface UserForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

function SignUpPage() {
  const [form, setForm] = useState<UserForm>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (field: keyof UserForm, value: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setForm((prev) => ({ ...prev, [field]: value }));
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await registerRequest();
  };

  const registerRequest = async () => {
    try {
      const response = await fetch("https://localhost:7035/Auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.status === 401) {
        toast.error("Registration failed. Please try again.");
        return;
      }

      const data = await response.json();
      console.log(data);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error("An error occurred during registration. Please try again later.");
      console.error("Error during registration: ", error);
      navigate("/sign-up");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-80">
          <div className="flex justify-center items-center">
            <img src={mediaanConclusionLogo} alt="Logo" />
          </div>
          <h2 className="text-2xl font-semibold text-black mt-2">Sign up</h2>
          <p className="text-sm text-gray-500 mb-4">Create your account.</p>
          <form onSubmit={handleSubmit}>
            <input
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              type="text"
              placeholder="First Name"
              className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              type="text"
              placeholder="Last Name"
              className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="mt-3">
              <input
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="mt-3">
              <input
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                value={form.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                type="password"
                placeholder="Confirm password"
                className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 rounded-md bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold"
            >
              Continue
            </button>
          </form>
        </div>
        <div className="text-center mt-6">
          <p className="text-xs text-white">Already have an account?</p>
          <Link to="/" className="text-xs text-white underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
