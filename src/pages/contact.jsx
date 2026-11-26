import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ContactForm from "../components/contact_form";
import { useLanguage } from "../contexts/LanguageContext";
import TelegramQR from "../images/Telegram.png";

const AnimatedSection = ({ children, id, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const ContactUs = () => {
  const { currentLanguage } = useLanguage();
  const isEn = currentLanguage === "en";

  useEffect(() => {
    if (currentLanguage === "km") {
      document.body.style.fontFamily = "'Battambang', 'Khmer OS', system-ui, sans-serif";
      document.body.style.unicodeBidi = "plaintext";
    } else {
      document.body.style.fontFamily = "";
      document.body.style.unicodeBidi = "";
    }

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.unicodeBidi = "";
    };
  }, [currentLanguage]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
   <div className="pt-8 sm:pt-8 overflow-x-hidden bg-gradient-to-br from-sky-200 via-white to-blue-50/80">
  <AnimatedSection
    id="contact"
    className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 sm:py-20 lg:py-24 2xl:py-32 bg-gradient-to-br from-sky-90 via-white to-blue-20/90 text-slate-900 overflow-hidden"
  >
        {/* Subtle Clinical Dot Grid Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-45"
style={{
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230284c7' fill-opacity='0.08'%3E%3Cpath d='M17 11h2v6h6v2h-6v6h-2v-6h-6v-2h6z'/%3E%3C/g%3E%3C/svg%3E")`,
  backgroundSize: "36px 36px",
}}
        
        />

        {/* Soft Healthcare Ambient Shapes (scaled for 2K) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-72 -right-24 w-96 h-96 sm:w-96 sm:h-96 2xl:w-[34rem] 2xl:h-[34rem] bg-sky-200/50 rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 w-72 h-72 sm:w-96 sm:h-96 2xl:w-[34rem] 2xl:h-[34rem] bg-teal-200/45 rounded-full blur-3xl"
        />

        {/* Container scales from mobile -> 1280px -> 2K (2560px) */}
        <div className="relative z-10 w-full max-w-7xl h-full 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16">
          {/* Section Header */}
          <div className="max-w-2xl 2xl:max-w-3xl mb-10 sm:mb-12 lg:mb-14 2xl:mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-full text-xs 2xl:text-sm font-semibold bg-sky-100/90 text-sky-800 border border-sky-200 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {isEn ? "24/7 Patient Support & Inquiries" : "ជំនួយអ្នកជំងឺ និងការសាកសួរ ២៤/៧"}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold tracking-tight text-slate-900 mb-3 sm:mb-4">
              {isEn ? "Get In Touch" : "ទាក់ទងពួកយើង"}
            </h2>

            <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-slate-600 leading-relaxed">
              {isEn
                ? "We're here to help you with all your healthcare needs. Contact us for appointments, inquiries, or emergency services."
                : "ពួកយើងនៅទីនេះដើម្បីជួយអ្នកក្នុងការថែទាំសុខភាពរបស់អ្នក។ សូមទាក់ទងមកពួកយើងសម្រាប់ការណាត់ជួប ការសួរដំណឹង ឬសេវាកម្មភ្លាមៗ។"}
            </p>
          </div>

          {/* Main Responsive 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 2xl:gap-16 items-start">
            {/* Left Column: Contact Info & Channels */}
            <div className="lg:col-span-7 space-y-4 2xl:space-y-5">
              {/* Address & Emergency Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-5">
                {/* Address Card */}
                <div className="group p-4 sm:p-5 2xl:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex items-start gap-3.5 2xl:gap-4">
                  <div className="w-11 h-11 2xl:w-13 2xl:h-13 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs 2xl:text-sm uppercase tracking-wider font-semibold text-slate-500 mb-1">
                      {isEn ? "Address" : "អាសយដ្ឋាន"}
                    </p>
                    <p className="text-sm 2xl:text-base text-slate-700 leading-relaxed">
                      {isEn
                        ? "Street 271, Phnom Penh, Cambodia."
                        : "មហាវិថីយោធពលខេមរៈភូមិន្ទ (ផ្លូវលេខ២៧១) សង្កាត់ទំនប់ទឹក ខណ្ឌបឹងកេងកង រាជធានីភ្នំពេញ"}
                    </p>
                  </div>
                </div>

                {/* Emergency Card */}
                <div className="group p-4 sm:p-5 2xl:p-6 rounded-2xl bg-rose-50/80 backdrop-blur-sm hover:bg-rose-50 border border-rose-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex items-start gap-3.5 2xl:gap-4">
                  <div className="w-11 h-11 2xl:w-13 2xl:h-13 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs 2xl:text-sm uppercase tracking-wider font-semibold text-rose-600 mb-1">
                      {isEn ? "Emergency" : "សង្គ្រោះបន្ទាន់"}
                    </p>
                    <a
                      href="tel:+85523217384"
                      className="text-base 2xl:text-lg font-bold text-slate-900 hover:text-rose-700 transition-colors"
                    >
                      (+855) 23 217 384
                    </a>
                  </div>
                </div>
              </div>

              {/* Email & Facebook Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-5">
                {/* Email Card */}
                <div className="group p-4 sm:p-5 2xl:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-3.5 2xl:gap-4">
                  <div className="w-11 h-11 2xl:w-13 2xl:h-13 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs 2xl:text-sm uppercase tracking-wider font-semibold text-slate-500 mb-0.5">
                      {isEn ? "Email" : "អ៊ីមែល"}
                    </p>
                    <a
                      href="mailto:info@ksfh.gov"
                      className="text-sm 2xl:text-base font-medium text-slate-800 hover:text-sky-600 transition-colors truncate block"
                    >
                      info@ksfh.gov
                    </a>
                  </div>
                </div>

                {/* Facebook Card */}
                <div className="group p-4 sm:p-5 2xl:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-3.5 2xl:gap-4">
                  <div className="w-11 h-11 2xl:w-13 2xl:h-13 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs 2xl:text-sm uppercase tracking-wider font-semibold text-slate-500 mb-0.5">
                      {isEn ? "Facebook" : "ហ្វេសប៊ុក"}
                    </p>
                    <a
                      href="https://facebook.com/KSFHOfficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm 2xl:text-base font-medium text-slate-800 hover:text-blue-600 transition-colors truncate block"
                    >
                      facebook.com/KSFHOfficial
                    </a>
                  </div>
                </div>
              </div>
{/* Telegram & QR Code Card */}
<div className="group relative p-4 sm:p-5 md:p-6 2xl:p-7 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 hover:border-sky-300/90 shadow-xs hover:shadow-md transition-all duration-200">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 2xl:gap-8">
    {/* Left: Channel Details */}
    <div className="flex items-start gap-3.5 sm:gap-4 2xl:gap-5 flex-1 min-w-0">
      <div className="w-11 h-11 sm:w-12 sm:h-12 2xl:w-14 2xl:h-14 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 transition-colors duration-200">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.87 8.799c-.129.59-.463.733-.936.455l-2.597-1.917-1.254 1.207c-.139.139-.256.256-.525.256l.188-2.677 4.815-4.351c.21-.188-.045-.294-.326-.104l-5.953 3.75-2.57-.801c-.561-.174-.571-.561.118-.831l9.955-3.837c.467-.174.875.129.729.831z" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <h4 className="font-bold text-sm sm:text-base md:text-lg 2xl:text-xl text-slate-900 tracking-tight">
            {isEn ? "Telegram" : "តេឡេក្រាម"}
          </h4>

          <span className="text-[11px] 2xl:text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            {isEn ? "Official" : "ផ្លូវការ"}
          </span>

          <a
            href="https://t.me/KSFH_Official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs 2xl:text-sm font-medium px-2.5 py-0.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/80 transition-colors"
          >
            <span>@KSFH_Official</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        <p className="text-xs sm:text-sm 2xl:text-base text-slate-600 leading-relaxed">
          {isEn
            ? "Scan the QR code or open our Telegram channel for official hospital updates, clinic schedules, and public announcements."
            : "ស្កេនកូដ QR ឬបើកឆានែលតេឡេក្រាមរបស់យើង ដើម្បីទទួលបានព័ត៌មានថ្មីៗ កាលវិភាគពិនិត្យជំងឺ និងសេចក្តីជូនដំណឹងផ្លូវការ។"}
        </p>
      </div>
    </div>

    {/* Right: Larger High-Contrast QR Scan Box */}
    <div className="flex flex-col items-center justify-center p-3 sm:p-3.5 2xl:p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 flex-shrink-0 self-center sm:self-auto">
      <div className="w-48 h-48 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-44 lg:h-44 2xl:w-56 2xl:h-56 p-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center">
        <img
          src={TelegramQR}
          alt={isEn ? "Telegram QR Code" : "កូដ QR តេឡេក្រាម"}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="mt-2 text-xs 2xl:text-sm font-semibold tracking-wide text-slate-600">
        {isEn ? "Scan to Join" : "ស្កេនដើម្បីចូលរួម"}
      </span>
    </div>
  </div>
</div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-5 w-full">
              <ContactForm currentLanguage={currentLanguage} />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ContactUs;