"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Doctor {
  id: string;
  name: string;
  role: string;
  department: string;
  qualifications: string[];
  experienceYears: number;
  image: string;
  bio: string;
  opdHours: string;
  availableDays: string;
  isDirector?: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  department: string;
  doctor: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  createdAt: string;
}

export interface ContactQuery {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: "Unread" | "Replied";
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  videoUrl?: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Building" | "NICU & PICU" | "ICU & OT" | "Diagnostics" | "Facilities" | "Doctors" | "Videos";
  type?: "image" | "video";
  image: string;
  videoUrl?: string;
  description: string;
}

interface HospitalContextType {
  doctors: Doctor[];
  appointments: Appointment[];
  queries: ContactQuery[];
  blogs: BlogPost[];
  gallery: GalleryItem[];
  addAppointment: (app: Omit<Appointment, "id" | "status" | "createdAt">) => Promise<Appointment>;
  updateAppointmentStatus: (id: string, status: "Pending" | "Confirmed" | "Cancelled") => void;
  addQuery: (q: Omit<ContactQuery, "id" | "status" | "createdAt">) => void;
  addDoctor: (doc: Omit<Doctor, "id">) => void;
  deleteDoctor: (id: string) => void;
  addBlogPost: (post: Omit<BlogPost, "id">) => void;
  deleteBlogPost: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  deleteGalleryItem: (id: string) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  isBookingModalOpen: boolean;
  openBookingModal: (prefillDept?: string, prefillDoc?: string) => void;
  closeBookingModal: () => void;
  modalPrefillDept: string;
  modalPrefillDoc: string;
}

const initialDoctors: Doctor[] = [
  {
    "id": "doc-1",
    "name": "Dr. Vijay Yadav",
    "role": "Director & Chief Pediatrician",
    "department": "Pediatrics & Neonatology",
    "qualifications": [
      "MBBS",
      "MD (Paediatrics)",
      "PGPN (Boston University)",
      "MECMS",
      "MIAP"
    ],
    "experienceYears": 12,
    "image": "/images/dr-vijay-yadav.png",
    "bio": "Dr. Vijay Yadav is a highly experienced Pediatrician committed to providing quality healthcare for newborns, infants, children, and families.",
    "opdHours": "12:00 PM - 06:00 PM",
    "availableDays": "Mon - Sat",
    "isDirector": true
  },
  {
    "id": "doc-2",
    "name": "Dr. Aziz Khan",
    "role": "Senior Pediatrician",
    "department": "Pediatrics & Neonatology",
    "qualifications": [
      "MBBS",
      "DCH",
      "DNB"
    ],
    "experienceYears": 10,
    "image": "/images/dr-aziz-khan.png",
    "bio": "Dr. Aziz Khan specializes in newborn and child healthcare, providing medical care and treatment for infants and children.",
    "opdHours": "09:00 AM - 12:00 PM",
    "availableDays": "Mon - Sun",
    "isDirector": false
  },
  {
    "id": "doc-3",
    "name": "Dr. Farhat Khan",
    "role": "General & Laparoscopic Surgeon",
    "department": "General Surgery",
    "qualifications": [
      "MBBS",
      "MS"
    ],
    "experienceYears": 25,
    "image": "/images/dr-farhat-khan.png",
    "bio": "Dr. Farhat Khan is an experienced General and Laparoscopic Surgeon with expertise in surgical treatments and patient care.",
    "opdHours": "11:00 AM - 04:00 PM",
    "availableDays": "Mon - Sun",
    "isDirector": false
  },
  {
    "id": "doc-4",
    "name": "Dr. Suhbi Khan",
    "role": "Gynecologist & Obstetrician",
    "department": "Obstetrics & Gynecology",
    "qualifications": [
      "MBBS",
      "Diploma in G.O."
    ],
    "experienceYears": 20,
    "image": "/images/dr-suhbi-khan.png",
    "bio": "Dr. Suhbi Khan specializes in women's healthcare, pregnancy care, and obstetrics and gynecology services.",
    "opdHours": "02:00 PM - 06:00 PM",
    "availableDays": "Mon - Sun",
    "isDirector": false
  },
  {
    "id": "doc-5",
    "name": "Dr. Rachna Mishra",
    "role": "Gynecologist & Infertility Specialist",
    "department": "Obstetrics, Gynecology & Infertility",
    "qualifications": [
      "MBBS",
      "MS",
      "MBA"
    ],
    "experienceYears": 35,
    "image": "/images/dr-rachna-mishra.png",
    "bio": "Dr. Rachna Mishra specializes in women's reproductive healthcare, obstetrics, gynecology, and infertility-related care.",
    "opdHours": "02:00 PM - 06:00 PM",
    "availableDays": "Mon - Sun",
    "isDirector": false
  },
  {
    "id": "doc-6",
    "name": "Dr. Nishant Kumar",
    "role": "Medicine Specialist",
    "department": "General Medicine",
    "qualifications": [
      "MBBS"
    ],
    "experienceYears": 2,
    "image": "/images/dr-nishant-kumar.png",
    "bio": "Dr. Nishant Kumar provides general medical consultation, diagnosis, and treatment for patients.",
    "opdHours": "09:00 AM - 09:00 PM",
    "availableDays": "Mon - Sun",
    "isDirector": false
  }
];

const initialBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "Essential Newborn Care Tips Every Parent Should Know",
    slug: "essential-newborn-care-tips",
    category: "Child Care",
    author: "Dr. Vijay Yadav",
    date: "July 24, 2026",
    readTime: "5 min read",
    excerpt: "Welcoming a baby brings endless joy and questions. Learn crucial guidance from Dr. Vijay Yadav on newborn care, thermal regulation, feeding, and hygiene.",
    content: "Bringing home a newborn child is one of life's most precious milestones, but it can also be intimidating. Temperature control is critical: infants under one month are sensitive to heat loss. Always keep your baby comfortably wrapped in soft cotton layers. Exclusive breastfeeding for the first six months provides essential antibodies for immunity against infections. Ensure cord care remains clean and dry. Watch for red flags like sluggish feeding, persistent fever above 100.4°F, or yellowing skin (jaundice) and consult Nova Medicare Hospital's 24x7 emergency pediatric hotline immediately.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop",
    tags: ["Newborn Care", "Pediatrician", "Parenting Tips", "Baby Health"],
  },
  {
    id: "blog-2",
    title: "Complete Childhood Vaccination Schedule Guide (2026)",
    slug: "childhood-vaccination-schedule-guide",
    category: "Vaccination",
    author: "Nova Medicare Pediatric Team",
    date: "July 18, 2026",
    readTime: "7 min read",
    excerpt: "Immunization is the safest way to protect your child against preventable diseases. Here is Nova Medicare Hospital's complete recommended vaccination timeline.",
    content: "Vaccines stimulate your baby's immune system without causing disease, building vital defenses against polio, tuberculosis, hepatitis B, rotavirus, measles, and pneumococcal infections. At birth, newborns receive BCG, OPV dose 0, and Hep-B1. At 6, 10, and 14 weeks, essential combination vaccines provide multi-spectrum protection. Don't skip annual flu shots or booster doses at 18 months and 5 years. Nova Medicare Hospital operates a dedicated painless vaccination clinic in Agra with strict cold-chain preservation.",
    image: "https://images.unsplash.com/photo-1632053009384-9dbb5b9e3b97?q=80&w=1000&auto=format&fit=crop",
    tags: ["Vaccination", "Immunization", "Child Health", "Pediatrics"],
  },
  {
    id: "blog-3",
    title: "Understanding NICU & PICU: When Does Your Child Need Critical Care?",
    slug: "understanding-nicu-picu-critical-care",
    category: "Emergency Care",
    author: "Dr. Vijay Yadav",
    date: "July 10, 2026",
    readTime: "6 min read",
    excerpt: "Demystifying Neonatal (NICU) and Pediatric Intensive Care Units (PICU). How advanced monitoring saves little lives.",
    content: "When a baby is born prematurely, with low birth weight, or experiences acute respiratory distress, the Neonatal Intensive Care Unit (NICU) provides specialized incubator environment, mechanical ventilation, radiant warmers, and 24x7 monitoring by trained neonatologists. PICU supports toddlers and older children facing severe asthma attacks, high-grade seizures, trauma, or post-surgical recovery. Nova Medicare Hospital features state-of-the-art Level-III NICU & PICU facilities in Agra staffed 24 hours a day.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop",
    tags: ["NICU", "PICU", "Critical Care", "Emergency"],
  },
  {
    id: "blog-4",
    title: "Nutrition & Growth Milestones: 6 Months to 5 Years",
    slug: "nutrition-and-growth-milestones-guide",
    category: "Nutrition",
    author: "Child Nutrition Department",
    date: "June 28, 2026",
    readTime: "4 min read",
    excerpt: "Transitioning from milk to solid weaning foods. Healthy recipes, micronutrient requirements, and weight milestone checks.",
    content: "At 6 months, complementary feeding should begin alongside breast milk. Introduce single-ingredient mashes like mashed banana, boiled ragi porridge, or apple puree. Avoid adding salt or sugar before age one. Ensure balanced iron, zinc, and vitamin D intake for healthy cognitive and skeletal development.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1000&auto=format&fit=crop",
    tags: ["Nutrition", "Weaning", "Child Development"],
  },
];

const initialGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Nova Medicare Hospital Facade",
    category: "Building",
    image: "/images/nova-hospital-building.jpg",
    description: "Modern architectural front with 24x7 Emergency access at Pratap Pura Chauraha, Agra.",
  },
  {
    id: "gal-2",
    title: "Director Dr. Vijay Yadav Profile",
    category: "Doctors",
    image: "/images/dr-vijay-yadav.png",
    description: "Dr. Vijay Yadav - Pediatrician & Neonatologist (MBBS, MD, PGPN Boston).",
  },
  {
    id: "gal-3",
    title: "Advanced Neonatal Intensive Care (NICU)",
    category: "NICU & PICU",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop",
    description: "Level-III Advanced NICU equipped with radiant warmers, phototherapy & ventilators.",
  },
  {
    id: "gal-4",
    title: "Pediatric Intensive Care Unit (PICU)",
    category: "NICU & PICU",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
    description: "Dedicated critical care setup for pediatric cardiac, respiratory & surgical emergencies.",
  },
  {
    id: "gal-5",
    title: "Ultra-Modern Modular Operation Theatre",
    category: "ICU & OT",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop",
    description: "Laminar airflow operation theatre for general, pediatric & laparoscopic procedures.",
  },
  {
    id: "gal-6",
    title: "24x7 Diagnostic & Imaging Laboratory",
    category: "Diagnostics",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop",
    description: "Fully automated diagnostic lab, digital X-Ray, ultrasound, and emergency pathology.",
  },
  {
    id: "gal-7",
    title: "Child Friendly Waiting Lounge",
    category: "Facilities",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop",
    description: "Hygienic, comfortable, and play-equipped waiting area for parents and young children.",
  },
  {
    id: "gal-8",
    title: "24x7 In-House Pharmacy",
    category: "Facilities",
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000&auto=format&fit=crop",
    description: "Round-the-clock stocked pharmacy with essential pediatric, emergency & surgical drugs.",
  },
];

