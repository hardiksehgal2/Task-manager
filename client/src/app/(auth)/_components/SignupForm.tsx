/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { register } from "@/lib/api/auth.api";

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm = ({ onSwitchToLogin }: SignupFormProps) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.info("Account created! You need to login to start your tasks.", {
        duration: 5000,
      });
      onSwitchToLogin();
    } catch (err: any) {
     
      toast.error(err ?? "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md w-full">
        <h1 className="text-5xl font-extrabold text-on-surface mb-3 tracking-tight">
          Create account
        </h1>
        <p className="text-on-surface-variant text-sm font-medium mb-10 leading-relaxed">
          Join the architecture. Build your personal workspace and start
          designing your most productive days.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline group-focus-within:text-primary text-xl">
                  person
                </span>
              </div>
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300 outline-none"
                id="name"
                name="name"
                placeholder="Your full name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1"
              htmlFor="signup-email"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline group-focus-within:text-primary text-xl">
                  alternate_email
                </span>
              </div>
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300 outline-none"
                id="signup-email"
                name="email"
                placeholder="name@company.com"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1"
              htmlFor="signup-password"
            >
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline group-focus-within:text-primary text-xl">
                  lock
                </span>
              </div>
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300 outline-none"
                id="signup-password"
                name="password"
                placeholder="••••••••"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            className="w-full py-4 px-6 rounded-xl bg-blue-700 from-primary to-primary-container text-white font-bold text-lg shadow-xl shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin text-xl">
                progress_activity
              </span>
            ) : (
              <>
                <span>Create Account</span>
                <span className="material-symbols-outlined text-xl">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <p className="mt-10 text-center text-on-surface-variant font-medium">
          Already have an account?{" "}
          <button
            type="button"
            className="text-green-700  font-bold hover:underline ml-1"
            onClick={onSwitchToLogin}
          >
            Sign In
          </button>
        </p>
      </div>

      <div className="mt-auto py-8">
        <p className="text-[10px] uppercase tracking-widest text-outline font-bold">
          © 2026 Mindful Architect. Built for clarity.
        </p>
      </div>
    </>
  );
};

export default SignupForm;
