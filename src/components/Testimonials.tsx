"use client";

import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle, Sparkles } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rajesh & Priya Agrawal",
      role: "Parents of Baby Aarav",
      text: "When our premature baby was born needing urgent Level-III NICU care, Dr. Vijay Yadav and his nursing team at Nova Medicare Hospital saved our child's life. The dedication and 24x7 monitoring were beyond world-class. Truly Agra's best pediatric hospital!",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      service: "NICU & Pediatric Care",
    },
    {
      name: "Sunita Sharma",
      role: "Maternity Patient",
      text: "I had a high-risk pregnancy and underwent delivery under Dr. Ananya Sharma. The operation theatre, nursing staff, and patient rooms were immaculately clean and peaceful. Highly recommend Nova Medicare to every family in Agra.",
      rating: 5,
      date: "1 month ago",
      verified: true,
      service: "Obstetrics & Gynecology",
    },
    {
      name: "Vikram Malhotra",
      role: "Emergency Trauma Patient",
      text: "Brought my brother to Nova Medicare Trauma Center at 2 AM after an accident. The emergency doctors acted immediately without any unnecessary delay. The 24x7 X-Ray and pharmacy right inside the premises made everything seamless.",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      service: "24x7 Emergency & Trauma",
    },
    {
      name: "Meena Gupta",
      role: "Parent of Ananya",
      text: "Dr. Vijay Yadav is extremely polite and explains every medical diagnosis clearly. He never prescribes unnecessary antibiotics. The child-friendly consultation rooms made my 3-year-old daughter completely comfortable.",
      rating: 5,
      date: "2 months ago",
      verified: true,
      service: "Pediatric Consultation",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-slate-100 dark:bg-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-secondary" /> Patient Reviews & Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by Thousands of Families in Agra
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Read real Google-verified reviews from parents and patients treated at Nova Medicare Hospital.
          </p>
        </div>

        {/* Testimonial Card Display */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-secondary/40 shadow-2xl relative">
            <Quote className="w-16 h-16 text-secondary/20 absolute top-6 right-8 pointer-events-none" />

            <div className="space-y-6">
              {/* Rating & Service Tag */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                  <span className="ml-2 font-bold text-slate-900 dark:text-white text-sm">5.0 / 5.0</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-secondary text-xs font-bold border border-primary/20">
                  {testimonials[currentIndex].service}
                </span>
              </div>

              {/* Review Quote Text */}
              <p className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-100 italic leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Patient Detail */}
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-navy-border pt-6">
                <div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                    {testimonials[currentIndex].name}
                    {testimonials[currentIndex].verified && (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].date}
                  </div>
                </div>

                {/* Carousel Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 rounded-full bg-slate-200 dark:bg-navy-light hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-navy transition-colors text-slate-700 dark:text-slate-200"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-3 rounded-full bg-slate-200 dark:bg-navy-light hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-navy transition-colors text-slate-700 dark:text-slate-200"
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
