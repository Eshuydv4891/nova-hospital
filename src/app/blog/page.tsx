"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useHospital, BlogPost } from "@/context/HospitalContext";
import { BookOpen, Calendar, Clock, User, ArrowRight, Tag, X } from "lucide-react";

export default function BlogPage() {
  const { blogs } = useHospital();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="bg-gradient-to-r from-navy via-navy-light to-navy text-white py-16 border-b border-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Pediatric & Health Education
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Child Care Tips & <span className="gold-text-gradient">Medical Advice</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Expert medical insights, newborn care guidelines, vaccination schedules, and parenting tips written by Dr. Vijay Yadav and pediatric specialists.
          </p>
        </div>
      </section>

      {/* Main Blog Articles */}
      <section className="py-20 bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-navy-border hover:border-secondary transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-md">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-secondary" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-secondary" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
                      <User className="w-3.5 h-3.5 text-secondary" /> By {post.author}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-navy-border flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-1 text-xs font-bold text-primary dark:text-secondary hover:underline group-hover:gap-2 transition-all"
                  >
                    Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Full Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-navy w-full max-w-3xl rounded-3xl shadow-2xl border-2 border-secondary/40 relative overflow-hidden my-8 animate-fadeIn max-h-[85vh] flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-navy-border flex items-center justify-between bg-slate-50 dark:bg-navy-light shrink-0">
              <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold">
                {selectedPost.category}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {selectedPost.videoUrl ? (
                <div className="w-full rounded-2xl overflow-hidden shadow-md bg-black border border-secondary/30">
                  {selectedPost.videoUrl.includes("youtube.com") || selectedPost.videoUrl.includes("youtu.be") ? (
                    <iframe
                      src={
                        selectedPost.videoUrl.includes("watch?v=")
                          ? selectedPost.videoUrl.replace("watch?v=", "embed/")
                          : selectedPost.videoUrl
                      }
                      title={selectedPost.title}
                      className="w-full h-64 sm:h-96"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={selectedPost.videoUrl}
                      controls
                      autoPlay
                      className="w-full max-h-[450px] object-contain mx-auto"
                    />
                  )}
                </div>
              ) : (
                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={selectedPost.image || "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop"}
                    alt={selectedPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>Author: {selectedPost.author}</span>
                  <span>• {selectedPost.date}</span>
                  <span>• {selectedPost.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {selectedPost.title}
                </h2>
              </div>

              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
                <p>{selectedPost.content}</p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-navy-border flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-light text-xs font-semibold text-slate-600 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
