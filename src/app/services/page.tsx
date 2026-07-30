"use client";

import React, { useState } from "react";
import SpecialitiesGrid, { specialitiesList } from "@/components/SpecialitiesGrid";
import { useHospital } from "@/context/HospitalContext";
import {
  Calendar,
  CheckCircle2,
  Stethoscope,
  ShieldAlert,
  PhoneCall,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function ServicesPage() {
  const { openBookingModal } = useHospital();
  const [selectedDept, setSelectedDept] = useState(specialitiesList[0]);

  return (
    <div className="space-y-0">
      {/* Services Banner */}
      <section className="bg-gradient-to-r from-navy via-navy-light to-navy text-white py-16 border-b border-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-4 h-4" /> Comprehensive Super Specialities
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Medical <span className="gold-text-gradient">Departments & Services</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            World-class diagnostic, critical care, pediatric, surgical, and emergency medical services under one roof at Nova Medicare Hospital, Agra.
          </p>
        </div>
      </section>

      {/* Main Interactive Department Inspector */}
      <section className="py-20 bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Department Selector Tabs */}
            <div className="lg:col-span-4 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white px-2 mb-3">
                Select Department:
              </h3>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-2">
                {specialitiesList.map((dept) => {
                  const Icon = dept.icon;
                  const isSelected = selectedDept.id === dept.id;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDept(dept)}
                      className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                        isSelected
                          ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg border border-secondary/40"
                          : "bg-slate-50 dark:bg-navy-light text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-border border border-slate-200 dark:border-navy-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isSelected ? "bg-secondary text-navy" : "bg-primary/10 text-primary dark:text-secondary"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm">{dept.name}</div>
                          <div className={`text-[11px] ${isSelected ? "text-slate-200" : "text-slate-500 dark:text-slate-400"}`}>
                            {dept.subtitle}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isSelected ? "text-secondary" : "text-slate-400"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed Inspector Panel */}
            <div className="lg:col-span-8">
              <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-secondary/40 shadow-2xl space-y-6">
                {/* Department Header */}
                <div className="flex items-center gap-4 border-b border-slate-200 dark:border-navy-border pb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary-hover to-navy text-white flex items-center justify-center shadow-gold border border-secondary/40 shrink-0">
                    <selectedDept.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {selectedDept.name}
                    </h2>
                    <p className="text-sm font-semibold text-primary dark:text-secondary">
                      {selectedDept.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Overview & Clinical Scope</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {selectedDept.description} Our multi-disciplinary clinical team works around the clock to provide patient-centered care according to strict international safety protocols.
                  </p>
                </div>

                {/* Facilities & Key Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-light border border-slate-200 dark:border-navy-border space-y-3">
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-secondary" /> Key Clinical Facilities
                    </h5>
                    <ul className="space-y-2 text-xs sm:text-sm">
                      {selectedDept.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/20 space-y-3">
                    <h5 className="font-bold text-primary dark:text-red-400 text-sm flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" /> 24x7 Availability
                    </h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      Equipped with round-the-clock emergency doctors, diagnostic pathology, and immediate patient admission protocols at Pratap Pura Chauraha.
                    </p>
                    <a href="tel:8955992944" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-secondary hover:underline">
                      <PhoneCall className="w-3.5 h-3.5" /> Call Hotline: 8955992944
                    </a>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-slate-200 dark:border-navy-border flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Consultation Timings</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">10:00 AM - 08:00 PM (Emergency 24x7)</div>
                  </div>
                  <button
                    onClick={() => openBookingModal(selectedDept.name)}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-bold px-7 py-3.5 rounded-full shadow-red hover:shadow-gold transition-all text-sm"
                  >
                    <Calendar className="w-4 h-4 text-secondary" /> Book Appointment for {selectedDept.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialities Grid Full Overview */}
      <SpecialitiesGrid />
    </div>
  );
}
