"use client";

import React, { useState } from "react";
import LoginForm from "../_components/LoginForm";
import SignupForm from "../_components/SignupForm";
import Galaxy from "@/components/Galaxy";

type AuthView = "login" | "signup";

const AuthPage = () => {
  const [view, setView] = useState<AuthView>("login");

  return (
    <main className="font-body antialiased min-h-screen flex flex-col lg:flex-row items-center bg-white dark:bg-white text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed  overflow-hidden">
      {/* Left Side: Auth Form */}
      <section className="py-10 w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28 items-center lg:py-0 bg-surface dark:bg-surface z-10 min-h-screen lg:min-h-0 text-black">
        {view === "login" ? (
          <LoginForm onSwitchToSignup={() => setView("signup")} />
        ) : (
          <SignupForm onSwitchToLogin={() => setView("login")} />
        )}
      </section>

      {/* Right Side: PixelSnow + Text */}
      <section className="hidden lg:block lg:w-[55%] relative overflow-hidden min-h-screen ">
        {/* PixelSnow fills entire panel */}
        <div className="absolute inset-0">
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={1}
            glowIntensity={0.1}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-transparent from-primary/80 via-primary/30 to-transparent pointer-events-none" />

        {/* Content Over Snow */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 xl:p-20 z-20 pointer-events-none">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 mb-6">
              <span className="h-px w-12 bg-black/50" />
              <span className="text-blue-700 font-bold uppercase tracking-[0.2em] text-xs">
                The Mindful Architect
              </span>
            </div>
            <h2 className="text-4xl xl:text-5xl font-extrabold text-black mb-5 leading-[1.1] tracking-tight">
              Design your day with surgical precision.
            </h2>
            <p className="text-black/80 text-base xl:text-lg font-medium leading-relaxed mb-8">
              Experience a digital workspace that respects your attention. Where
              white space is a tool and every interaction is intentional.
            </p>

            {/* Feature Tags */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-black/10 backdrop-blur-md rounded-xl border border-black/10">
                <span className="material-symbols-outlined text-black mb-2 block text-[20px]">
                  auto_awesome
                </span>
                <p className="text-black font-bold text-sm">Cognitive Clarity</p>
                <p className="text-black/60 text-xs mt-0.5">Reduced noise for deep work</p>
              </div>
              <div className="p-4 bg-black/10 backdrop-blur-md rounded-xl border border-black/10">
                <span className="material-symbols-outlined text-black mb-2 block text-[20px]">
                  layers
                </span>
                <p className="text-black font-bold text-sm">Tonal Hierarchy</p>
                <p className="text-black/60 text-xs mt-0.5">Visual depth for task priority</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Ring */}
        <div className="absolute top-16 right-16 w-28 h-28 border border-black/10 rounded-full flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 border border-black/20 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthPage;