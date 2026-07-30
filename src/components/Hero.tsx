"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useHospital } from "@/context/HospitalContext";
import {
  ShieldAlert,
  PhoneCall,
  Calendar,
  Award,
  Users,
  Bed,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function Hero() {
  const { openBookingModal } = useHospital();
  const [patientCount, setPatientCount] = useState(12000);
  const [doctorCount, setDoctorCount] = useState(10);
  const [bedCount, setBedCount] = useState(20);

  // Animated counter on mount
  useEffect(() => {
    const timer = setInterval(() => {
      setPatientCount((prev) => (prev < 15000 ? prev + 150 : 15000));
      setDoctorCount((prev) => (prev < 25 ? prev + 1 : 25));
      setBedCount((prev) => (prev < 50 ? prev + 2 : 50));
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Patients Treated", value: `${patientCount.toLocaleString()}+`, icon: Users },
    { label: "Expert Specialist Doctors", value: `${doctorCount}+`, icon: Award },
    { label: "Critical & General Beds", value: `${bedCount}+`, icon: Bed },
    { label: "Emergency Support", value: "24×7", icon: Clock },
    { label: "Years of Trust", value: "15+", icon: Sparkles },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between bg-navy text-white overflow-hidden pt-6 pb-12">
      {/* Background Image Layer using Uploaded Hospital Facade */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/nova-hospital-building.jpg"
          alt="Nova Medicare Hospital Exterior Facade"
          fill
          priority
          className="object-cover object-center transform scale-105 filter contrast-105 brightness-90"
        />

        {/* Enhanced Glassmorphism & Luxurious Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60"></div>
        
        {/* Subtle Decorative Golden Rays */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      {/* Hero Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Action CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Super Speciality Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/50 text-secondary text-xs sm:text-sm font-bold backdrop-blur-md shadow-gold tracking-wide">
              <Sparkles className="w-4 h-4 text-secondary animate-spin" />
              Agra's Trusted Multi Super Speciality Hospital
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Welcome to <br />
              <span className="gold-text-gradient">Nova Medicare</span> Hospital
            </h1>

            {/* Tagline & Subheading */}
            <div className="space-y-3 border-l-4 border-secondary pl-4 py-1">
              <p className="text-xl sm:text-2xl font-bold text-slate-100 italic">
                "Caring for Every Child, Every Family."
              </p>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Advanced Medical Care with Compassion. Equipped with Level-III NICU, PICU, Adult ICU, Trauma Center, Modular Surgery Suites, and 24×7 Diagnostic Pathology.
              </p>
            </div>

            {/* Key Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                "24×7 Emergency",
                "Level-III NICU & PICU",
                "Expert Doctors",
                "Child Friendly Environment",
                "Advanced Diagnostics",
                "Affordable Healthcare",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* Main CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openBookingModal()}
                className="flex items-center gap-2.5 bg-gradient-to-r from-primary via-primary-hover to-primary-dark hover:from-primary-dark hover:to-primary text-white font-extrabold px-8 py-4 rounded-full shadow-red hover:shadow-gold transition-all duration-300 border border-secondary/40 text-base transform hover:-translate-y-1"
              >
                <Calendar className="w-5 h-5 text-secondary" />
                Book Appointment
              </button>

              <a
                href="tel:8955992944"
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-4 rounded-full border border-white/30 backdrop-blur-md transition-all text-base hover:border-secondary"
              >
                <PhoneCall className="w-5 h-5 text-emerald-400" />
                Call Now: 8955992944
              </a>

              <a
                href="tel:8955992944"
                className="flex items-center gap-2.5 bg-gradient-to-r from-red-600 to-primary text-white font-bold px-6 py-4 rounded-full shadow-lg border border-red-400 hover:scale-105 transition-transform text-base animate-pulse"
              >
                <ShieldAlert className="w-5 h-5 text-yellow-300" />
                Emergency 24x7
              </a>
            </div>
          </div>

          {/* Right Column: Floating Building Spotlight Glass Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="glass-panel p-6 rounded-3xl border-2 border-secondary/40 shadow-2xl relative space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/20 shadow-md">
                <Image
                  src="/images/nova-hospital-building.jpg"
                  alt="Nova Medicare Hospital Building"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs uppercase font-extrabold text-secondary tracking-wider">
                    Actual Building Facade
                  </div>
                  <div className="text-lg font-bold">Pratap Pura Chauraha, Agra</div>
                </div>
              </div>

              <div className="bg-navy-light/90 p-4 rounded-xl border border-secondary/20 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Director & Specialist</span>
                  <span className="font-bold text-secondary">Dr. Vijay Yadav</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  MBBS, MD (Paediatrics), PGPN (Boston University)
                </div>
                <p className="text-xs text-slate-300">
                  Dedicated 24×7 pediatric critical care, newborn NICU & family health center.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Animated Hospital Statistics */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="glass-panel rounded-2xl p-6 border border-secondary/40 shadow-2xl bg-navy/80 backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-3 pt-4 md:pt-0 md:px-4 first:pt-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/30 border border-secondary/40 flex items-center justify-center text-secondary shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white gold-text-gradient">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
