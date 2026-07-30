"use client";

import React from "react";
import Link from "next/link";
import {
  HeartPulse,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  Award,
  Calendar,
} from "lucide-react";
import { useHospital } from "@/context/HospitalContext";

export default function Footer() {
  const { openBookingModal } = useHospital();

  return (
    <footer className="bg-navy dark:bg-black text-slate-300 pt-16 pb-8 border-t-2 border-secondary/30 relative overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Emergency CTA Strip */}
        <div className="bg-gradient-to-r from-primary via-primary-dark to-navy p-6 rounded-2xl border border-secondary/40 shadow-gold mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/40 shrink-0">
              <Phone className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Need Immediate Medical Attention?
              </h3>
              <p className="text-sm text-slate-200">
                24×7 Emergency & Critical Ambulance Assistance available round-the-clock in Agra.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap w-full md:w-auto">
            <a
              href="tel:8955992944"
              className="w-full sm:w-auto text-center bg-secondary hover:bg-secondary-hover text-navy font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 text-base"
            >
              Call 8955992944
            </a>
            <button
              onClick={() => openBookingModal()}
              className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl border border-white/30 transition-all text-base"
            >
              Book Online
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: About Hospital */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-secondary border border-secondary/40">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                NOVA <span className="text-secondary">MEDICARE</span>
              </span>
            </div>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">
              "Caring for Every Child, Every Family."
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nova Medicare Hospital is Agra's premier Multi Super Speciality Hospital, featuring Level-III NICU, PICU, Adult ICU, Trauma Center, and world-class Pediatric care under Director Dr. Vijay Yadav.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> NABH Standards
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-secondary" /> 24x7 Critical Support
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-white border-b border-secondary/30 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home Page", href: "/" },
                { label: "About Hospital", href: "/about" },
                { label: "Director Dr. Vijay Yadav", href: "/doctors" },
                { label: "Specialities & Services", href: "/services" },
                { label: "Hospital Gallery", href: "/gallery" },
                { label: "Child Care Blog", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
                { label: "Admin Portal", href: "/admin" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-secondary flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-secondary group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Main Departments */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-white border-b border-secondary/30 pb-2 inline-block">
              Main Departments
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Pediatrics & Neonatology",
                "Level-III NICU & PICU Care",
                "Adult Intensive Care Unit (ICU)",
                "Obstetrics & Gynecology",
                "Orthopedics & Joint Care",
                "General & Laparoscopic Surgery",
                "24x7 Emergency & Trauma",
                "Diagnostic Laboratory & Pharmacy",
              ].map((dept, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  {dept}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Reach Us & Location */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-b border-secondary/30 pb-2 inline-block">
              Hospital Address & Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <div>
                  <strong className="text-white">Address:</strong>
                  <p>Pratap Pura Chauraha, Near Devi Ram Sweets, Agra – 282001</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <strong className="text-white">Emergency Call:</strong>
                  <a href="tel:8955992944" className="hover:text-secondary block font-bold text-white">
                    8955992944
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Email:</strong>
                  <a href="mailto:novamedicarechildrenhospital@gmail.com" className="hover:text-secondary block text-xs break-all">
                    novamedicarechildrenhospital@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <strong className="text-white">OPD & Emergency:</strong>
                  <p className="text-xs">OPD: 10 AM - 8 PM | Emergency: 24×7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Map quick link */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Nova Medicare Hospital, Agra. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-secondary">
              Google Maps Location
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-secondary">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-secondary text-secondary font-semibold">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
