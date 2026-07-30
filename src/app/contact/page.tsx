"use client";

import React, { useState } from "react";
import { useHospital } from "@/context/HospitalContext";
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  MessageCircle,
  ShieldAlert,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const { addQuery } = useHospital();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    addQuery({
      name: form.name,
      phone: form.phone,
      email: form.email || "N/A",
      subject: form.subject || "General Query",
      message: form.message,
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-gradient-to-r from-navy via-navy-light to-navy text-white py-16 border-b border-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" /> 24x7 Hospital Location & Support
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact <span className="gold-text-gradient">Nova Medicare Hospital</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Located conveniently at Pratap Pura Chauraha, Agra. We are available round-the-clock for emergency transport and consultations.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Get in Touch With Us
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Our patient desk team will answer your questions and assist with ambulance transport immediately.
                </p>
              </div>

              {/* Address Card */}
              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-navy-border shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary dark:text-secondary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Hospital Address</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Pratap Pura Chauraha, Near Devi Ram Sweets, Agra – 282001, Uttar Pradesh
                  </p>
                </div>
              </div>

              {/* Emergency Call Card */}
              <div className="glass-card p-6 rounded-2xl border-2 border-red-500/40 shadow-sm flex items-start gap-4 bg-red-500/5">
                <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 animate-bounce">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-red-600 dark:text-red-400 text-base">24x7 Emergency Hotline</h4>
                  <a href="tel:8955992944" className="text-xl font-black text-slate-900 dark:text-white hover:text-primary block">
                    8955992944
                  </a>
                  <p className="text-xs text-slate-500">Ambulance & Trauma Desk</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-navy-border shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Email Inquiry</h4>
                  <a href="mailto:novamedicarechildrenhospital@gmail.com" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-secondary break-all">
                    novamedicarechildrenhospital@gmail.com
                  </a>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://wa.me/918955992944?text=Hello%20Nova%20Medicare%20Hospital,%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Desk
                </a>
                <a
                  href="tel:8955992944"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3.5 rounded-2xl text-sm shadow-red"
                >
                  <ShieldAlert className="w-5 h-5 text-secondary" /> Emergency Call
                </a>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-secondary/40 shadow-2xl space-y-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    We usually respond within 1 hour during hospital working hours.
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Thank you <strong>{form.name}</strong>. Our hospital reception team will reach out to <strong>{form.phone}</strong> shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-slate-200 dark:bg-navy-light text-slate-800 dark:text-white px-5 py-2 rounded-xl text-sm font-bold"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Kumar"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                        <input
                          type="text"
                          placeholder="e.g. OPD timing / NICU bed availability"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message Detail</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Write your message or inquiry..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3.5 rounded-2xl shadow-red flex items-center justify-center gap-2 border border-secondary/40 text-base"
                    >
                      <Send className="w-4 h-4 text-secondary" /> Submit Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="mt-16 rounded-3xl overflow-hidden border-2 border-secondary/40 shadow-2xl h-[450px]">
            <iframe
              title="Nova Medicare Hospital Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.9190184711314!2d78.0064567!3d27.1588697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747754b2bb0001%3A0x8673b18cb2bf6259!2sPratap%20Pura%20Chauraha%2C%20Agra%2C%20Uttar%20Pradesh%20282001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
