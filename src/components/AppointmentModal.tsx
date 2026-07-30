"use client";

import React, { useState, useEffect } from "react";
import { useHospital } from "@/context/HospitalContext";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  MessageCircle,
} from "lucide-react";

export default function AppointmentModal() {
  const {
    isBookingModalOpen,
    closeBookingModal,
    modalPrefillDept,
    modalPrefillDoc,
    doctors,
    addAppointment,
  } = useHospital();

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

  useEffect(() => {
    if (modalPrefillDept) {
      setFormData((prev) => ({ ...prev, department: modalPrefillDept }));
    }
    if (modalPrefillDoc) {
      setFormData((prev) => ({ ...prev, doctor: modalPrefillDoc }));
    }
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    setFormData((prev) => ({ ...prev, preferredDate: `${yyyy}-${mm}-${dd}` }));
  }, [modalPrefillDept, modalPrefillDoc, isBookingModalOpen]);

  if (!isBookingModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone) {
      setErrorMsg("Please fill in patient name and phone number.");
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
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message || "Online Booking Request",
      });

      setSuccessApp(created);
    } catch (err) {
      setErrorMsg("Failed to book appointment. Please try calling 8955992944.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSuccessApp(null);
    closeBookingModal();
  };

  const whatsappMessage = successApp
    ? encodeURIComponent(
        `Hello Nova Medicare Hospital,\nI have booked an appointment online:\n• ID: ${successApp.id}\n• Patient: ${successApp.patientName}\n• Dept: ${successApp.department}\n• Doctor: ${successApp.doctor}\n• Date: ${successApp.preferredDate} (${successApp.preferredTime})\n• Phone: ${successApp.phone}`
      )
    : "";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-navy w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-secondary/40 relative overflow-hidden my-8 animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary via-primary-dark to-navy text-white p-6 border-b border-secondary/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-white">Book Doctor Appointment</h3>
              <p className="text-xs text-slate-200">Nova Medicare Hospital • Agra</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {successApp ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Appointment Request Submitted!
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Thank you <strong className="text-primary dark:text-secondary">{successApp.patientName}</strong>. Your appointment request for <strong>{successApp.department}</strong> ({successApp.doctor}) has been logged successfully into our system.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-navy-light text-left text-xs sm:text-sm space-y-1.5 border border-slate-200 dark:border-navy-border">
                <div><strong>Appointment ID:</strong> {successApp.id}</div>
                <div><strong>Preferred Date:</strong> {successApp.preferredDate} ({successApp.preferredTime})</div>
                <div><strong>Contact Phone:</strong> {successApp.phone}</div>
                <div><strong>Status:</strong> <span className="text-amber-500 font-bold">Pending Confirmation</span></div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/918955992944?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-sm"
                >
                  <MessageCircle className="w-5 h-5" /> Send Confirmation on WhatsApp
                </a>
                <button
                  onClick={resetAndClose}
                  className="w-full sm:w-auto bg-slate-200 dark:bg-navy-light text-slate-800 dark:text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-300 transition-colors text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-100 text-red-700 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Patient Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Age */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Age
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 yrs / 6 mos"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Preferred Time */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="24x7 Emergency">24x7 Emergency</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Department */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Select Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none font-semibold"
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
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Doctor
                  </label>
                  <select
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none font-semibold"
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
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Appointment Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Symptoms or Special Request
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your health condition, symptoms, or preferred notes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold py-3.5 rounded-2xl shadow-red transition-all flex items-center justify-center gap-2 border border-secondary/40 text-base"
              >
                {isSubmitting ? (
                  "Processing Booking..."
                ) : (
                  <>
                    <Calendar className="w-5 h-5 text-secondary" /> Confirm Appointment Request
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
