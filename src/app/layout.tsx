import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { HospitalProvider } from "@/context/HospitalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppointmentModal from "@/components/AppointmentModal";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata: Metadata = {
  title: "Nova Medicare Hospital | Multi Super Speciality Hospital in Agra",
  description:
    "Nova Medicare Hospital is Agra's premier Multi Super Speciality Children & Family Hospital located at Pratap Pura Chauraha. Featuring Level-III NICU, PICU, Adult ICU, Trauma Center, and 24x7 Emergency Care under Director Dr. Vijay Yadav (MD Paediatrics). Contact: 8955992944.",
  keywords: [
    "Nova Medicare Hospital",
    "Nova Hospital Agra",
    "Dr Vijay Yadav Pediatrician Agra",
    "Best Children Hospital Agra",
    "NICU Hospital Agra",
    "PICU Hospital Agra",
    "Pratap Pura Chauraha Hospital",
    "24x7 Emergency Hospital Agra",
    "Multi Super Speciality Hospital Agra",
  ],
  authors: [{ name: "Nova Medicare Hospital" }],
  openGraph: {
    title: "Nova Medicare Hospital | Multi Super Speciality Healthcare",
    description:
      "Caring for Every Child, Every Family. Advanced Medical Care, Level-III NICU, PICU, ICU, and 24x7 Emergency Services in Agra.",
    url: "https://novamedicarehospital.com",
    siteName: "Nova Medicare Hospital",
    images: [
      {
        url: "/images/nova-hospital-building.jpg",
        width: 1200,
        height: 630,
        alt: "Nova Medicare Hospital Facade Agra",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white dark:bg-navy text-slate-900 dark:text-slate-100 antialiased selection:bg-secondary selection:text-navy">
        <ThemeProvider>
          <HospitalProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <AppointmentModal />
            <FloatingCTA />
          </HospitalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
