/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { login } from "@/lib/api/auth.api";

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

const LoginForm = ({ onSwitchToSignup }: LoginFormProps) => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { accessToken, refreshToken } = await login(form);
      Cookies.set("accessToken", accessToken, { expires: 1 / 96 }); 
      Cookies.set("refreshToken", refreshToken, { expires: 7 }); 
      toast.success("Welcome back! Redirecting to your workspace...");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err ?? "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md w-full ">
        <h1 className="text-5xl font-extrabold text-black mb-3 tracking-tight ">
          Welcome back
        </h1>
        <p className="text-black text-sm font-medium mb-10 leading-relaxed">
          Step back into your architectural flow. Your focus-optimized workspace
          is ready for your next big idea.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-bold uppercase tracking-wider text-black ml-1"
              htmlFor="email"
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
                id="email"
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
            <div className="flex justify-between items-center">
              <label
                className="text-xs font-bold uppercase tracking-wider text-black ml-1"
                htmlFor="password"
              >
                Password
              </label>

            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline group-focus-within:text-primary text-xl">
                  lock
                </span>
              </div>
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300 outline-none"
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
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
                <span>Sign In</span>
                <span className="material-symbols-outlined text-xl">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </form>



        {/* Switch to Signup */}
        <p className="mt-10 text-center text-black font-medium">
          New to the architecture?{" "}
          <button
            type="button"
            className="text-green-700 cursor-pointer font-bold hover:underline ml-1"
            onClick={onSwitchToSignup}
          >
            Create Account
          </button>
        </p>
      </div>

      <div className="mt-auto py-8">
        <p className="text-[10px] uppercase tracking-widest text-black font-bold">
          © 2026 Mindful Architect. Built for clarity.
        </p>
      </div>
    </>
  );
};

export default LoginForm;
