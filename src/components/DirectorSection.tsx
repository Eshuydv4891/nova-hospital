"use client";

import React from "react";
import Image from "next/image";
import { useHospital } from "@/context/HospitalContext";
import {
  Award,
  GraduationCap,
  Calendar,
  Heart,
  CheckCircle2,
  PhoneCall,
  Stethoscope,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function DirectorSection() {
  const { openBookingModal } = useHospital();

  const qualifications = [
    { title: "MBBS", detail: "Bachelor of Medicine & Bachelor of Surgery" },
    { title: "MD (Paediatrics)", detail: "Doctor of Medicine in Child Healthcare" },
    { title: "PGPN (Boston University)", detail: "Post Graduate Program in Pediatric Nutrition, USA" },
    { title: "MECMS", detail: "Member of Emergency & Critical Care Medical Society" },
    { title: "MIAP", detail: "Member of Indian Academy of Pediatrics" },
  ];

  return (
    <section className="py-20 relative bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-navy dark:via-navy-light dark:to-navy overflow-hidden">
      {/* Decorative Gold Light Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-secondary" /> Leadership & Director Profile
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Meet Our Director & Chief Pediatrician
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Pioneering pediatric excellence and compassionate family medicine with over 15+ years of dedicated critical care experience.
          </p>
        </div>

        {/* Director Profile Card Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border-2 border-secondary/40 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Doctor Image with Golden Border */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group">
                {/* Glowing Background Ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-secondary via-primary to-secondary rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                <div className="relative rounded-3xl overflow-hidden border-4 border-secondary p-1 bg-gradient-to-b from-secondary via-primary to-navy shadow-gold">
                  <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] rounded-2xl overflow-hidden bg-slate-900">
                    <Image
                      src="/images/dr-vijay-yadav.png"
                      alt="Dr. Vijay Yadav - Director Nova Medicare Hospital"
                      fill
                      priority
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Experience Badge Floating */}
                <div className="absolute -bottom-5 right-4 bg-gradient-to-r from-primary via-primary-dark to-navy text-white px-5 py-3 rounded-2xl shadow-xl border border-secondary/50 flex items-center gap-3">
                  <Award className="w-7 h-7 text-secondary" />
                  <div>
                    <div className="text-xl font-black text-secondary leading-none">15+ Years</div>
                    <div className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">Experience</div>
                  </div>
                </div>
              </div>

              {/* Name Title Card */}
              <div className="text-center mt-8 space-y-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                  Dr. Vijay Yadav
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </h3>
                <p className="text-primary dark:text-secondary font-bold text-sm sm:text-base">
                  Director & Chief Consultant Pediatrician
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nova Medicare Hospital, Agra
                </p>
              </div>
            </div>

            {/* Right: Detailed Qualifications, Bio, Vision & CTA */}
            <div className="lg:col-span-7 space-y-8">
              {/* Premium Introduction Quote */}
              <div className="bg-slate-100 dark:bg-navy-light/80 p-6 rounded-2xl border-l-4 border-secondary shadow-sm">
                <p className="text-base sm:text-lg italic font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                  "Dr. Vijay Yadav is a highly experienced Pediatrician committed to providing world-class healthcare for newborns, infants, children, and families with compassionate treatment and advanced medical care."
                </p>
              </div>

              {/* Qualification Timeline / Grid */}
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-secondary" /> Professional Qualifications & Credentials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {qualifications.map((q, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-navy-light border border-slate-200 dark:border-navy-border shadow-sm hover:border-secondary/50 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <div className="font-extrabold text-primary dark:text-secondary text-sm">{q.title}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">{q.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision & Mission Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
                  <h5 className="font-bold text-primary dark:text-red-400 text-sm mb-1 flex items-center gap-1.5">
                    <Heart className="w-4 h-4" /> Our Vision
                  </h5>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    To deliver zero-compromise critical care and holistic medical excellence for every infant, child, and family in Western UP.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/30">
                  <h5 className="font-bold text-secondary text-sm mb-1 flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4" /> Our Mission
                  </h5>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Bringing together advanced Level-III NICU technology, transparent treatments, and empathetic healing for every patient.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => openBookingModal("Pediatrics", "Dr. Vijay Yadav")}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold px-7 py-3.5 rounded-full shadow-red hover:shadow-gold transition-all duration-300 border border-secondary/40 text-sm sm:text-base transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5 text-secondary" />
                  Book Appointment with Dr. Vijay Yadav
                </button>
                <a
                  href="tel:8955992944"
                  className="flex items-center gap-2 bg-white dark:bg-navy-light text-slate-900 dark:text-white font-bold px-6 py-3.5 rounded-full border border-slate-300 dark:border-navy-border hover:border-secondary transition-all text-sm sm:text-base"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-500" /> Direct OPD: 8955992944
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
