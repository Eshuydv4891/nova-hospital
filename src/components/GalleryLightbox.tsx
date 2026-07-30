"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GalleryItem } from "@/context/HospitalContext";

interface GalleryLightboxProps {
  items: GalleryItem[];
  initialIndex?: number;
  onClose: () => void;
}

export default function GalleryLightbox({ items, initialIndex = 0, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const current = items[index];

  if (!current) return null;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
      {/* Lightbox Topbar */}
      <div className="flex items-center justify-between text-white z-10 max-w-7xl mx-auto w-full">
        <div>
          <h3 className="text-xl font-bold text-secondary">{current.title}</h3>
          <span className="text-xs text-slate-300">
            Category: {current.category} • Image {index + 1} of {items.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image / Video Container */}
      <div className="relative my-auto flex items-center justify-center max-w-5xl mx-auto w-full h-[65vh]">
        {current.type === "video" || current.videoUrl ? (
          current.videoUrl?.includes("youtube.com") || current.videoUrl?.includes("youtu.be") ? (
            <iframe
              src={
                current.videoUrl.includes("watch?v=")
                  ? current.videoUrl.replace("watch?v=", "embed/")
                  : current.videoUrl
              }
              title={current.title}
              className="w-full h-full rounded-2xl border border-secondary/30 shadow-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={current.videoUrl || current.image}
              controls
              autoPlay
              className="max-h-full max-w-full rounded-2xl shadow-2xl border border-secondary/30 object-contain"
            />
          )
        ) : (
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-contain transition-all duration-300"
          />
        )}

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-secondary hover:text-navy text-white transition-colors border border-white/20 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-secondary hover:text-navy text-white transition-colors border border-white/20 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Description Strip */}
      <div className="bg-navy-light/90 max-w-4xl mx-auto w-full p-4 rounded-2xl border border-secondary/30 text-center text-white space-y-1">
        <p className="text-sm font-semibold">{current.description}</p>
        <p className="text-xs text-slate-400">Nova Medicare Hospital Infrastructure & Facilities</p>
      </div>
    </div>
  );
}
