"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, ArrowUp, Calendar } from "lucide-react";
import { useHospital } from "@/context/HospitalContext";

export default function FloatingCTA() {
  const { openBookingModal } = useHospital();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-slate-900 dark:bg-navy-light text-white flex items-center justify-center shadow-2xl border border-secondary/40 hover:bg-primary transition-all duration-300 transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-secondary" />
        </button>
      )}

      {/* Floating Appointment Button */}
      <button
        onClick={() => openBookingModal()}
        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-bold px-4 py-3 rounded-full shadow-red border border-secondary/40 hover:shadow-gold transition-all duration-300 transform hover:scale-105"
      >
        <Calendar className="w-5 h-5 text-secondary animate-bounce" />
        <span className="text-xs">Quick Appointment</span>
      </button>

      {/* Direct Emergency Call Button */}
      <a
        href="tel:8955992944"
        className="w-13 h-13 rounded-full bg-gradient-to-r from-red-600 to-primary text-white flex items-center justify-center shadow-red border-2 border-white hover:scale-110 transition-transform animate-pulse"
        title="24x7 Emergency Call"
      >
        <Phone className="w-6 h-6 text-white" />
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918955992944?text=Hello%20Nova%20Medicare%20Hospital,%20I%20want%20to%20inquire%20about%20medical%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl border-2 border-white transform hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
