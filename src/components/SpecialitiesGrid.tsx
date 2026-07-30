"use client";

import React from "react";
import { useHospital } from "@/context/HospitalContext";
import {
  Baby,
  HeartPulse,
  Activity,
  ShieldAlert,
  Stethoscope,
  Scissors,
  Microscope,
  Pill,
  Syringe,
  Bone,
  UserCheck,
  Zap,
  ArrowRight,
  Calendar,
} from "lucide-react";

export const specialitiesList = [
  {
    id: "pediatrics",
    name: "Pediatrics",
    subtitle: "Complete Care for Newborns & Children",
    icon: Baby,
    description: "Expert pediatric consultations, growth monitoring, developmental assessments, and comprehensive vaccination by Dr. Vijay Yadav.",
    features: ["Child Growth Tracking", "Painless Immunization", "Nutritional Counseling"],
    color: "from-amber-500/20 to-secondary/20",
  },
  {
    id: "neonatology",
    name: "Neonatology",
    subtitle: "Specialized Care for High-Risk Newborns",
    icon: Syringe,
    description: "Dedicated medical interventions for pre-term infants, low birth weight babies, and neonatal jaundice treatment.",
    features: ["Preterm Care", "Jaundice Phototherapy", "Neonatal Screening"],
    color: "from-blue-500/20 to-primary/20",
  },
  {
    id: "nicu",
    name: "Level-III NICU",
    subtitle: "Neonatal Intensive Care Unit",
    icon: Activity,
    description: "State-of-the-art Level-III NICU equipped with advanced warmers, high-frequency ventilators, and continuous vital monitoring.",
    features: ["24x7 Neonatologists", "Advanced Ventilators", "Surfactant Therapy"],
    color: "from-red-500/20 to-primary/20",
  },
  {
    id: "picu",
    name: "PICU Care",
    subtitle: "Pediatric Intensive Care Unit",
    icon: HeartPulse,
    description: "Intensive pediatric critical care for acute severe respiratory distress, pediatric asthma, neurological & cardiac emergencies.",
    features: ["Multi-Para Monitors", "Pediatric Intensivists", "Post-op Recovery"],
    color: "from-purple-500/20 to-primary/20",
  },
  {
    id: "icu",
    name: "Adult ICU",
    subtitle: "Multi-Disciplinary Critical Care",
    icon: Stethoscope,
    description: "Multi-bed adult Intensive Care Unit for critical medical emergencies, sepsis management, and post-surgical stabilization.",
    features: ["Central Monitoring", "Non-Invasive Vent", "Dialysis Support"],
    color: "from-emerald-500/20 to-primary/20",
  },
  {
    id: "obs-gyne",
    name: "Obstetrics & Gynecology",
    subtitle: "Comprehensive Women's Healthcare",
    icon: UserCheck,
    description: "Complete maternity, painless delivery, high-risk pregnancy management, fetal monitoring, and gynecological surgeries.",
    features: ["Painless Delivery", "High-Risk Pregnancy", "Fetal Ultrasound"],
    color: "from-pink-500/20 to-primary/20",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    subtitle: "Bone, Joint & Trauma Care",
    icon: Bone,
    description: "Fracture management, pediatric orthopedics, joint reconstruction, spinal care, and minimally invasive trauma surgery.",
    features: ["Complex Fracture Care", "Joint Surgeries", "Pediatric Ortho"],
    color: "from-cyan-500/20 to-primary/20",
  },
  {
    id: "gen-medicine",
    name: "General Medicine",
    subtitle: "Internal Medicine & Chronic Care",
    icon: Activity,
    description: "Diagnosis and management of fever, dengue, typhoid, diabetes, hypertension, respiratory infections, and lifestyle ailments.",
    features: ["Infectious Diseases", "Diabetes Management", "Preventive Health"],
    color: "from-indigo-500/20 to-primary/20",
  },
  {
    id: "gen-surgery",
    name: "General Surgery",
    subtitle: "Surgical Operations & Procedures",
    icon: Scissors,
    description: "Comprehensive surgical procedures including hernia repair, appendix surgery, wound management, and emergency operations.",
    features: ["Emergency Surgeries", "Hernia Repair", "Clean Surgical Suites"],
    color: "from-teal-500/20 to-primary/20",
  },
  {
    id: "laparoscopic",
    name: "Laparoscopic Surgery",
    subtitle: "Minimally Invasive Keyhole Procedures",
    icon: Zap,
    description: "Advanced laparoscopic gall bladder, appendix, hernia, and gynecological surgeries ensuring quick recovery and minimal scarring.",
    features: ["Keyhole Technology", "Faster Recovery", "Minimal Pain"],
    color: "from-yellow-500/20 to-secondary/20",
  },
  {
    id: "trauma",
    name: "Trauma Center",
    subtitle: "24x7 Accidental & Emergency Unit",
    icon: ShieldAlert,
    description: "Round-the-clock emergency room for accidental trauma, polytrauma resuscitation, acute chest pain, and critical stabilization.",
    features: ["24x7 Ambulance", "Triage Protocol", "Emergency OT"],
    color: "from-red-600/30 to-primary/30",
  },
  {
    id: "diagnostics",
    name: "Diagnostic Services",
    subtitle: "Laboratory & Imaging Center",
    icon: Microscope,
    description: "Fully automated pathology lab, digital X-Ray, 3D/4D ultrasound, ECG, and rapid blood testing facility inside hospital premises.",
    features: ["Digital X-Ray", "Automated Pathology", "Instant Reports"],
    color: "from-sky-500/20 to-primary/20",
  },
  {
    id: "pharmacy",
    name: "24x7 Pharmacy",
    subtitle: "In-House Hospital Chemist",
    icon: Pill,
    description: "Round-the-clock stocked pharmacy providing genuine pediatric formulas, surgical disposables, emergency injections & medications.",
    features: ["100% Genuine Drugs", "Cold Storage Meds", "24x7 Open"],
    color: "from-emerald-600/20 to-secondary/20",
  },
];

export default function SpecialitiesGrid() {
  const { openBookingModal } = useHospital();

  return (
    <section className="py-20 bg-slate-50 dark:bg-navy relative overflow-hidden" id="specialities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary dark:text-secondary text-xs sm:text-sm font-bold uppercase tracking-wider">
            <HeartPulse className="w-4 h-4 text-secondary" /> Multi Super Speciality Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Medical Departments & Specialities
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            From specialized newborn NICU care to advanced laparoscopic surgery and 24x7 emergency trauma care under expert medical directors.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialitiesList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="glass-card rounded-3xl p-7 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl border border-slate-200 dark:border-navy-border relative group flex flex-col justify-between overflow-hidden"
              >
                {/* Top Subtle Gradient Accents */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-500`}></div>

                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary-hover to-navy text-white flex items-center justify-center shadow-md border border-secondary/40 group-hover:rotate-6 transition-transform">
                      <Icon className="w-7 h-7 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-primary dark:text-secondary font-semibold">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 mb-6">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-200 dark:border-navy-border flex items-center justify-between">
                  <button
                    onClick={() => openBookingModal(item.name)}
                    className="flex items-center gap-1 text-xs font-extrabold text-primary dark:text-secondary hover:underline group-hover:gap-2 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Consultation
                  </button>

                  <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-navy-light flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
