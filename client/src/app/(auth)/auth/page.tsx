"use client";

import React, { useState } from "react";
import Image from "next/image";
import LoginForm from "../_components/LoginForm";
import SignupForm from "../_components/SignupForm";

type AuthView = "login" | "signup";

const AuthPage = () => {
  const [view, setView] = useState<AuthView>("login");

  return (
    <main className="min-h-screen flex bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed antialiased overflow-hidden">
      {/* Left Side: Auth Form */}
      <section className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 bg-surface z-10">
        {view === "login" ? (
          <LoginForm onSwitchToSignup={() => setView("signup")} />
        ) : (
          <SignupForm onSwitchToLogin={() => setView("login")} />
        )}
      </section>

      {/* Right Side: Brand Imagery */}
      <section className="hidden lg:block lg:w-[55%] relative overflow-hidden">
        <div className="absolute inset-0 bg-primary">
          <Image
            src="https://lh3.googleusercontent.com/aida/ADBb0uhKAfmDzUnA9gfIhumYPsrCvUrZijfkuIy-8qDOQMab69q5yVsmnS5M6V9Uzq19dp4bhOWMnm_NOLeVra3qc-alqiLdn1lIe2fPSmEOO6U4ufiIYxBKgQLAAAdJokVLg9ObWZmUwZOsOKdNl8QYnoKVTV_D-FynN_k0p8_JfFNYB79d3lXQk1CqY_M8jrw80caSLiGMz3hTXX69C_zS2gSWT5m8x_353tbeXza5q_Kr6xrkN7E344waJ59N"
            alt="Minimalist abstract digital art with flowing blue and white architectural ribbons"
            fill
            className="object-cover opacity-80 mix-blend-multiply"
            sizes="55vw"
            loading="eager"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary/40 to-transparent" />

        {/* Content Over Image */}
        <div className="absolute inset-0 flex flex-col justify-end p-20 z-20">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 mb-6">
              <span className="h-px w-12 bg-white/50" />
              <span className="text-white/80 font-bold uppercase tracking-[0.2em] text-xs">
                The Focused Editorial
              </span>
            </div>
            <h2 className="text-5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Design your day with surgical precision.
            </h2>
            <p className="text-white/80 text-lg font-medium leading-relaxed mb-10">
              Experience a digital workspace that respects your attention. Where
              white space is a tool and every interaction is intentional.
            </p>

            {/* Feature Tags */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                <span className="material-symbols-outlined text-white mb-2 block">
                  auto_awesome
                </span>
                <p className="text-white font-bold text-sm">Cognitive Clarity</p>
                <p className="text-white/60 text-xs">Reduced noise for deep work</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                <span className="material-symbols-outlined text-white mb-2 block">
                  layers
                </span>
                <p className="text-white font-bold text-sm">Tonal Hierarchy</p>
                <p className="text-white/60 text-xs">Visual depth for task priority</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Ring */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full flex items-center justify-center">
          <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthPage;
