"use client";

import Hero from "@/components/Hero";
import DirectorSection from "@/components/DirectorSection";
import SpecialitiesGrid from "@/components/SpecialitiesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import {
  PhoneCall,
  MapPin,
  Calendar,
  MessageCircle,
  Clock,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  HeartPulse,
} from "lucide-react";
import { useHospital } from "@/context/HospitalContext";

export default function Home() {
  const { openBookingModal } = useHospital();

  return (
    <div className="space-y-0">
      {/* Hero Banner */}
      <Hero />

      {/* Director Spotlight (Dr. Vijay Yadav) */}
      <DirectorSection />

      {/* Specialities & Departments Grid */}
      <SpecialitiesGrid />

      {/* Why Choose Nova Medicare */}
      <WhyChooseUs />

      {/* Patient Testimonials */}
      <Testimonials />

      {/* Direct Contact & Location Highlight Section */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy-light to-navy text-white relative overflow-hidden border-t border-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-secondary" /> Visit Us Today in Agra
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Centrally Located at <br />
                <span className="gold-text-gradient">Pratap Pura Chauraha</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Located near Devi Ram Sweets in Agra, Nova Medicare Hospital is easily accessible 24 hours a day for emergency transport, pediatric consultations, and super speciality treatments.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <MapPin className="w-6 h-6 text-secondary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-base">Hospital Address</h4>
                    <p className="text-sm text-slate-300">
                      Pratap Pura Chauraha, Near Devi Ram Sweets, Agra – 282001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <PhoneCall className="w-6 h-6 text-secondary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-base">Direct Contact & Emergency</h4>
                    <p className="text-sm text-slate-300">
                      Phone: <a href="tel:8955992944" className="font-bold text-secondary hover:underline">8955992944</a>
                    </p>
                    <p className="text-xs text-slate-400">
                      Email: novamedicarechildrenhospital@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => openBookingModal()}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold px-7 py-3.5 rounded-full shadow-red border border-secondary/40 text-base"
                >
                  <Calendar className="w-5 h-5 text-secondary" /> Book Online Now
                </button>
                <a
                  href="https://wa.me/918955992944?text=Hello%20Nova%20Medicare%20Hospital,%20I%20need%20directions%20and%20info."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-full text-base transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Directions
                </a>
              </div>
            </div>

            {/* Embedded Google Map Preview */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border-2 border-secondary/40 shadow-2xl h-[420px] relative bg-slate-900">
                <iframe
                  title="Nova Medicare Hospital Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.9190184711314!2d78.0064567!3d27.1588697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747754b2bb0001%3A0x8673b18cb2bf6259!2sPratap%20Pura%20Chauraha%2C%20Agra%2C%20Uttar%20Pradesh%20282001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter contrast-105"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
