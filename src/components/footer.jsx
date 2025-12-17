import React, { useState, useEffect } from "react";
import ContactForm from "../components/contact_form";
import { useInView } from "react-intersection-observer";
import TelegramQR from "../images/Telegram.png";
import footer from "../images/footer.png";
import { motion } from "framer-motion";

const Footer = () => {
  const [currentLanguage, setCurrentLanguage] = useState("km");

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem("preferredLanguage");
      if (savedLanguage && savedLanguage !== currentLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    };

    const interval = setInterval(handleLanguageChange, 1000);
    return () => clearInterval(interval);
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
    
    <footer className="relative text-white overflow-hidden">
      {/* Background image - Hidden on mobile, shown on md and up */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: `url(${footer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100%",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-transparent" />
      </div>

      {/* Mobile background color - Shown on mobile only */}
      <div className="absolute inset-0 z-0 bg-gray-700 md:bg-transparent" />

      {/* Content section */}
      <div className="relative z-10 mt-1 2xl:mt-70 lg:mt-40 md:mt-50">
        <section id="contact" className="py-8 md:py-4 lg:py-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-10 ">
            {/* Desktop: 4 columns, Mobile: 1 column with 2 sub-columns for some rows */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
              {/* Column 1: Contact Info */}
              <div className="md:col-span-1">
                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
                  {currentLanguage === "en" ? "Get In Touch" : "ទាក់ទងពួកយើង"}
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  {/* Emergency */}
                  <div>
                    <div className="flex items-start mb-1">
                      <div className="bg-blue-600 p-1.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
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
                        <p className="font-semibold text-sm md:text-base">
                          {currentLanguage === "en" ? "Emergency" : "សង្គ្រោះបន្ទាន់"}
                        </p>
                        <p className="text-gray-300 md:text-gray-300 text-sm md:text-base mt-1">
                          (+855) 23 217 384
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <div className="flex items-start mb-1">
                      <div className="bg-blue-600 p-1.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
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
                        <p className="font-semibold text-sm md:text-base">
                          {currentLanguage === "en" ? "Address" : "អាសយដ្ឋាន"}
                        </p>
                        <p className="text-gray-300 md:text-gray-300 text-xs md:text-sm mt-1">
                          {currentLanguage === "en"
                            ? "Street 271, Phnom Penh, Cambodia."
                            : "មហាវិថីយោធពលខេមរៈភូមិន្ទ (ផ្លូវលេខ២៧១) សង្កាត់ទំនប់ទឹក ខណ្ឌបឹងកេងកង រាជធានីភ្នំពេញ"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Social Media */}
              <div className="md:col-span-1">
                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
                  {currentLanguage === "en" ? "Social Media" : "បណ្តាញសង្គម"}
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  {/* Facebook */}
                  <div>
                    <div className="flex items-start mb-1">
                      <div className="bg-blue-600 p-1.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm md:text-base">
                          {currentLanguage === "en" ? "Facebook" : "ហ្វេសប៊ុក"}
                        </p>
                        <a
                          href="https://facebook.com/KSFHOfficial"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 md:text-gray-300 hover:text-white transition-colors text-xs md:text-sm mt-1 block break-words"
                        >
                          facebook.com/KSFHOfficial
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="flex items-start mb-1">
                      <div className="bg-blue-600 p-1.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
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
                        <p className="font-semibold text-sm md:text-base">
                          {currentLanguage === "en" ? "Email" : "អ៊ីមែល"}
                        </p>
                        <p className="text-gray-300 md:text-gray-300 text-sm md:text-base mt-1">
                          info@ksfh.gov
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Quick Links - On mobile, this will show in 2 columns layout */}
              <div className="md:col-span-1">
                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
                  {currentLanguage === "en" ? "Quick Links" : "តំណភ្ជាប់រហ័ស"}
                </h2>
                
                {/* Mobile: 2-column layout within this column */}
                <div className="grid grid-cols-2 md:block gap-4 md:gap-0">
                  {/* Left side: Telegram Info */}
                  <div className="md:mb-4">
                    <div className="flex items-start">
                      <div className="bg-blue-600 p-1.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.87 8.799c-.129.59-.463.733-.936.455l-2.597-1.917-1.254 1.207c-.139.139-.256.256-.525.256l.188-2.677 4.815-4.351c.21-.188-.045-.294-.326-.104l-5.953 3.75-2.57-.801c-.561-.174-.571-.561.118-.831l9.955-3.837c.467-.174.875.129.729.831z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm md:text-base">
                          {currentLanguage === "en" ? "Telegram" : "តេឡេក្រាម"}
                        </p>
                        <p className="text-gray-300 md:text-gray-300 text-sm md:text-base mt-1">
                          @KSFH_Official
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side: QR Code */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="w-40 h-40 md:w-32 md:h-32 lg:w-32 lg:h-32 bg-white p-2 rounded-lg shadow-lg">
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
                    <p className="text-xs md:text-sm text-gray-300 md:text-gray-300 mt-2 text-center md:text-left">
                      {currentLanguage === "en" ? "Scan for Telegram" : "ស្កេនសម្រាប់តេឡេក្រាម"}
                    </p>
                  </div>
                </div>
              </div>

             {/* Column 4: Contact Form */}
<div className="md:col-span-1">
  <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-6 text-center md:text-left">
    {currentLanguage === "en" ? "Message Us" : "ផ្ញើរសារ"}
  </h2>
  <div className="transform scale-[0.85] md:scale-100 origin-center md:origin-left">
    <ContactForm currentLanguage={currentLanguage} />
  </div>
</div>
            </div>
          </div>
        </section>

        {/* Bottom Footer */}
        <div className="relative z-10 bg-gray-800 bg-opacity-90 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div>
                <p className="text-gray-400 text-sm md:text-base text-center md:text-left">
                  © {new Date().getFullYear()} Khmer Soviet Friendship Hospital.{" "}
                  {currentLanguage === "en"
                    ? "All rights reserved."
                    : "រក្សាសិទ្ធិគ្រប់យ៉ាង។"}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
                >
                  {currentLanguage === "en"
                    ? "Privacy Policy"
                    : "គោលការណ៍ភាពឯកជន"}
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
                >
                  {currentLanguage === "en"
                    ? "Terms of Service"
                    : "លក្ខខណ្ឌសេវា"}
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
                >
                  {currentLanguage === "en"
                    ? "Accessibility"
                    : "ភាពងាយស្រួលចូលប្រើ"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;