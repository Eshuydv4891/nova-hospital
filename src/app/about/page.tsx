"use client";

import React from "react";
import Image from "next/image";
import DirectorSection from "@/components/DirectorSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import {
  Sparkles,
  HeartPulse,
  Target,
  Eye,
  Award,
  ShieldCheck,
  Building,
  Users,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { useHospital } from "@/context/HospitalContext";

export default function AboutPage() {
  const { openBookingModal } = useHospital();

  return (
    <div className="space-y-0">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-r from-navy via-navy-light to-navy text-white py-16 border-b border-secondary/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider">
            <Building className="w-4 h-4" /> About Nova Medicare Hospital
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Legacy of <span className="gold-text-gradient">Healthcare Excellence</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            "Caring for Every Child, Every Family." Delivering compassionate multi super speciality medical care in Pratap Pura, Agra.
          </p>
        </div>
      </section>

      {/* Hospital Story Section */}
      <section className="py-20 bg-white dark:bg-navy relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Pioneering Pediatric & Super Speciality Medicine in Agra
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Established with a vision to eliminate healthcare disparities in Western Uttar Pradesh, <strong>Nova Medicare Hospital</strong> stands as a landmark healthcare institution. Located strategically at Pratap Pura Chauraha, Agra, our multi-speciality facility is equipped with state-of-the-art Level-III NICU, PICU, Adult ICU, and round-the-clock emergency medical response.
              </p>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Under the directorship of <strong>Dr. Vijay Yadav</strong> (MBBS, MD Paediatrics, PGPN Boston University), the hospital has nurtured thousands of newborns and treated complex medical conditions with unmatched clinical precision and warm family care.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-light border border-slate-200 dark:border-navy-border">
                  <div className="text-2xl font-black text-primary dark:text-secondary">15,000+</div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Happy Patients Treated</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-light border border-slate-200 dark:border-navy-border">
                  <div className="text-2xl font-black text-secondary">Level-III NICU</div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Advanced Newborn Care</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openBookingModal()}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-bold px-7 py-3.5 rounded-full shadow-red hover:shadow-gold transition-all"
                >
                  <Calendar className="w-5 h-5 text-secondary" /> Schedule a Consultation
                </button>
              </div>
            </div>

            {/* Building Image Feature */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border-4 border-secondary/40 shadow-2xl h-[440px]">
                <Image
                  src="/images/nova-hospital-building.jpg"
                  alt="Nova Medicare Hospital Infrastructure"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="text-xs font-extrabold text-secondary uppercase tracking-widest">
                    World Class Infrastructure
                  </div>
                  <div className="text-xl font-bold">24x7 Emergency Hospital Facade</div>
                  <div className="text-xs text-slate-300">Pratap Pura Chauraha, Agra</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-slate-50 dark:bg-navy-light border-y border-slate-200 dark:border-navy-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-border shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary dark:text-secondary flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                To provide accessible, ethical, and world-class multi-speciality medical care for every child, mother, and family using advanced technology and evidence-based medicine.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-border shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                To be the most trusted healthcare institution in Western Uttar Pradesh, recognized for medical excellence, zero-compromise critical care, and compassionate healing.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-border shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Core Values</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Patient First Safety, Absolute Transparency, Clinical Precision, Continuous Innovation, and Empathetic Care for Every Little Life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Director Section Component */}
      <DirectorSection />

      {/* Why Choose Us */}
      <WhyChooseUs />
    </div>
  );
}
