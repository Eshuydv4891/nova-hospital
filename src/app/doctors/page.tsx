"use client";

import React, { useState } from "react";
import Image from "next/image";
import DirectorSection from "@/components/DirectorSection";
import { useHospital } from "@/context/HospitalContext";
import {
  Stethoscope,
  GraduationCap,
  Award,
  Clock,
  Calendar,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Search,
} from "lucide-react";

export default function DoctorsPage() {
  const { doctors, openBookingModal } = useHospital();
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const departments = ["All", ...Array.from(new Set(doctors.map((d) => d.department)))];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = selectedDept === "All" || doc.department === selectedDept;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-navy via-navy-light to-navy text-white py-16 border-b border-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-4 h-4" /> Medical Faculty & Leadership
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Distinguished <span className="gold-text-gradient">Doctors & Specialists</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Led by Director Dr. Vijay Yadav, our team of board-certified pediatricians, gynecologists, surgeons, and critical care specialists provide round-the-clock medical care.
          </p>
        </div>
      </section>

      {/* Director Section Featured First */}
      <DirectorSection />

      {/* Specialist Doctors Roster */}
      <section className="py-20 bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200 dark:border-navy-border pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Specialist Consultant Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Filter by medical department or search doctor credentials
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Department Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                      selectedDept === dept
                        ? "bg-primary text-white shadow-md border border-secondary/40"
                        : "bg-slate-100 dark:bg-navy-light text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative shrink-0 w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search doctor name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>
          </div>

          {/* Doctor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className={`glass-card rounded-3xl p-6 border-2 transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl flex flex-col justify-between ${
                  doc.isDirector ? "border-secondary shadow-gold" : "border-slate-200 dark:border-navy-border"
                }`}
              >
                <div className="space-y-4">
                  {/* Image & Header Info */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-24 h-28 rounded-2xl overflow-hidden border-2 border-secondary/50 shadow-md bg-slate-900 shrink-0">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="space-y-1">
                      {doc.isDirector && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary text-[10px] font-black uppercase tracking-wider border border-secondary/40">
                          Director Profile
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-semibold text-primary dark:text-secondary">{doc.role}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{doc.department}</p>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                        <Award className="w-3.5 h-3.5" /> {doc.experienceYears}+ Years Experience
                      </div>
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-navy-border">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <GraduationCap className="w-4 h-4 text-secondary" /> Degrees & Qualifications:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {doc.qualifications.map((qual, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-light text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200 dark:border-navy-border"
                        >
                          {qual}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {doc.bio}
                  </p>

                  {/* OPD Hours */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-light border border-slate-200 dark:border-navy-border text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-secondary" /> OPD Hours:
                      </span>
                      <span className="text-primary dark:text-secondary font-bold">{doc.availableDays}</span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-[11px]">{doc.opdHours}</div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-navy-border flex items-center justify-between gap-2">
                  <button
                    onClick={() => openBookingModal(doc.department, doc.name)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold py-2.5 rounded-xl shadow-red text-xs transition-all border border-secondary/40"
                  >
                    <Calendar className="w-4 h-4 text-secondary" /> Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