const initialAppointments: Appointment[] = [
  {
    id: "app-101",
    patientName: "Aarav Sharma",
    age: "4",
    gender: "Male",
    phone: "9876543210",
    department: "Pediatrics",
    doctor: "Dr. Vijay Yadav",
    preferredDate: "2026-07-29",
    preferredTime: "10:30 AM",
    message: "Routine growth checkup and viral fever consultation.",
    status: "Confirmed",
    createdAt: "2026-07-27T10:00:00.000Z",
  },
  {
    id: "app-102",
    patientName: "Priyanka Verma",
    age: "28",
    gender: "Female",
    phone: "9812345678",
    department: "Obstetrics & Gynecology",
    doctor: "Dr. Ananya Sharma",
    preferredDate: "2026-07-30",
    preferredTime: "12:00 PM",
    message: "Third trimester routine ultrasound & consultation.",
    status: "Pending",
    createdAt: "2026-07-27T14:30:00.000Z",
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export function HospitalProvider({ children }: { children: React.ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [modalPrefillDept, setModalPrefillDept] = useState("");
  const [modalPrefillDoc, setModalPrefillDoc] = useState("");

  // Load from Backend API or LocalStorage fallback
  useEffect(() => {
    async function loadData() {
      try {
        const [docRes, blogRes, galRes, appRes, qRes] = await Promise.allSettled([
          fetch(`${API_URL}/api/doctors`),
          fetch(`${API_URL}/api/blogs`),
          fetch(`${API_URL}/api/gallery`),
          fetch(`${API_URL}/api/appointments`),
          fetch(`${API_URL}/api/queries`),
        ]);

        if (docRes.status === "fulfilled" && docRes.value.ok) {
          const data = await docRes.value.json();
          if (Array.isArray(data) && data.length > 0) setDoctors(data);
        }
        if (blogRes.status === "fulfilled" && blogRes.value.ok) {
          const data = await blogRes.value.json();
          if (Array.isArray(data) && data.length > 0) setBlogs(data);
        }
        if (galRes.status === "fulfilled" && galRes.value.ok) {
          const data = await galRes.value.json();
          if (Array.isArray(data) && data.length > 0) setGallery(data);
        }
        if (appRes.status === "fulfilled" && appRes.value.ok) {
          const data = await appRes.value.json();
          if (Array.isArray(data)) setAppointments(data);
        }
        if (qRes.status === "fulfilled" && qRes.value.ok) {
          const data = await qRes.value.json();
          if (Array.isArray(data)) setQueries(data);
        }
      } catch (err) {
        console.warn("Backend API offline, falling back to LocalStorage", err);
      }

      // Check admin auth
      try {
        const savedAdmin = localStorage.getItem("nova_admin_auth");
        if (savedAdmin === "true") setIsAdminLoggedIn(true);
      } catch (e) { }
    }

    loadData();
  }, []);

  const openBookingModal = (dept: string = "", doc: string = "") => {
    setModalPrefillDept(dept);
    setModalPrefillDoc(doc);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const addAppointment = async (appData: Omit<Appointment, "id" | "status" | "createdAt">): Promise<Appointment> => {
    const newApp: Appointment = {
      ...appData,
      id: "app-" + Date.now(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    const updated = [newApp, ...appointments];
    setAppointments(updated);
    localStorage.setItem("nova_appointments", JSON.stringify(updated));

    try {
      const res = await fetch(`${API_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appData),
      });
      if (res.ok) {
        const saved = await res.json();
        return saved;
      }
    } catch (e) {
      console.warn("Failed to save appointment to backend", e);
    }
    return newApp;
  };

  const updateAppointmentStatus = async (id: string, status: "Pending" | "Confirmed" | "Cancelled") => {
    const updated = appointments.map((app) => (app.id === id ? { ...app, status } : app));
    setAppointments(updated);
    localStorage.setItem("nova_appointments", JSON.stringify(updated));

    try {
      await fetch(`${API_URL}/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.warn("Failed to update status on backend", e);
    }
  };

  const addQuery = async (q: Omit<ContactQuery, "id" | "status" | "createdAt">) => {
    const newQ: ContactQuery = {
      ...q,
      id: "q-" + Date.now(),
      status: "Unread",
      createdAt: new Date().toISOString(),
    };
    const updated = [newQ, ...queries];
    setQueries(updated);
    localStorage.setItem("nova_queries", JSON.stringify(updated));

    try {
      await fetch(`${API_URL}/api/queries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(q),
      });
    } catch (e) {
      console.warn("Failed to send query to backend", e);
    }
  };

  const addDoctor = async (doc: Omit<Doctor, "id">) => {
    const newDoc: Doctor = { ...doc, id: "doc-" + Date.now() };
    const updated = [...doctors, newDoc];
    setDoctors(updated);
    localStorage.setItem("nova_doctors", JSON.stringify(updated));

    try {
      await fetch(`${API_URL}/api/doctors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
    } catch (e) {
      console.warn("Failed to add doctor to backend", e);
    }
  };

  const deleteDoctor = async (id: string) => {
    const updated = doctors.filter((d) => d.id !== id);
    setDoctors(updated);
    localStorage.setItem("nova_doctors", JSON.stringify(updated));

    try {
      await fetch(`${API_URL}/api/doctors/${id}`, { method: "DELETE" });
    } catch (e) {
      console.warn("Failed to delete doctor on backend", e);
    }
  };

  const addBlogPost = async (post: Omit<BlogPost, "id">) => {
    const newPost: BlogPost = { ...post, id: "blog-" + Date.now() };
    const updated = [newPost, ...blogs];
    setBlogs(updated);
    localStorage.setItem("nova_blogs", JSON.stringify(updated));

    try {
      await fetch(`${API_URL}/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
    } catch (e) {
      console.warn("Failed to add blog to backend", e);
    }
  };

  const deleteBlogPost = async (id: string) => {
    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    localStorage.setItem("nova_blogs", JSON.stringify(updated));

    try {
      await fetch(`${API_URL}/api/blogs/${id}`, { method: "DELETE" });
    } catch (e) {
      console.warn("Failed to delete blog on backend", e);
    }
  };

  const addGalleryItem = async (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = { ...item, id: "gal-" + Date.now() };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    localStorage.setItem("nova_gallery", JSON.stringify(updated));

    try {
      await fetch(`${API_URL}/api/gallery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    } catch (e) {
      console.warn("Failed to add gallery item to backend", e);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    localStorage.setItem("nova_gallery", JSON.stringify(updated));

    try {
      await fetch(`${API_URL}/api/gallery/${id}`, { method: "DELETE" });
    } catch (e) {
      console.warn("Failed to delete gallery item on backend", e);
    }
  };

  const loginAdmin = (pass: string) => {
    if (pass === "admin123" || pass === "nova2026" || pass === "eshu2003") {
      setIsAdminLoggedIn(true);
      localStorage.setItem("nova_admin_auth", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("nova_admin_auth");
  };

  return (
    <HospitalContext.Provider
      value={{
        doctors,
        appointments,
        queries,
        blogs,
        gallery,
        addAppointment,
        updateAppointmentStatus,
        addQuery,
        addDoctor,
        deleteDoctor,
        addBlogPost,
        deleteBlogPost,
        addGalleryItem,
        deleteGalleryItem,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        modalPrefillDept,
        modalPrefillDoc,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospital() {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error("useHospital must be used within a HospitalProvider");
  }
  return context;
}
