"use client";

import React, { useState } from "react";
import { useHospital } from "@/context/HospitalContext";
import {
  ShieldCheck,
  Lock,
  LogOut,
  Calendar,
  Users,
  Image as ImageIcon,
  BookOpen,
  MessageSquare,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Check,
  Settings,
  Upload,
  Video,
  Play,
  X,
  FileText,
} from "lucide-react";

export default function AdminPage() {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    appointments,
    updateAppointmentStatus,
    doctors,
    addDoctor,
    deleteDoctor,
    blogs,
    addBlogPost,
    deleteBlogPost,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    queries,
  } = useHospital();

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "doctors" | "blogs" | "gallery" | "queries">("overview");

  // Modal / Add Form states
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    role: "",
    department: "Pediatrics",
    qualifications: "MBBS, MD",
    experienceYears: 5,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
    bio: "",
    opdHours: "10:00 AM - 02:00 PM",
    availableDays: "Mon - Sat",
  });

  const [showBlogModal, setShowBlogModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    slug: "",
    category: "Child Care",
    author: "Dr. Vijay Yadav",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    readTime: "5 min read",
    excerpt: "",
    content: "",
    image: "",
    videoUrl: "",
    tags: "Pediatrics, Child Care",
  });

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [newGallery, setNewGallery] = useState<{
    title: string;
    category: "Building" | "NICU & PICU" | "ICU & OT" | "Diagnostics" | "Facilities" | "Doctors" | "Videos";
    type: "image" | "video";
    image: string;
    videoUrl: string;
    description: string;
  }>({
    title: "",
    category: "Building",
    type: "image",
    image: "",
    videoUrl: "",
    description: "",
  });

  const handleBlogImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlogVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog((prev) => ({ ...prev, videoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGallery((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGallery((prev) => ({ ...prev, videoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setLoginError("Invalid Admin Password");
    } else {
      setLoginError("");
    }
  };

  const handleCreateDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    addDoctor({
      ...newDoctor,
      qualifications: newDoctor.qualifications.split(",").map((q) => q.trim()),
    });
    setShowDoctorModal(false);
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    addBlogPost({
      ...newBlog,
      image: newBlog.image || "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop",
      slug: newBlog.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") || `post-${Date.now()}`,
      tags: newBlog.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    setNewBlog({
      title: "",
      slug: "",
      category: "Child Care",
      author: "Dr. Vijay Yadav",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: "5 min read",
      excerpt: "",
      content: "",
      image: "",
      videoUrl: "",
      tags: "Pediatrics, Child Care",
    });
    setShowBlogModal(false);
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryItem({
      title: newGallery.title,
      category: newGallery.category,
      type: newGallery.type,
      image: newGallery.image || (newGallery.type === "image" ? "/images/nova-hospital-building.jpg" : ""),
      videoUrl: newGallery.videoUrl,
      description: newGallery.description,
    });
    setNewGallery({
      title: "",
      category: "Building",
      type: "image",
      image: "",
      videoUrl: "",
      description: "",
    });
    setShowGalleryModal(false);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-100 dark:bg-navy p-4">
        <div className="glass-panel w-full max-w-md p-8 rounded-3xl border-2 border-secondary/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary dark:text-secondary flex items-center justify-center mx-auto border border-secondary/40">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Nova Medicare Admin Login
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Secure Management Portal for Hospital Operations
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-100 text-red-700 text-xs font-semibold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Enter Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3.5 rounded-xl shadow-red hover:shadow-gold transition-all text-sm border border-secondary/40"
            >
              Sign In to Admin Dashboard
            </button>
          </form>
          {/* <div className="text-center text-[11px] text-slate-400">
            Passcodes: <code className="text-secondary font-bold">eshu2003</code> or <code className="text-secondary font-bold">nova2026</code>
          </div> */}
        </div>
      </div>
    );
  }

  const pendingAppointmentsCount = appointments.filter((a) => a.status === "Pending").length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-navy py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Navbar */}
        <div className="glass-panel p-6 rounded-3xl border-2 border-secondary/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary text-secondary flex items-center justify-center border border-secondary/40">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                Nova Medicare Admin Control
              </h1>
              <p className="text-xs text-secondary font-semibold">Agra Super Speciality Portal • Live Sync</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600/20 text-red-600 dark:text-red-400 font-bold text-xs hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout Admin
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-navy-border">
          {[
            { id: "overview", label: "Dashboard Overview", icon: Settings },
            { id: "appointments", label: `Appointments (${appointments.length})`, icon: Calendar, badge: pendingAppointmentsCount },
            { id: "doctors", label: `Doctors (${doctors.length})`, icon: Users },
            { id: "blogs", label: `Blogs (${blogs.length})`, icon: BookOpen },
            { id: "gallery", label: `Gallery (${gallery.length})`, icon: ImageIcon },
            { id: "queries", label: `Queries (${queries.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shrink-0 transition-all ${isActive
                  ? "bg-primary text-white shadow-md border border-secondary/40"
                  : "bg-white dark:bg-navy-light text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  }`}
              >
                <Icon className="w-4 h-4 text-secondary" />
                {tab.label}
                {tab.badge ? (
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-navy text-[10px] font-black">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-navy-border shadow-sm space-y-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Appointments</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white gold-text-gradient">{appointments.length}</div>
                <p className="text-[11px] text-amber-500 font-bold">{pendingAppointmentsCount} pending action</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-navy-border shadow-sm space-y-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Active Doctors</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{doctors.length}</div>
                <p className="text-[11px] text-emerald-500 font-bold">Dr. Vijay Yadav (Director)</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-navy-border shadow-sm space-y-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Published Articles</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{blogs.length}</div>
                <p className="text-[11px] text-slate-500">Child Care & Vaccination</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-navy-border shadow-sm space-y-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Patient Queries</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{queries.length}</div>
                <p className="text-[11px] text-primary font-bold">24x7 Help Desk</p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-navy-border space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Admin Management Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowDoctorModal(true)}
                  className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-xs font-bold shadow-md hover:bg-primary-dark"
                >
                  <Plus className="w-4 h-4 text-secondary" /> Add New Doctor Profile
                </button>

                <button
                  onClick={() => setShowBlogModal(true)}
                  className="flex items-center gap-2 bg-secondary text-navy px-5 py-3 rounded-xl text-xs font-extrabold shadow-md hover:bg-secondary-hover"
                >
                  <Plus className="w-4 h-4 text-navy" /> Publish New Blog
                </button>

                <button
                  onClick={() => setShowGalleryModal(true)}
                  className="flex items-center gap-2 bg-navy-light text-white border border-secondary/40 px-5 py-3 rounded-xl text-xs font-bold hover:bg-navy-border"
                >
                  <Plus className="w-4 h-4 text-secondary" /> Upload Gallery Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Appointments */}
        {activeTab === "appointments" && (
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-navy-border space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Patient OPD Appointments</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-navy-border text-slate-500 dark:text-slate-400 uppercase text-[11px]">
                    <th className="py-3 px-2">ID</th>
                    <th className="py-3 px-2">Patient</th>
                    <th className="py-3 px-2">Phone</th>
                    <th className="py-3 px-2">Department</th>
                    <th className="py-3 px-2">Doctor</th>
                    <th className="py-3 px-2">Date & Time</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-navy-border">
                  {appointments.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-navy-light/50">
                      <td className="py-3 px-2 font-bold text-slate-400">{app.id}</td>
                      <td className="py-3 px-2 font-bold text-slate-900 dark:text-white">
                        {app.patientName} <span className="text-[11px] font-normal text-slate-400">({app.age}, {app.gender})</span>
                      </td>
                      <td className="py-3 px-2 font-semibold text-primary dark:text-secondary">{app.phone}</td>
                      <td className="py-3 px-2">{app.department}</td>
                      <td className="py-3 px-2 font-semibold">{app.doctor}</td>
                      <td className="py-3 px-2">{app.preferredDate} ({app.preferredTime})</td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${app.status === "Confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : app.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                            }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => updateAppointmentStatus(app.id, "Confirmed")}
                            className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                            title="Confirm"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(app.id, "Cancelled")}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-600 hover:bg-red-500 hover:text-white"
                            title="Cancel"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Doctors */}
        {activeTab === "doctors" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Hospital Doctors Roster</h3>
              <button
                onClick={() => setShowDoctorModal(true)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-xs font-bold"
              >
                <Plus className="w-4 h-4 text-secondary" /> Add Doctor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <div key={doc.id} className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-navy-border space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{doc.name}</h4>
                    {!doc.isDirector && (
                      <button
                        onClick={() => deleteDoctor(doc.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete Doctor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-primary dark:text-secondary font-semibold">{doc.role} • {doc.department}</p>
                  <p className="text-xs text-slate-500">{doc.qualifications.join(", ")}</p>
                  <div className="text-[11px] text-slate-400">OPD: {doc.opdHours} ({doc.availableDays})</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Blogs */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Published Articles</h3>
              <button
                onClick={() => setShowBlogModal(true)}
                className="flex items-center gap-2 bg-secondary text-navy px-4 py-2.5 rounded-xl text-xs font-bold"
              >
                <Plus className="w-4 h-4 text-navy" /> Add Article
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((b) => (
                <div key={b.id} className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-navy-border space-y-2 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-secondary">{b.category}</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{b.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{b.excerpt}</p>
                  </div>
                  <button
                    onClick={() => deleteBlogPost(b.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Gallery */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Gallery Items (Photos & Videos)</h3>
              <button
                onClick={() => setShowGalleryModal(true)}
                className="flex items-center gap-2 bg-navy-light text-white border border-secondary/40 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-navy-border transition-colors shadow-md"
              >
                <Plus className="w-4 h-4 text-secondary" /> Upload Image / Video
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {gallery.map((g) => {
                const isVideo = g.type === "video" || !!g.videoUrl;
                return (
                  <div key={g.id} className="relative h-44 rounded-2xl overflow-hidden group border border-slate-200 dark:border-navy-border shadow-md">
                    {isVideo && !g.image ? (
                      <video src={g.videoUrl} className="w-full h-full object-cover" />
                    ) : (
                      <img src={g.image || "/images/nova-hospital-building.jpg"} alt={g.title} className="w-full h-full object-cover" />
                    )}
                    {isVideo && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-secondary text-navy text-[10px] font-extrabold flex items-center gap-1 shadow">
                        <Video className="w-3 h-3" /> VIDEO
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 text-white text-xs flex flex-col justify-between">
                      <div>
                        <div className="font-bold line-clamp-1">{g.title}</div>
                        <div className="text-[10px] text-secondary font-semibold">{g.category}</div>
                      </div>
                      <button
                        onClick={() => deleteGalleryItem(g.id)}
                        className="text-red-400 hover:text-red-600 self-end p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 6: Queries */}
        {activeTab === "queries" && (
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-navy-border space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Contact Page Messages</h3>
            <div className="space-y-3">
              {queries.length > 0 ? (
                queries.map((q) => (
                  <div key={q.id} className="p-4 rounded-xl bg-white dark:bg-navy-light border border-slate-200 dark:border-navy-border space-y-1 text-xs sm:text-sm">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 dark:text-white">{q.name} ({q.phone})</span>
                      <span className="text-slate-400 text-[11px]">{new Date(q.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="text-secondary font-semibold">{q.subject}</div>
                    <p className="text-slate-600 dark:text-slate-300">{q.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No contact queries yet.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Doctor Modal */}
      {showDoctorModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy p-6 rounded-3xl max-w-lg w-full space-y-4 border border-secondary/40">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New Doctor</h3>
            <form onSubmit={handleCreateDoctor} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Doctor Name (e.g. Dr. Rajesh Kumar)"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
              />
              <input
                type="text"
                required
                placeholder="Role / Designation"
                value={newDoctor.role}
                onChange={(e) => setNewDoctor({ ...newDoctor, role: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
              />
              <input
                type="text"
                required
                placeholder="Department"
                value={newDoctor.department}
                onChange={(e) => setNewDoctor({ ...newDoctor, department: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Qualifications (comma separated)"
                value={newDoctor.qualifications}
                onChange={(e) => setNewDoctor({ ...newDoctor, qualifications: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
              />
              <textarea
                placeholder="Doctor Bio / Summary"
                value={newDoctor.bio}
                onChange={(e) => setNewDoctor({ ...newDoctor, bio: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDoctorModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-white font-bold">
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Publish Blog Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-navy p-6 rounded-3xl max-w-2xl w-full space-y-4 border border-secondary/40 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-navy-border pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary" /> Publish New Blog Article
              </h3>
              <button onClick={() => setShowBlogModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Essential Child Care & Newborn Tips"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
                  >
                    <option value="Child Care">Child Care</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="Emergency Care">Emergency Care</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="General Pediatrics">General Pediatrics</option>
                    <option value="Maternity">Maternity</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Author Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Vijay Yadav"
                    value={newBlog.author}
                    onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Upload Image Section */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-light border border-slate-200 dark:border-navy-border space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-secondary" /> Cover Image (Upload Image File or Enter Image URL)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-2 hover:bg-primary-dark shrink-0">
                    <Upload className="w-3.5 h-3.5" /> Upload Image File
                    <input type="file" accept="image/*" onChange={handleBlogImageFileUpload} className="hidden" />
                  </label>
                  <span className="text-slate-400 font-semibold text-[10px]">OR</span>
                  <input
                    type="text"
                    placeholder="Paste Image URL (https://...)"
                    value={newBlog.image}
                    onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-navy-border bg-white dark:bg-navy text-slate-900 dark:text-white text-xs"
                  />
                </div>
                {newBlog.image && (
                  <div className="relative h-28 w-full rounded-xl overflow-hidden border border-secondary/30 mt-2">
                    <img src={newBlog.image} alt="Blog preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Upload Video Section */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-light border border-slate-200 dark:border-navy-border space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-secondary" /> Attach Video (Upload Video File or YouTube/MP4 URL)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-secondary text-navy text-xs font-bold flex items-center gap-2 hover:bg-secondary-hover shrink-0">
                    <Upload className="w-3.5 h-3.5" /> Upload Video File
                    <input type="file" accept="video/*" onChange={handleBlogVideoFileUpload} className="hidden" />
                  </label>
                  <span className="text-slate-400 font-semibold text-[10px]">OR</span>
                  <input
                    type="text"
                    placeholder="Paste Video URL (YouTube, MP4, WebM)"
                    value={newBlog.videoUrl}
                    onChange={(e) => setNewBlog({ ...newBlog, videoUrl: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-navy-border bg-white dark:bg-navy text-slate-900 dark:text-white text-xs"
                  />
                </div>
                {newBlog.videoUrl && (
                  <div className="p-2 rounded-xl bg-black text-white text-[11px] flex items-center gap-2">
                    <Video className="w-4 h-4 text-secondary shrink-0" />
                    <span className="truncate">Video attached: {newBlog.videoUrl.substring(0, 60)}...</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Short Excerpt / Summary</label>
                <input
                  type="text"
                  placeholder="Brief summary of the article..."
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Full Content *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Write the full blog post text..."
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="Pediatrics, Vaccination, Newborn"
                  value={newBlog.tags}
                  onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-navy-border">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-white font-extrabold shadow-md hover:bg-primary-dark">
                  Publish Blog Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Gallery Photo / Video Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-navy p-6 rounded-3xl max-w-xl w-full space-y-4 border border-secondary/40 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-navy-border pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-secondary" /> Add to Gallery (Image or Video)
              </h3>
              <button onClick={() => setShowGalleryModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGallery} className="space-y-4 text-xs">
              {/* Media Type Selector */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Select Media Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewGallery({ ...newGallery, type: "image" })}
                    className={`py-2 px-3 rounded-xl font-bold border flex items-center justify-center gap-2 transition-all ${
                      newGallery.type === "image"
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-slate-100 dark:bg-navy-light text-slate-700 dark:text-slate-300 border-slate-300 dark:border-navy-border"
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" /> Image Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewGallery({ ...newGallery, type: "video", category: "Videos" })}
                    className={`py-2 px-3 rounded-xl font-bold border flex items-center justify-center gap-2 transition-all ${
                      newGallery.type === "video"
                        ? "bg-secondary text-navy border-secondary shadow-md"
                        : "bg-slate-100 dark:bg-navy-light text-slate-700 dark:text-slate-300 border-slate-300 dark:border-navy-border"
                    }`}
                  >
                    <Video className="w-4 h-4" /> Video Clip
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Title / Caption *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NICU Critical Care Ward or Hospital Tour Video"
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={newGallery.category}
                  onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
                >
                  <option value="Building">Building</option>
                  <option value="NICU & PICU">NICU & PICU</option>
                  <option value="ICU & OT">ICU & OT</option>
                  <option value="Diagnostics">Diagnostics</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Doctors">Doctors</option>
                  <option value="Videos">Videos</option>
                </select>
              </div>

              {/* Upload Image Section */}
              {newGallery.type === "image" && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-light border border-slate-200 dark:border-navy-border space-y-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-secondary" /> Upload Image File or Enter URL *
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-2 hover:bg-primary-dark shrink-0">
                      <Upload className="w-3.5 h-3.5" /> Choose Image File
                      <input type="file" accept="image/*" onChange={handleGalleryImageFileUpload} className="hidden" />
                    </label>
                    <span className="text-slate-400 font-semibold text-[10px]">OR</span>
                    <input
                      type="text"
                      placeholder="Paste Image URL (https://...)"
                      value={newGallery.image}
                      onChange={(e) => setNewGallery({ ...newGallery, image: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-300 dark:border-navy-border bg-white dark:bg-navy text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                  {newGallery.image && (
                    <div className="relative h-32 w-full rounded-xl overflow-hidden border border-secondary/30 mt-2">
                      <img src={newGallery.image} alt="Gallery Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}

              {/* Upload Video Section */}
              {newGallery.type === "video" && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-light border border-slate-200 dark:border-navy-border space-y-3">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-secondary" /> Upload Video File or Enter Video URL *
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <label className="cursor-pointer px-4 py-2 rounded-xl bg-secondary text-navy text-xs font-bold flex items-center gap-2 hover:bg-secondary-hover shrink-0">
                        <Upload className="w-3.5 h-3.5" /> Choose Video File
                        <input type="file" accept="video/*" onChange={handleGalleryVideoFileUpload} className="hidden" />
                      </label>
                      <span className="text-slate-400 font-semibold text-[10px]">OR</span>
                      <input
                        type="text"
                        placeholder="Paste Video URL (YouTube, MP4, WebM)"
                        value={newGallery.videoUrl}
                        onChange={(e) => setNewGallery({ ...newGallery, videoUrl: e.target.value })}
                        className="w-full p-2 rounded-xl border border-slate-300 dark:border-navy-border bg-white dark:bg-navy text-slate-900 dark:text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-200 dark:border-navy-border pt-2">
                    <label className="font-bold text-slate-700 dark:text-slate-300">
                      Thumbnail Cover Image (Optional file or URL)
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-200 text-slate-800 text-[11px] font-bold shrink-0">
                        Select Thumbnail File
                        <input type="file" accept="image/*" onChange={handleGalleryImageFileUpload} className="hidden" />
                      </label>
                      <input
                        type="text"
                        placeholder="Thumbnail Image URL (optional)"
                        value={newGallery.image}
                        onChange={(e) => setNewGallery({ ...newGallery, image: e.target.value })}
                        className="w-full p-1.5 rounded-xl border border-slate-300 dark:border-navy-border bg-white dark:bg-navy text-xs"
                      />
                    </div>
                  </div>

                  {newGallery.videoUrl && (
                    <div className="p-2 rounded-xl bg-black text-white text-[11px] flex items-center gap-2">
                      <Play className="w-4 h-4 text-secondary shrink-0" />
                      <span className="truncate">Video Ready: {newGallery.videoUrl.substring(0, 60)}...</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  rows={3}
                  placeholder="Details about this facility photo or video clip..."
                  value={newGallery.description}
                  onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-navy-border bg-slate-50 dark:bg-navy-light text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-navy-border">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-white font-extrabold shadow-md hover:bg-primary-dark">
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
