// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/contact_form";
import { useInView } from "react-intersection-observer";
import { useLanguage } from '../contexts/LanguageContext'; // Import the hook
import TelegramQR from "../images/Telegram.png";

const ContactUs = () => {
  const navigate = useNavigate();
  
  // Use language context instead of local state
  const { currentLanguage, isKhmer, isEnglish } = useLanguage();

  // Apply font based on language
  useEffect(() => {
    if (currentLanguage === "km") {
      // Apply Khmer font to body
      document.body.style.fontFamily = "'Battambang', 'Khmer OS', system-ui, sans-serif";
      document.body.style.unicodeBidi = 'plaintext';
    } else {
      // Reset to default font for English
      document.body.style.fontFamily = '';
      document.body.style.unicodeBidi = '';
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.fontFamily = '';
      document.body.style.unicodeBidi = '';
    };
  }, [currentLanguage]);
  useEffect(() => {
    // Scroll to anchor if exists in URL
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

  const AnimatedSection = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

   return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};


  return (
    <div className="pt-16">
    
      <AnimatedSection id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {currentLanguage === "en" ? "Get In Touch" : "ទាក់ទងពួកយើង"}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {currentLanguage === "en"
                  ? "We're here to help you with all your healthcare needs. Contact us for appointments, inquiries, or emergency services."
                  : "ពួកយើងនៅទីនេះដើម្បីជួយអ្នកក្នុងការថែទាំសុខភាពរបស់អ្នក។ សូមទាក់ទងមកពួកយើងសម្រាប់ការណាត់ជួប ការសួរដំណឹង ឬសេវាកម្មភ្លាមៗ។"}
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
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
                  <div>
                    <p className="font-semibold">
                      {currentLanguage === "en" ? "Address" : "អាសយដ្ឋាន"}
                    </p>
                    <p className="text-gray-300">
                      {currentLanguage === "en"
                        ? "Street 271, Phnom Penh, Cambodia."
                        : "មហាវិថីយោធពលខេមរៈភូមិន្ទ (ផ្លូវលេខ២៧១) សង្កាត់ទំនប់ទឹក ខណ្ឌបឹងកេងកង រាជធានីភ្នំពេញ"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {currentLanguage === "en"
                        ? "Emergency"
                        : "សង្គ្រោះបន្ទាន់"}
                    </p>
                    <p className="text-gray-300">(+855) 23 217 384</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {currentLanguage === "en" ? "Email" : "អ៊ីមែល"}
                    </p>
                    <p className="text-gray-300">info@ksfh.gov</p>
                  </div>
                </div>
                {/* Facebook Contact */}
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {currentLanguage === "en" ? "Facebook" : "ហ្វេសប៊ុក"}
                    </p>
                    <a
                      href="https://facebook.com/KSFHOfficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      facebook.com/KSFHOfficial
                    </a>
                  </div>
                </div>
                {/* Telegram Contact */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-3 rounded-full flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.87 8.799c-.129.59-.463.733-.936.455l-2.597-1.917-1.254 1.207c-.139.139-.256.256-.525.256l.188-2.677 4.815-4.351c.21-.188-.045-.294-.326-.104l-5.953 3.75-2.57-.801c-.561-.174-.571-.561.118-.831l9.955-3.837c.467-.174.875.129.729.831z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {currentLanguage === "en" ? "Telegram" : "តេឡេក្រាម"}
                    </p>
                    <p className="text-gray-300 mb-2">@KSFH_Official</p>
                    <div className="flex items-center space-x-4">
                      <div className="w-40 h-45 bg-white p-2 rounded-lg shadow-lg backdrop-blur-xl">
                        <img
                          src={TelegramQR}
                          alt={
                            currentLanguage === "en"
                              ? "Telegram QR Code"
                              : "កូដ QR ទូរលេគ្គំ"
                          }
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-gray-300 flex-1">
                        {currentLanguage === "en"
                          ? "Scan to join our Telegram channel for updates and announcements"
                          : "ស្កេនដើម្បីចូលរួមឆានែលតេឡេក្រាមរបស់យើងសម្រាប់ព័ត៌មាននិងប្រកាសផ្សេងៗ"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm currentLanguage={currentLanguage} />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ContactUs;
