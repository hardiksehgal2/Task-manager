"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-white text-on-background font-body antialiased">
        <section className="bg-white relative min-h-screen flex items-center px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-7 z-10">
              <div className="mb-6 flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">Mindful Architect</span>
              </div>
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-[1.1] mb-8 tracking-tight">
                Structure Your Day, <br />
                <span className="bg-linear-to-r from-primary to-primary-container bg-clip-text text-blue-700">
                  Achieve Your Best
                </span>
              </h1>
              <p className="text-on-surface-variant text-md md:text-lg max-w-lg mb-12 leading-relaxed">
                A streamlined task manager designed for personal peak performance. Create, prioritize, and track your
                progress with a workspace that honors your focus.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => router.push("/auth")}

                  className="bg-blue-700 text-on-primary px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-[0.98] cursor-pointer">
                  Get Started Free
                </button>

              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-square bg-surface-container rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  alt="Modern Minimalist Workspace"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBclsSm_dXRhfynJFGJJprRKoD7xEi8g0DQ8jryXIdGcc4TQnJmD6RrwaviqOZQG0IP_107NauD6BPL6aVMPEAoN6WnxJHxW8mp-n1gFZxpLI1xK-AdfKRA0Q5XplYM44kXteowE86dFPkg13SjBx2SeQfqIa5P7dp2cdfbKaUQYEMM3L1xkS_asxlf4VB5ZJ0NP6eCROQMPC_b5GREpfGFiE7s7_xvRDVfQlUuduZR5gYh_Qa4vHEbhaRLACkswX8b2gwNEtARa9zR"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover mix-blend-overlay opacity-60"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] glass-effect bg-white/40 p-8 rounded-xl border border-white/30 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center">
                      <span className="material-symbols-outlined text-black">architecture</span>
                    </div>
                    <div>
                      <p className="font-headline font-bold textblack">Daily Blueprint</p>
                      <p className="text-xs text-on-surface-variant">Personal Deep Work Session</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-blue-700 rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs font-medium text-blue-700">
                      <span>Completion Progress</span>
                      <span>67%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-container rounded-full opacity-20 blur-3xl" />
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4">
                Master Your Workflow
              </h2>
              <p className="text-on-surface-variant max-w-2xl">
                Everything you need to manage your personal tasks with precision. No distractions, just productivity.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-surface-container-lowest p-10 rounded-xl transition-all duration-300 hover:shadow-[0_16px_32px_rgba(0,60,157,0.06)] flex flex-col h-full">
                <div className="w-14 h-14 bg-primary-fixed rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl text-black">edit_note</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">Effortless Management</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8 flex-grow text-sm md:text-base">
                  Quickly create, update, and organize your tasks. Our intuitive CRUD interface makes managing your
                  daily to-do list feel effortless and natural.
                </p>
                <div className="h-1 w-12 bg-primary/20 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
              <div className="group bg-surface-container-lowest p-10 rounded-xl transition-all duration-300 hover:shadow-red-500 flex flex-col h-full">
                <div className="w-14 h-14 bg-secondary-fixed rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-on-secondary-fixed-variant text-3xl">
                    priority_high
                  </span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">Strategic Priority</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8 flex-grow text-sm md:text-base">
                  Define what matters most. Use clear priority levels to ensure your most important personal projects
                  always get the attention they deserve.
                </p>
                <div className="h-1 w-12 bg-secondary/20 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
              <div className="group bg-surface-container-lowest p-10 rounded-xl transition-all duration-300 hover:shadow-yellow-800 flex flex-col h-full">
                <div className="w-14 h-14 bg-tertiary-fixed rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-on-tertiary-fixed-variant text-3xl">
                    query_stats
                  </span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">Progress Tracking</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8 flex-grow text-sm md:text-base">
                  Visualize your success. Watch your completion percentage grow in real-time as you check off tasks,
                  giving you a clear view of your daily wins.
                </p>
                <div className="h-1 w-12 bg-tertiary/20 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8">
          <div className="max-w-5xl bg-blue-700 mx-auto  rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-700 from-primary to-primary-container opacity-50" />
            <div className="relative z-10">
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-primary mb-6">
                Ready to design your day?
              </h2>
              <p className="text-white text-lg mb-10 max-w-xl mx-auto opacity-90">
                Join thousands of individuals who have switched to a more mindful and effective way of managing their
                personal productivity.
              </p>
              <button
                className="bg-white text-blue-700 px-10 py-4 rounded-xl font-bold text-xl hover:bg-inverse-on-surface transition-colors active:scale-95 shadow-xl cursor-pointer"
                onClick={() => router.push("/auth")}
              >
                Get Started
              </button>
            </div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          </div>
        </section>

      <footer className="w-full py-12 px-8 mt-auto bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="font-headline font-bold text-slate-900 text-lg">Mindful Architect</span>
            <span className="text-xs text-slate-500">© 2026 Mindful Architect. Built for clarity.</span>
          </div>
          <div className="flex gap-6 items-center">
            <a className="text-xs text-slate-500 hover:text-slate-900 transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-xs text-slate-500 hover:text-slate-900 transition-colors" href="#">
              Terms of Service
            </a>
            <a className="text-xs text-slate-500 hover:text-slate-900 transition-colors" href="#">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
