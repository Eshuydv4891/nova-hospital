"use client";

import React from "react";
import {
  ShieldAlert,
  UserCheck,
  Heart,
  Cpu,
  BadgeIndianRupee,
  Sparkles,
  Baby,
  Stethoscope,
  Building,
  CheckCircle2,
} from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "24×7 Emergency & Ambulance",
      desc: "Round-the-clock rapid response team, critical care ambulances, and immediate trauma resuscitation.",
      icon: ShieldAlert,
    },
    {
      title: "Expert Specialist Doctors",
      desc: "Led by Director Dr. Vijay Yadav (Pediatric Specialist, PGPN Boston) alongside experienced consultants.",
      icon: UserCheck,
    },
    {
      title: "Child Friendly Environment",
      desc: "Warm, non-intimidating, and colorful clinical spaces designed to keep young patients relaxed and comfortable.",
      icon: Heart,
    },
    {
      title: "Advanced Medical Equipment",
      desc: "Level-III NICU radiant warmers, pediatric ventilators, modular OTs, and automated digital lab diagnostic tools.",
      icon: Cpu,
    },
    {
      title: "Affordable Transparent Care",
      desc: "World-class super speciality healthcare structured with ethical pricing and clear billing for every family.",
      icon: BadgeIndianRupee,
    },
    {
      title: "Clean Modern Infrastructure",
      desc: "Strict infection control protocol, hygienic air filtration, sterile surgical suites, and spacious waiting lounges.",
      icon: Building,
    },
    {
      title: "Level-III Modern NICU & PICU",
      desc: "Dedicated intensive care for premature newborns and critical pediatric cases with 24x7 monitoring.",
      icon: Baby,
    },
    {
      title: "Experienced Pediatric Team",
      desc: "Compassionate nursing staff, resident doctors, and trained pediatric intensivists on call 24 hours.",
      icon: Stethoscope,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-navy-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-secondary" /> Why Choose Nova Medicare
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Setting the Benchmark in Patient-Centered Healthcare
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            We combine state-of-the-art medical technology with empathetic medical care to deliver exceptional clinical outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-navy border border-slate-200 dark:border-navy-border hover:border-secondary/60 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary-hover to-navy text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md border border-secondary/40">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
