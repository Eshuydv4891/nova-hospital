"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useHospital, GalleryItem } from "@/context/HospitalContext";
import GalleryLightbox from "@/components/GalleryLightbox";
import { Image as ImageIcon, Maximize2, Sparkles, Camera, Video, Play } from "lucide-react";

export default function GalleryPage() {
  const { gallery } = useHospital();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Building", "NICU & PICU", "ICU & OT", "Diagnostics", "Facilities", "Doctors", "Videos"];

  const filteredItems = selectedCategory === "All"
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-gradient-to-r from-navy via-navy-light to-navy text-white py-16 border-b border-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider">
            <Camera className="w-4 h-4" /> Hospital Facilities & Infrastructure
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Photo & <span className="gold-text-gradient">Video Gallery</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Take a virtual tour of Nova Medicare Hospital's modern building, Level-III NICU, modular operation theatres, and child-friendly clinical spaces.
          </p>
        </div>
      </section>

      {/* Main Gallery Grid */}
      <section className="py-20 bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md border border-secondary/40"
                    : "bg-slate-100 dark:bg-navy-light text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image/Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => {
              const isVideo = item.type === "video" || !!item.videoUrl;
              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-slate-200 dark:border-navy-border hover:border-secondary transition-all duration-300 transform hover:-translate-y-1.5"
                >
                  {isVideo && !item.image ? (
                    <video src={item.videoUrl} className="w-full h-full object-cover" />
                  ) : (
                    <Image
                      src={item.image || "/images/nova-hospital-building.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary/80 border-2 border-secondary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-secondary border border-secondary/30 group-hover:scale-110 transition-transform">
                    {isVideo ? <Video className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-secondary/30 text-secondary text-[10px] font-bold uppercase tracking-wider">
                      {item.category} {isVideo ? "• VIDEO" : ""}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-tight group-hover:text-secondary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 line-clamp-1">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={filteredItems}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
