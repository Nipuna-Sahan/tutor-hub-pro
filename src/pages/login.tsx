import React, { useState } from "react";
import { motion } from "framer-motion";

// LMS Login Page - Single-file React + TypeScript component
// Tailwind CSS classes used (assumes Tailwind is set up in your project)

type LoginProps = {
  onLoginSuccess?: (token: string) => void;
};

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState("");

  const validate = () => {
    //if (!email) return "Please enter your email.";
    // simple email regex
    const re = /^\S+@\S+\.\S+$/;
    //if (!re.test(email)) return "Please enter a valid email address.";
    //if (!password) return "Please enter your password.";
    //if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
        if (role === "student") {
    window.location.href = "/lms";
    } else if (role === "admin") {
    window.location.href = "/admin";
    }
    // try {
    //   // Replace with your real API endpoint
    //   const res = await fetch("/api/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password, remember }),
    //   });

    //   if (!res.ok) {
    //     const payload = await res.json().catch(() => ({}));
    //     throw new Error(payload?.message || "Login failed. Please try again.");
    //   }

    //   const data = await res.json();
    //   const token = data?.token || "";

    //   // Save token according to "remember" preference
    //   if (token) {
    //     if (remember) localStorage.setItem("lms_token", token);
    //     else sessionStorage.setItem("lms_token", token);
    //   }

    //   onLoginSuccess?.(token);
    // } catch (err: any) {
    //   setError(err.message || "An unexpected error occurred.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-md w-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8"
        role="main"
      >
        <header className="text-center mb-6">
          <motion.h1
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35 }}
            className="text-2xl font-semibold text-gray-800"
          >
            Welcome back — AshenScience LMS (Admin & Student Login)
          </motion.h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue to your dashboard</p>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} aria-label="LMS login form">
          <label className="block text-xs font-medium text-gray-600 mb-1">Login As</label>
          <select
            className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            onChange={(e) => setRole(e.target.value)}
            defaultValue="student"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
          <input
            //type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 mb-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Remember me
            </label>

            <a href="/forgot-password" className="hover:underline">
              Forgot?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium shadow-sm hover:brightness-105 disabled:opacity-60"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : null}
            <span>{loading ? "Signing in..." : "Sign in"}</span>
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </a>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white/90 px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              onClick={() => alert('Social login placeholder')}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.876v-6.987H7.898v-2.889h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.876h2.773l-.443 2.889h-2.33V21.876C18.343 21.128 22 16.991 22 12z" fill="#1877F2" />
              </svg>
              Facebook
            </button>

            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              onClick={() => alert('Social login placeholder')}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6 12.2c0-.7-.1-1.4-.3-2H12v3.8h5.5c-.2 1.1-.9 2-1.9 2.6v2.2h3.1c1.8-1.7 2.9-4 2.9-6.6z" fill="#4285F4" />
                <path d="M12 22c2.7 0 5-0.9 6.7-2.4l-3.1-2.2c-.9.6-2 1-3.6 1-2.8 0-5.2-1.9-6.1-4.5H2.7v2.8C4.5 19.9 8 22 12 22z" fill="#34A853" />
                <path d="M5.9 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.3H2.7C1.6 9 1 10.9 1 13s.6 4 1.7 5.7L5.9 13.9z" fill="#FBBC05" />
                <path d="M12 6.1c1.5 0 2.9.5 4 1.6l3-3C17 2.6 14.7 1.5 12 1.5 8 1.5 4.5 3.6 2.7 6.3l3.2 2.6C6.9 7.7 9.2 6.1 12 6.1z" fill="#EA4335" />
              </svg>
              Google
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
