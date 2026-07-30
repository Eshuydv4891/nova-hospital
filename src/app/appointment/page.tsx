"use client";

import React, { useState } from "react";
import { useHospital } from "@/context/HospitalContext";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageCircle,
  CheckCircle2,
  Stethoscope,
  ShieldAlert,
  MapPin,
  Mail,
} from "lucide-react";

export default function AppointmentPage() {
  const { doctors, addAppointment } = useHospital();

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "Male",
    phone: "",
    department: "Pediatrics",
    doctor: "Dr. Vijay Yadav",
    preferredDate: "",
    preferredTime: "10:30 AM",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successApp, setSuccessApp] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone) {
      setErrorMsg("Please provide patient name and contact phone number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const created = await addAppointment({
        patientName: formData.patientName,
        age: formData.age || "N/A",
        gender: formData.gender,
        phone: formData.phone,
        department: formData.department,
        doctor: formData.doctor,
        preferredDate: formData.preferredDate || new Date().toISOString().split("T")[0],
        preferredTime: formData.preferredTime,
        message: formData.message || "Online Portal Booking",
      });

      setSuccessApp(created);
    } catch (err) {
      setErrorMsg("Booking failed. Please contact 9557716431.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = successApp
    ? encodeURIComponent(
      `Hello Nova Medicare Hospital,\nI submitted an appointment request online:\n• Booking ID: ${successApp.id}\n• Patient: ${successApp.patientName}\n• Dept: ${successApp.department}\n• Doctor: ${successApp.doctor}\n• Date: ${successApp.preferredDate} (${successApp.preferredTime})\n• Phone: ${successApp.phone}`
    )
    : "";

  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-gradient-to-r from-navy via-navy-light to-navy text-white py-16 border-b border-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" /> Instant Online OPD Booking
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Book Appointment <span className="gold-text-gradient">Online</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Schedule a consultation with Dr. Vijay Yadav and our expert specialist team in Agra. Fast, easy, and instant confirmation.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-20 bg-slate-50 dark:bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-secondary/40 shadow-2xl relative">
            {successApp ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    Appointment Successfully Booked!
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                    We have received your appointment request for <strong>{successApp.patientName}</strong> in <strong>{successApp.department}</strong>. Our receptionist will call your phone number ({successApp.phone}) shortly to confirm.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-navy-light text-left text-sm space-y-2 border border-slate-200 dark:border-navy-border max-w-md mx-auto">
                  <div><strong>Booking Ref ID:</strong> {successApp.id}</div>
                  <div><strong>Doctor:</strong> {successApp.doctor}</div>
                  <div><strong>Department:</strong> {successApp.department}</div>
                  <div><strong>Requested Date & Time:</strong> {successApp.preferredDate} ({successApp.preferredTime})</div>
                  <div><strong>Status:</strong> <span className="text-amber-500 font-bold">Pending Confirmation</span></div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href={`https://wa.me/919557716431?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg text-base"
                  >
                    <MessageCircle className="w-5 h-5" /> Send Booking Info on WhatsApp
                  </a>
                  <button
                    onClick={() => setSuccessApp(null)}
                    className="w-full sm:w-auto bg-slate-200 dark:bg-navy-light text-slate-800 dark:text-white font-bold px-6 py-3.5 rounded-xl text-base"
                  >
                    Book Another Appointment
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-slate-200 dark:border-navy-border pb-4">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Patient Details & Consultation Request
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Fill out the form below to secure your consultation slot.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-100 text-red-700 text-sm font-semibold">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Patient Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Patient Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aarav Sharma"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9557716431"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {/* Age */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Patient Age
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4 Years / 3 Months"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none font-semibold"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Preferred Time */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none font-semibold"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="05:30 PM">05:30 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Department */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Select Medical Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none font-bold"
                    >
                      <option value="Pediatrics">Pediatrics & Neonatology</option>
                      <option value="NICU & PICU">Level-III NICU & PICU</option>
                      <option value="Adult ICU">Adult Intensive Care Unit (ICU)</option>
                      <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                      <option value="Orthopedics">Orthopedics & Fracture Care</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Laparoscopic Surgery">Laparoscopic Surgery</option>
                      <option value="Trauma Center">24x7 Emergency & Trauma</option>
                      <option value="Diagnostics">Diagnostic Services & Lab</option>
                    </select>
                  </div>

                  {/* Doctor */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Select Doctor
                    </label>
                    <select
                      value={formData.doctor}
                      onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none font-bold"
                    >
                      {doctors.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.department})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Preferred Consultation Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none font-semibold"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Health Symptoms or Special Instructions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe any symptoms, medical history, or specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-extrabold py-4 rounded-2xl shadow-red text-base transition-all flex items-center justify-center gap-2 border border-secondary/40"
                >
                  {isSubmitting ? (
                    "Booking Appointment..."
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 text-secondary" /> Submit Appointment Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
