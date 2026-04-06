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
      Cookies.set("accessToken", accessToken, { expires: 1 / 96 }); // ~15 min
      Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days
      toast.success("Welcome back! Redirecting to your workspace...");
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Login failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-12">
        <span className="text-2xl font-extrabold tracking-tight text-primary">
          Mindful Architect
        </span>
      </div>

      <div className="max-w-md w-full">
        <h1 className="text-5xl font-extrabold text-on-surface mb-3 tracking-tight">
          Welcome back
        </h1>
        <p className="text-on-surface-variant text-sm font-medium mb-10 leading-relaxed">
          Step back into your architectural flow. Your focus-optimized workspace
          is ready for your next big idea.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1"
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
                className="text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1"
                htmlFor="password"
              >
                Password
              </label>
              <a
                className="text-xs font-semibold text-primary hover:text-primary-container transition-colors"
                href="#"
              >
                Forgot password?
              </a>
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
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-bold text-lg shadow-xl shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
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

        {/* Divider */}
        <div className="mt-8 flex flex-col space-y-4">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-outline-variant/30" />
            <span className="flex-shrink mx-4 text-xs font-bold text-outline uppercase tracking-widest">
              Or continue with
            </span>
            <div className="flex-grow border-t border-outline-variant/30" />
          </div>

          <button
            type="button"
            className="w-full py-3 px-6 rounded-xl border border-outline-variant/20 bg-surface-container-lowest text-on-surface font-semibold text-sm hover:bg-surface-variant/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
        </div>

        {/* Switch to Signup */}
        <p className="mt-10 text-center text-on-surface-variant font-medium">
          New to the architecture?{" "}
          <button
            type="button"
            className="text-primary font-bold hover:underline ml-1"
            onClick={onSwitchToSignup}
          >
            Create Account
          </button>
        </p>
      </div>

      <div className="mt-auto py-8">
        <p className="text-[10px] uppercase tracking-widest text-outline font-bold">
          © 2024 Mindful Architect. Built for clarity.
        </p>
      </div>
    </>
  );
};

export default LoginForm;
