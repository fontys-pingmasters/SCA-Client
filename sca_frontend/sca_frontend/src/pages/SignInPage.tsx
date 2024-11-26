import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from "../components/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import mediaanConclusionLogo from '/mediaan_conclusion_logo.png';

function SignInPage() {
    const [email, setEmail] = useState<string>(""); //Interface
    const [password, setPassword] = useState<string>(""); //Interface
    const navigate = useNavigate(); //Interface
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginRequest();
    };

    const loginRequest = async () => {
        try {
            const response = await fetch("https://localhost:7035/Auth/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password, //use interface instead
                }),
            });

            if (response.status === 401) {
                toast.error("Invalid credentials. Please try again.");
                return;
            }

            const data: { token: string } = await response.json();
            login(data.token);
            console.log(data);
            toast.success("Login successful!");
            navigate("/home");
        } catch (error) {
            toast.error("An error occurred during login. Please try again later.");
            console.error("Error during login: ", error);
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
                    <h2 className="text-2xl font-semibold text-black mt-2">Sign in</h2>
                    <p className="text-sm text-gray-500 mb-4">Sign in with your account.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 mb-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <div className="flex justify-center mb-4">
                            <Link to="/forgot-password" className="text-xs text-black underline">Forgot Password?</Link>
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
                        Don’t have an account?
                    </p>
                    <Link to="/sign-up" className="text-xs text-white underline">Create an account</Link>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;