"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useHospital } from "@/context/HospitalContext";
import {
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Sun,
  Moon,
  Search,
  Calendar,
  Menu,
  X,
  ShieldAlert,
  ChevronRight,
  HeartPulse,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { openBookingModal } = useHospital();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Specialities", href: "/services" },
    { name: "Doctors", href: "/doctors" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const searchItems = [
    { name: "Pediatrics & Child Care", type: "Speciality", href: "/services#pediatrics" },
    { name: "Neonatal ICU (NICU)", type: "Speciality", href: "/services#nicu" },
    { name: "Pediatric ICU (PICU)", type: "Speciality", href: "/services#picu" },
    { name: "Dr. Vijay Yadav", type: "Director / Doctor", href: "/doctors" },
    { name: "24x7 Emergency & Trauma", type: "Emergency", href: "/contact" },
    { name: "Obstetrics & Gynecology", type: "Speciality", href: "/services#obs-gyne" },
    { name: "Orthopedics & Fracture Care", type: "Speciality", href: "/services#orthopedics" },
    { name: "24x7 Pharmacy & Lab", type: "Facilities", href: "/services#pharmacy" },
  ];

  const filteredSearch = searchQuery.trim()
    ? searchItems.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.type.toLowerCase().includes(searchQuery.toLowerCase()))
    : searchItems;

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg transition-colors">
      {/* 24x7 Emergency Top Ticker Bar */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white text-xs sm:text-sm py-2 px-4 border-b border-secondary/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-bold animate-pulse text-secondary">
              <ShieldAlert className="w-4 h-4 text-secondary" />
              24×7 EMERGENCY HOTLINE:
            </span>
            <a href="tel:8955992944" className="font-extrabold hover:text-secondary transition-colors tracking-wider flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> 8955992944
            </a>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:flex items-center gap-1 text-white/90">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              Pratap Pura Chauraha, Near Devi Ram Sweets, Agra
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href="https://wa.me/918955992944?text=Hello%20Nova%20Medicare%20Hospital,%20I%20want%20to%20inquire%20about%20medical%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Chat
            </a>
            <Link href="/admin" className="text-xs text-secondary hover:underline font-semibold hidden sm:inline">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glassmorphism Navbar */}
      <nav className="glass-panel backdrop-blur-xl bg-white/90 dark:bg-navy/90 border-b border-secondary/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary-hover to-navy flex items-center justify-center text-white shadow-gold border border-secondary/40 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-7 h-7 text-secondary animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-primary dark:text-white group-hover:text-primary transition-colors flex items-center gap-1">
                  NOVA <span className="text-secondary font-black">MEDICARE</span>
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-slate-600 dark:text-slate-300 uppercase">
                  Multi Super Speciality Hospital
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10 border-b-2 border-secondary"
                        : "text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-secondary hover:bg-slate-100 dark:hover:bg-navy-light"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Actions: Search, Theme Toggle, Book Appointment */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-light transition-colors"
                aria-label="Search site"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-light transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5 text-secondary" /> : <Moon className="w-5 h-5 text-primary" />}
              </button>

              <button
                onClick={() => openBookingModal()}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold px-5 py-2.5 rounded-full shadow-red hover:shadow-gold transition-all duration-300 border border-secondary/30 transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-secondary" />
                Book Appointment
              </button>
            </div>

            {/* Mobile Hamburger Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-light"
              >
                {theme === "dark" ? <Sun className="w-5 h-5 text-secondary" /> : <Moon className="w-5 h-5 text-primary" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-light focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-navy-border bg-white dark:bg-navy px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  pathname === link.href
                    ? "bg-primary text-white"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-light"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-navy-border flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-xl shadow-md"
              >
                <Calendar className="w-5 h-5 text-secondary" />
                Book Appointment Online
              </button>
              <a
                href="tel:8955992944"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 rounded-xl"
              >
                <Phone className="w-5 h-5" /> Call Emergency: 8955992944
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Global Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div className="bg-white dark:bg-navy w-full max-w-2xl rounded-2xl shadow-2xl border border-secondary/40 p-6 relative animate-fadeIn">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold text-primary dark:text-secondary mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" /> Quick Hospital Search
            </h3>
            <input
              type="text"
              placeholder="Search departments, doctors, services, emergency care..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary text-base mb-4"
              autoFocus
            />

            <div className="max-h-80 overflow-y-auto space-y-2">
              {filteredSearch.length > 0 ? (
                filteredSearch.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-light transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-secondary">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{item.type}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))
              ) : (
                <p className="text-center py-6 text-slate-500">No services matching "{searchQuery}"</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
