import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { motion } from "framer-motion";

// The API endpoint for fetching pulmonology services
const API_URL = "API/departments/pulmonology/pulmonology_service.php";

// ==========================================
// 1. UTILITIES - IMPROVED FONT STACK
// ==========================================

const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    // Default fallback image
    return "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath.substring(1);
  return `API/departments/pulmonology/${imagePath}`;
};

// Use a more modern and readable font stack for English (font-sans)
const getFontClass = (language) => {
  return language === "km"
    ? "font-battambang khmer-font" // Custom Khmer font (from original code)
    : "font-sans english-font"; // Modern English font stack
};

// ==========================================
// 2. LOADING SKELETON COMPONENT
// ==========================================

const LoadingSkeleton = ({ currentLanguage }) => {
  const fontClass = getFontClass(currentLanguage);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-48 mx-auto mb-6 animate-pulse"></div>
          <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-3/4 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3 mx-auto animate-pulse"></div>
        </div>

        {/* Services Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl animate-pulse mb-6"></div>
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-5/6 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. SERVICE COMPONENT
// ==========================================
const ServiceItem = ({ service, onClick, currentLanguage, index }) => {
  const fontClass = getFontClass(currentLanguage);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const isSelected =
    sessionStorage.getItem("pulmonology_service_last_selected") === String(index);
  const sectionNumber = Math.min(index + 1, 10);
  const sectionRoute = `/pulmonology_section${sectionNumber}`;

  // Title, SubTitle, Paragraph variables
  const title =
    service[currentLanguage === "en" ? "title_en" : "title"] || service.title;
  const subTitle =
    service[currentLanguage === "en" ? "subTitle_en" : "subTitle"] ||
    service.subTitle;
  const paragraph =
    service[currentLanguage === "en" ? "paragraph_en" : "paragraph"] ||
    service.paragraph;
  const paragraph1 =
    service[currentLanguage === "en" ? "paragraph1_en" : "paragraph1"] ||
    service.paragraph1;
  const paragraph2 =
    service[currentLanguage === "en" ? "paragraph2_en" : "paragraph2"] ||
    service.paragraph2;
  const paragraph3 =
    service[currentLanguage === "en" ? "paragraph3_en" : "paragraph3"] ||
    service.paragraph3;
  const paragraph4 =
    service[currentLanguage === "en" ? "paragraph4_en" : "paragraph4"] ||
    service.paragraph4;
  const paragraph5 =
    service[currentLanguage === "en" ? "paragraph5_en" : "paragraph5"] ||
    service.paragraph5;
  const paragraph6 =
    service[currentLanguage === "en" ? "paragraph6_en" : "paragraph6"] ||
    service.paragraph6;
  const imageUrl = getImageUrl(service.image_path);
  const URL = service.youtube_url;

  const content = {
    en: {
      viewDetails: "Learn More",
      duration: "Duration",
      specialists: "Specialists",
    },
    km: {
      viewDetails: "ស្វែងយល់បន្ថែម",
      duration: "រយៈពេល",
      specialists: "អ្នកជំនាញ",
    },
  };

  const langContent = content[currentLanguage] || content.en;

  // Alternating layout logic
  const isEven = index % 2 === 0;

  // Compile all available descriptions into a list, filtering out null/empty strings
  const detailedDescriptions = [
    paragraph,
    paragraph1,
    paragraph2,
    paragraph3,
    paragraph4,
    paragraph5,
    paragraph6,
  ].filter((desc) => desc && desc.trim().length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id={`pulmonology-service-item-${index}`}
      tabIndex={0}
      className={`relative group mb-32 last:mb-0 focus:outline-none rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200/30 ${
        isSelected ? "bg-blue-50/40 shadow-2xl shadow-blue-200/30" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        // KEY CHANGE: Use grid-cols-2 on lg screens for equal width columns
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
          isEven ? "" : "lg:grid-flow-dense"
        }`}
      >
        {/* Image Column - Now spans 1 column (equal to text) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className={`relative overflow-hidden rounded-3xl shadow-2xl transition-shadow duration-500 ${
            isHovered ? "shadow-blue-300/50" : ""
          } aspect-video lg:aspect-auto lg:h-[300px] ${
            // KEY CHANGE: Always col-span-1 for equal width
            isEven ? "" : "lg:col-start-2"
          }`}
        >
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={imageUrl}
              alt={title}
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.7 }}
              className={`w-full h-full object-cover ${
                isHovered ? "scale-[1.05]" : "scale-100"
              }`}
              loading="lazy"
            />

            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.7 }}
              className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent ${
                isHovered ? "opacity-100" : "opacity-80"
              }`}
            />

            <motion.div
              initial={{ scale: 1, rotate: 0 }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 3 : 0,
              }}
              transition={{ duration: 0.7, type: "spring" }}
              className={`absolute top-6 ${
                isEven ? "right-6" : "left-6"
              } w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center ${
                isHovered
                  ? "scale-110 rotate-3 shadow-2xl shadow-blue-400/50"
                  : "shadow-lg"
              }`}
            >
              <motion.svg
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                className="w-7 h-7 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Content Column - Also spans 1 column (equal to image) */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={`${isEven ? "" : "lg:col-start-1 lg:row-start-1"} ${
            // Optional: Add some top padding on mobile for better spacing
            isEven ? "lg:pl-0" : "lg:pr-0"
          }`}
        >
          {/* Category Tag */}
          {service.category && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block mb-4"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full uppercase tracking-wider ${fontClass}`}
              >
                {service.category}
              </motion.span>
            </motion.div>
          )}

          {/* Title with Circle Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="flex-shrink-0">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  isHovered
                    ? "bg-gradient-to-br from-blue-600 to-blue-800 scale-110"
                    : "bg-gradient-to-br from-gray-800 to-gray-900"
                }`}
              >
                {String(index + 1).padStart(2)}
              </motion.div>
            </div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className={`text-xl md:text-2xl lg:text-2xl font-extrabold text-gray-900 leading-tight ${fontClass}`}
            >
              <motion.span
                initial={{ backgroundPosition: "100% 50%" }}
                animate={{ backgroundPosition: isHovered ? "0% 50%" : "100% 50%" }}
                transition={{ duration: 0.5 }}
                className={`bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent bg-[length:200%_100%] bg-left ${
                  isHovered ? "from-blue-600 to-blue-500" : ""
                }`}
              >
                {title || service.title_en}
              </motion.span>
            </motion.h3>
          </motion.div>

          {/* Subtitle/Short Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-6"
          >
            <motion.p
              whileHover={{ x: 5 }}
              className={`text-gray-700 leading-relaxed text-lg font-semibold ${fontClass} transition-colors duration-300`}
            >
              {subTitle || service.subTitle_en}
            </motion.p>
          </motion.div>

          {/* Detailed Descriptions LIST */}
          {detailedDescriptions.length > 0 && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="space-y-3 mb-8 pl-5 list-none"
            >
              {detailedDescriptions.map((desc, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                  className="flex items-start text-gray-600 text-md"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.9 + i * 0.1 + 0.1 }}
                    className="w-2 h-2 mr-3 mt-2 bg-blue-500 rounded-full flex-shrink-0"
                  ></motion.span>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.9 + i * 0.1 + 0.2 }}
                    className={`leading-relaxed ${fontClass}`}
                  >
                    {desc}
                  </motion.p>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {/* View Full Details Button - Only show if service has valid data, image, AND is_active is true */}
          {(title || paragraph || detailedDescriptions.length > 0) &&
            service.image_path &&
            service.image_path !== "null" &&
            service.image_path !== "undefined" &&
            // ADDED THIS CHECK:
            (service.is_active === true ||
              service.is_active === "1" ||
              service.is_active === 1) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    sessionStorage.setItem(
                      "pulmonology_service_last_selected",
                      String(index)
                    );
                    navigate(sectionRoute);
                  }}
                  className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg cursor-pointer ${fontClass}`}
                >
                  {currentLanguage === "en"
                    ? "View Full Details →"
                    : "មើលព័ត៌មានលម្អិត →"}
                </motion.button>
              </motion.div>
            )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const PulmologyService = ({ currentLanguage }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Content for different languages
  const content = {
    en: {
      title: "pulmonology services",
      subtitle: "Comprehensive respiratory care with advanced diagnostics and treatments",
      tagline: "Expert Respiratory Care",
      stats: {
        procedures: "Procedures",
        successRate: "Success Rate",
        specialists: "Specialists",
        technology: "Technology",
      },
      cta: {
        title: "Your Lungs Deserves The Best",
        description: "Schedule a consultation with our expert pulmonology team",
        paragraph: "Schedule a consultation with our expert pulmonology team",
        button: "Book Appointment",
      },
      error: {
        title: "Unable to load services",
        message: "Please check your connection and try again",
        retry: "Retry",
      },
    },
    km: {
      title: "សេវាកម្មបេះដូង",
      subtitle: "ការថែទាំបេះដូងទូលំទូលាយជាមួយការធ្វើរោគវិនិច្ឆ័យ និងការព្យាបាលឆ្នើម",
      tagline: "ការថែទាំបេះដូងដោយអ្នកជំនាញ",
      stats: {
        procedures: "និន្នាការ",
        successRate: "អត្រាជោគជ័យ",
        specialists: "អ្នកជំនាញ",
        technology: "បច្ចេកវិទ្យា",
      },
      cta: {
        title: "បេះដូងរបស់អ្នកសមនឹងទទួលបានល្អបំផុត",
        description: "កក់ណាត់ពិគ្រោះជាមួយក្រុមអ្នកជំនា្យបេះដូងរបស់យើង",
        paragraph: "កក់ណាត់ពិគ្រោះជាមួយក្រុមអ្នកជំនាញបេះដូងរបស់យើង",
        button: "កក់ណាត់",
      },
      error: {
        title: "មិនអាចទាញយកសេវាកម្មបាន",
        message: "សូមពិនិត្យការតភ្ជាប់របស់អ្នក ហើយព្យាយាមម្តងទៀត",
        retry: "ព្យាយាមម្តងទៀត",
      },
    },
  };

  const langContent = content[currentLanguage] || content.en;
  const fontClass = getFontClass(currentLanguage);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const servicesData = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];
        setServices(servicesData);
        setError(null);
      } catch (err) {
        console.error("Error fetching pulmonology services:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (!services || services.length === 0) return;

    const raw = sessionStorage.getItem("pulmonology_service_last_selected");
    if (raw == null) return;
    const idx = Number(raw);
    if (!Number.isFinite(idx) || idx < 0 || idx >= services.length) return;

    const el = document.getElementById(`pulmonology-service-item-${idx}`);
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      setTimeout(() => {
        el.focus({ preventScroll: true });
      }, 250);
    });
  }, [services]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  if (loading) {
    return <LoadingSkeleton currentLanguage={currentLanguage} />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto mb-8">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full animate-pulse"></div>
              <div className="absolute inset-6 bg-white rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${fontClass}`}>
            {langContent.error.title}
          </h3>
          <p className={`text-gray-600 mb-8 ${fontClass}`}>
            {langContent.error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${fontClass}`}
          >
            {langContent.error.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen -mt-10">
      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-16 md:py-28">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 md:mb-20 max-w-6xl">
            <div className="inline-block mb-3">
              {/* Tagline/Category */}
              <p
                className={`text-sm font-semibold uppercase tracking-widest text-blue-600 ${fontClass}`}
              >
                {currentLanguage === "en" ? "Our Expertise" : "ជំនាញរបស់យើង"}
              </p>
            </div>
            <h2
              className={`text-xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight ${fontClass} `}
            >
              {currentLanguage === "en"
                ? "Specialized Services"
                : "សេវ៉ាកម្មឯកទេស"}
            </h2>

            
            {/* Descriptions 1, 2, 3 */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-2 w-2 h-2 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                  
                </div>
                <p className={`text-gray-700 text-lg leading-relaxed ${fontClass}`}>
                  {currentLanguage === "en" 
                    ? "We provide various respiratory diseases and thoracic surgery services for people many years ago: We have our pneumologists and surgeons with experiences, graduate from different countries."
                    : "យើងខ្ញុំផ្តល់សេវាវះកាត់ជំងឺផ្លូវដង្ហើម និងទ្រូងជាច្រើនប្រភេទសម្រាប់មនុស្សកាលពីច្រើនឆ្នាំមុន៖ យើងខ្ញុំមានគ្រូពេទ្យឯកទេសជំងឺសួត និងគ្រូពេទ្យវះកាត់ដែលមានបទពិសោធន៍ និងបានបញ្ចប់ការសិក្សាពីប្រទេសផ្សេងៗគ្នា។"}
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-2 w-2 h-2 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                  
                </div>
                <p className={`text-gray-700 text-lg leading-relaxed ${fontClass}`}>
                  {currentLanguage === "en"
                    ? "24/7 services provided include emergency cases, all kind of lung trauma, respiratory consultation and treatment."
                    : "សេវាកម្មដែលផ្តល់ជូន 24/7 រួមមានករណីសង្គ្រោះបន្ទាន់ របួសសួតគ្រប់ប្រភេទ ការពិគ្រោះយោបល់ និងការព្យាបាលផ្លូវដង្ហើម។"}
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-2 w-2 h-2 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                  
                </div>
                <p className={`text-gray-700 text-lg leading-relaxed ${fontClass}`}>
                  {currentLanguage === "en"
                    ? "To maintain and continue to improve the quality of care, various collaborations and cooperation have been actively promoted, especially with team from France, Germany, Singapore, Canada, Korea through more than 3 missions a year for experience sharing​ and exchange."
                    : "ដើម្បីរក្សា និងបន្តកែលម្អគុណភាពនៃការថែទាំ កិច្ចសហការ និងកិច្ចសហប្រតិបត្តិការផ្សេងៗត្រូវបានលើកកម្ពស់យ៉ាងសកម្ម ជាពិសេសជាមួយក្រុមការងារមកពីប្រទេសបារាំង អាល្លឺម៉ង់ សិង្ហបុរី កាណាដា កូរ៉េ តាមរយៈបេសកកម្មជាង ៣ ក្នុងមួយឆ្នាំ សម្រាប់ការចែករំលែក និងផ្លាស់ប្តូរបទពិសោធន៍។"}
                </p>
              </div>
            </div>
            {/* Accent line - Now left-aligned */}
            <div className="h-1 w-50 bg-gradient-to-r from-blue-500 to-blue-700 mt-6 rounded-full">
             
            </div>
          </div>
        </div>
        {/* Services List */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <ServiceItem
              key={service.id || index}
              service={service}
              onClick={handleServiceClick}
              currentLanguage={currentLanguage}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PulmologyService;
