// src/pages/Home.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from "framer-motion";
import HeroSlideshow from "../components/hero";
import { useNavigate } from "react-router-dom";
import ActivityRCP from "../components/activity";
import Announcement from "../components/announcement";
import { useInView } from "react-intersection-observer";
import ksfhImage from '../images/KSFH.jpg';
import Footer from '../components/footer';
import ScrollToTopButton from "../contexts/scrollTop.jsx";
import HospitalSponsors from '../components/sponser/sponcer.jsx';

const Home = () => {
  // Use a ref to track initial mount to prevent unnecessary updates
  const isInitialMount = useRef(true);
  const languageChangeTimeout = useRef(null);
  
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'km';
  });
  
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Optimized language initialization - runs only once
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== currentLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []); // Empty dependency array - runs only once

  // Memoized language change handler to prevent recreating function
  const handleLanguageChange = useCallback((event) => {
    const newLanguage = event?.detail?.language;
    if (newLanguage && newLanguage !== currentLanguage) {
      // Debounce language changes to prevent rapid updates
      if (languageChangeTimeout.current) {
        clearTimeout(languageChangeTimeout.current);
      }
      languageChangeTimeout.current = setTimeout(() => {
        setCurrentLanguage(newLanguage);
      }, 100);
    }
  }, [currentLanguage]);

  // Set up language change listener with cleanup
  useEffect(() => {
    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      if (languageChangeTimeout.current) {
        clearTimeout(languageChangeTimeout.current);
      }
    };
  }, [handleLanguageChange]);

  // Optimized font update with proper cleanup and memoization
  const updateDocumentFont = useCallback(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Batch DOM updates for better performance
    if (currentLanguage === 'km') {
      html.classList.add('font-khmer');
      html.classList.remove('font-english');
      body.classList.add('font-khmer');
      body.classList.remove('font-english');
      
      html.style.setProperty('--font-family', "'Battambang', 'Khmer OS', 'sans-serif'");
      html.style.setProperty('--font-weight', 'normal');
      html.style.setProperty('--letter-spacing', 'normal');
    } else {
      html.classList.add('font-english');
      html.classList.remove('font-khmer');
      body.classList.add('font-english');
      body.classList.remove('font-khmer');
      
      html.style.setProperty('--font-family', 'system-ui, -apple-system, sans-serif');
      html.style.setProperty('--font-weight', 'normal');
      html.style.setProperty('--letter-spacing', 'normal');
    }
  }, [currentLanguage]);

  // Font update effect with debouncing
  useEffect(() => {
    // Skip on initial mount if language hasn't changed
    if (isInitialMount.current) {
      isInitialMount.current = false;
      updateDocumentFont();
      return;
    }

    // Debounce font updates
    const timeoutId = setTimeout(() => {
      updateDocumentFont();
      localStorage.setItem('preferredLanguage', currentLanguage);
      
      // Only dispatch event if language actually changed
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: currentLanguage } 
      }));
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup function - remove font styles on unmount
      const html = document.documentElement;
      html.style.removeProperty('--font-family');
      html.style.removeProperty('--font-weight');
      html.style.removeProperty('--letter-spacing');
    };
  }, [currentLanguage, updateDocumentFont]);

  // Optimized scroll handler with throttling
  const toggleVisibility = useCallback(() => {
    const scrollY = window.pageYOffset;
    setIsVisible(prev => {
      const newState = scrollY > 300;
      return prev !== newState ? newState : prev;
    });
  }, []);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [toggleVisibility]);

  // Optimized hash scroll with cleanup
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    let timeoutId = null;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        retryCount = 0; // Reset retry count on success
      } else if (retryCount < maxRetries) {
        retryCount++;
        timeoutId = setTimeout(scrollToHash, 300);
      }
    };

    // Small delay to ensure DOM is ready
    timeoutId = setTimeout(scrollToHash, 100);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Memoized section component to prevent unnecessary re-renders
  const AnimatedSection = useCallback(({ children, className = "" }) => {
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
  }, []);

  // Memoized helper functions
  const getServiceIcon = useCallback((serviceName) => {
    const iconMap = {
      "MRI Scan": "🔍",
      "ថ្នាំងរូបភាពដោយម៉ាញេទិក": "🔍",
      "X-Ray": "📷",
      "អេក្រុង": "📷",
      "CT Scan": "🖥️",
      "ជកតាស្គេន": "🖥️",
      "Laboratory Tests": "🧪",
      "ការធ្វើតេស្តមន្ទីរពិសោធន៍": "🧪",
      "Ultrasound": "👶",
      "អ៊ុលត្រាសោន": "👶",
      "ECG & ECHO": "💓",
      "អេសអេសជី និង អេកូ": "💓",
      "Endoscopy": "🔬",
      "អង់ដោសកូប": "🔬",
      "Blood Bank": "🩸",
      "ធនាគារឈាម": "🩸",
      "Emergency Services": "🚨",
      "សេវាកម្មភ្លាមៗ": "🚨",
      "Ambulance": "🚑",
      "ឡានពេទ្យ": "🚑",
    };

    return iconMap[serviceName] || "🏥";
  }, []);

  const getServiceDescription = useCallback((serviceName, language) => {
    const descriptionMap = {
      "MRI Scan": "Advanced magnetic resonance imaging for detailed diagnosis",
      "ថ្នាំងរូបភាពដោយម៉ាញេទិក": "ការថ្នាំងរូបភាពដោយម៉ាញេទិកទំនើបសម្រាប់ការវិនិច្ឆ័យលម្អិត",
      "X-Ray": "Digital X-ray services for bone and internal imaging",
      "អេក្រុង": "សេវាកម្មអេក្រុងឌីជីថលសម្រាប់ថ្នាំងឆ្អឹង និងរូបភាពខាងក្នុង",
      "CT Scan": "Computed tomography for cross-sectional body imaging",
      "ជកតាស្គេន": "ការថ្នាំងរូបភាពឆ្លុះរាងកាយដោយកុំព្យូទ័រ",
      "Laboratory Tests": "Comprehensive blood tests and laboratory analysis",
      "ការធ្វើតេស្តមន្ទីរពិសោធន៍": "ការធ្វើតេស្តឈាម និងការវិភាគមន្ទីរពិសោធន៍ពេញលេញ",
      "Ultrasound": "Ultrasound imaging for pregnancy and abdominal examination",
      "អ៊ុលត្រាសោន": "ការថ្នាំងរូបភាពអ៊ុលត្រាសោនសម្រាប់ការមើលគភ៌ និងការពិនិត្យពោះ",
      "ECG & ECHO": "Heart monitoring and echocardiography services",
      "អេសអេសជី និង អេកូ": "សេវាកម្មតាមដានបេះដូង និងអេកូកាត់ឌីហ្គារំ",
      "Endoscopy": "Minimally invasive internal examination procedure",
      "អង់ដោសកូប": "និតិវិធីពិនិត្យខាងក្នុងដោយមិនចាំបាច់កាត់",
      "Blood Bank": "Safe blood storage and transfusion services",
      "ធនាគារឈាម": "សេវាកម្មផ្ទុកឈាមដែលសុវត្ថិភាព និងការផ្លាស់ប្តូរឈាម",
      "Emergency Services": "24/7 emergency medical care and treatment",
      "សេវាកម្មភ្លាមៗ": "ការថែទាំ និងព្យាបាលវេជ្ជសាស្ត្របន្ទាន់ ២៤/៧",
      "Ambulance": "Emergency ambulance services with medical staff",
      "ឡានពេទ្យ": "សេវាកម្មឡានពេទ្យបន្ទាន់ជាមួយបុគ្គលិកវេជ្ជសាស្ត្រ",
    };

    return descriptionMap[serviceName] || (language === "en" 
      ? "Professional medical service with expert care" 
      : "សេវាកម្មវេជ្ជសាស្ត្រវិជ្ជាជីវៈជាមួយការថែទាំដោយអ្នកជំនាញ");
  }, []);

  const getDepartmentIcon = useCallback((departmentName) => {
    const iconMap = {
      "Cardiology": "💓",
      "ជំងឺបេះដូង": "💓",
      "Gastroenterology": "🩺",
      "ជំងឺក្រពះ": "🩺",
      "Oncology": "🎗️",
      "ជំងឺមហារីក": "🎗️",
      "Pulmonology": "🫁",
      "ជំងឺសួត": "🫁",
      "Dermatology": "🤚",
      "ជំងឺស្បែក": "🤚",
      "Ophthalmology": "👁️",
      "ជំងឺភ្នែក": "👁️",
      "Surgery": "🔪",
      "ការវះកាត់": "🔪",
      "Orthopedics": "🦴",
      "ឆ្អឹងជំនី": "🦴",
      "Neurology": "🧠",
      "ប្រសាទ": "🧠",
      "Neurosurgery": "⚡",
      "វះកាត់ខួរក្បាល": "⚡",
      "Pediatrics": "👶",
      "ជំងឺកុមារ": "👶",
      "OB-GYN": "👩",
      "ស្ត្រីធំ": "👩",
      "Urology": "🚽",
      "ផ្លូវនោម": "🚽",
      "Nephrology": "🥩",
      "តម្រងនោម": "🥩",
      "Emergency": "🚨",
      "ភ្លាមៗ": "🚨",
      "ICU": "🏥",
      "ថែទាំធ្ងន់": "🏥",
      "Anesthesia": "💤",
      "ដេកលក់": "💤",
      "ENT": "👂",
      "ត្រចៀកក": "👂",
      "Psychiatry": "🧠",
      "ចិត្តវិទ្យា": "🧠",
      "Dentistry": "🦷",
      "ធ្មេញ": "🦷",
      "Physiotherapy": "💪",
      "រោគព្យាបាល": "💪",
    };

    return iconMap[departmentName] || "🏥";
  }, []);

  // Memoized data objects
  const medicalServices = {
    en: [
      { name: "MRI Scan", href: "#mri" },
      { name: "X-Ray", href: "#xray" },
      { name: "CT Scan", href: "#ctscan" },
      { name: "Laboratory Tests", href: "#lab" },
      { name: "Ultrasound", href: "#ultrasound" },
      { name: "ECG & ECHO", href: "#ecg" },
      { name: "Endoscopy", href: "#endoscopy" },
      { name: "Blood Bank", href: "#bloodbank" },
      { name: "Emergency Services", href: "#emergency" },
      { name: "Ambulance", href: "#ambulance" },
    ],
    km: [
      { name: "ថ្នាំងរូបភាពដោយម៉ាញេទិក", href: "#mri" },
      { name: "អេក្រុង", href: "#xray" },
      { name: "ជកតាស្គេន", href: "#ctscan" },
      { name: "ការធ្វើតេស្តមន្ទីរពិសោធន៍", href: "#lab" },
      { name: "អ៊ុលត្រាសោន", href: "#ultrasound" },
      { name: "អេសអេសជី និង អេកូ", href: "#ecg" },
      { name: "អង់ដោសកូប", href: "#endoscopy" },
      { name: "ធនាគារឈាម", href: "#bloodbank" },
      { name: "សេវាកម្មភ្លាមៗ", href: "#emergency" },
      { name: "ឡានពេទ្យ", href: "#ambulance" },
    ],
  };

  const medicalDepartments = {
    en: [
      { name: "Cardiology", href: "#cardiology", description: "Heart Care" },
      { name: "Gastroenterology", href: "#gastro", description: "Digestive" },
      { name: "Oncology", href: "/oncology", description: "Cancer" },
      { name: "Pulmonology", href: "#pulmonology", description: "Lungs" },
      { name: "Dermatology", href: "#dermatology", description: "Skin" },
      { name: "Ophthalmology", href: "/optamo", description: "Eyes" },
      { name: "Surgery", href: "#surgery", description: "General" },
      { name: "Orthopedics", href: "#orthopedics", description: "Bones" },
      { name: "Neurology", href: "#neurology", description: "Brain" },
      { name: "Neurosurgery", href: "#neurosurgery", description: "Brain Surg" },
      { name: "Pediatrics", href: "#pediatrics", description: "Children" },
      { name: "OB-GYN", href: "#obgyn", description: "Women's" },
      { name: "Urology", href: "#urology", description: "Urinary" },
      { name: "Nephrology", href: "#nephrology", description: "Kidney" },
      { name: "Emergency", href: "#emergency-med", description: "24/7 Care" },
      { name: "ICU", href: "#icu", description: "Critical" },
      { name: "Anesthesia", href: "#anesthesia", description: "Pain" },
      { name: "ENT", href: "#ent", description: "Ear Nose" },
      { name: "Psychiatry", href: "#psychiatry", description: "Mental" },
      { name: "Dentistry", href: "#dentistry", description: "Teeth" },
      { name: "Physiotherapy", href: "#physio", description: "Rehab" },
      { name: "Hematology", href: "#hematology", description: "Blood" },
    ],
    km: [
      { name: "ជំងឺបេះដូង", href: "#cardiology", description: "បេះដូង" },
      { name: "ជំងឺក្រពះ", href: "#gastro", description: "ក្រពះ" },
      { name: "ជំងឺមហារីក", href: "/oncology", description: "មហារីក" },
      { name: "ជំងឺសួត", href: "#pulmonology", description: "សួត" },
      { name: "ជំងឺស្បែក", href: "#dermatology", description: "ស្បែក" },
      { name: "ជំងឺភ្នែក", href: "/optamo", description: "ភ្នែក" },
      { name: "ការវះកាត់", href: "#surgery", description: "ទូទៅ" },
      { name: "ឆ្អឹងជំនី", href: "#orthopedics", description: "ឆ្អឹង" },
      { name: "ប្រសាទ", href: "#neurology", description: "ខួរក្បាល" },
      { name: "វះកាត់ខួរក្បាល", href: "#neurosurgery", description: "ខួរក្បាល" },
      { name: "ជំងឺកុមារ", href: "#pediatrics", description: "កុមារ" },
      { name: "ស្ត្រីធំ", href: "#obgyn", description: "ស្ត្រី" },
      { name: "ផ្លូវនោម", href: "#urology", description: "នោម" },
      { name: "តម្រងនោម", href: "#nephrology", description: "តម្រង" },
      { name: "ភ្លាមៗ", href: "#emergency-med", description: "២៤/៧" },
      { name: "ថែទាំធ្ងន់", href: "#icu", description: "ធ្ងន់" },
      { name: "ដេកលក់", href: "#anesthesia", description: "ឈឺ" },
      { name: "ត្រចៀកក", href: "#ent", description: "ត្រចៀក" },
      { name: "ចិត្តវិទ្យា", href: "#psychiatry", description: "ចិត្ត" },
      { name: "ធ្មេញ", href: "#dentistry", description: "ធ្មេញ" },
      { name: "រោគព្យាបាល", href: "#physio", description: "ស្តារ" },
      { name: "ជំងឺឈាម", href: "#hematology", description: "ឈាម" },
    ],
  };

  // Memoized handlers
  const handleViewAllDepartments = useCallback(() => {
    navigate("/departments");
  }, [navigate]);

  const handleDepartmentClick = useCallback((department) => {
    if (department.href.startsWith('/')) {
      navigate(department.href);
    } else {
      const element = document.querySelector(department.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [navigate]);

  // Toggle show all services
  const toggleShowAll = useCallback(() => {
    setShowAll(prev => !prev);
  }, []);

  return (
    <>
      <div className="pt-16">
        <AnimatedSection>
          <HeroSlideshow currentLanguage={currentLanguage} />
        </AnimatedSection>

        {/* Hero Section */}
        <AnimatedSection
          id=""
          className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-teal-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-60"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 2xl:py-32 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-28 items-stretch min-h-[70vh]">
              <div className="flex flex-col justify-center space-y-10 md:space-y-12 h-full">
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-blue-700 px-5 py-3 rounded-2xl text-sm font-medium border border-blue-100 shadow-sm w-fit mx-auto lg:mx-0">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="font-semibold">
                    {currentLanguage === "en"
                      ? "Trusted Healthcare Since 1992"
                      : "សេវាកម្មសុខភាពដែលទុកចិត្តចាប់ពីឆ្នាំ ១៩៩២"}
                  </span>
                </div>

                <div className="space-y-6 text-center lg:text-left">
                  <h1 className="text-2xl xs:text-6xl sm:text-6xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                    <span className="block">
                      {currentLanguage === "en"
                        ? "Khmer-Soviet Friendship Hospital"
                        : "មន្ទីរពេទ្យមិត្តភាពខ្មែរសូវៀត"}
                    </span>
                  </h1>
                </div>

                <div className="max-w-2xl mx-auto lg:mx-0">
                  <p className="text-sm sm:text-xl text-gray-600 leading-relaxed tracking-wide">
                    {currentLanguage === "en"
                      ? "Khmer Soviet Friendship Hospital is a premier tertiary hospital dedicated to exceptional patient care, medical education, and innovative research. We offer comprehensive specialized services across all major medical disciplines."
                      : "មន្ទីរពេទ្យមិត្តភាពខ្មែរសូវៀត គឺជាមន្ទីរពេទ្យកម្រិតឧត្តមសិក្សាដែលផ្តោតលើការថែទាំអ្នកជំងឺដ៏ល្អឥតខ្ចោះ ការអប់រំវេជ្ជសាស្ត្រ និងការស្រាវជ្រាវថ្មី។ យើងផ្តល់សេវាកម្មឯកទេសពេញលេញនៅគ្រប់ផ្នែកវេជ្ជសាស្ត្រសំខាន់ៗ។"}
                  </p>
                </div>

                <div className="space-y-6 md:space-y-8 pt-4">
                  <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-100 transition-colors duration-300 flex-shrink-0">
                        <svg
                          className="w-8 h-8 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-2xl mb-3">
                          {currentLanguage === "en" ? "Mission" : "បេសកកម្ម"}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {currentLanguage === "en"
                            ? "To provide exceptional healthcare through advanced medical services, education, and research while maintaining the highest standards of compassion and excellence."
                            : "ផ្តល់នូវការថែទាំសុខភាពដ៏ល្អឥតខ្ចោះតាមរយៈសេវាកម្មវេជ្ជសាស្ត្រទំនើប ការអប់រំ និងការស្រាវជ្រាវ ខណៈដែលរក្សាស្តង់ដារខ្ពស់បំផុតនៃការអាណិតស្រឡាញ់ និងឧត្តមភាព។"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="bg-green-50 p-4 rounded-2xl group-hover:bg-green-100 transition-colors duration-300 flex-shrink-0">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-2xl mb-3">
                          {currentLanguage === "en" ? "Vision" : "ទស្សនវិស័យ"}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {currentLanguage === "en"
                            ? "To be Cambodia's leading medical institution, setting new standards in healthcare excellence and becoming a regional center for medical innovation and education."
                            : "ក្លាយជាស្ថាប័នវេជ្ជសាស្ត្រឈានមុខគេនៅកម្ពុជា កំណត់ស្តង់ដារថ្មីក្នុងឧត្តមភាពថែទាំសុខភាព និងក្លាយជាមជ្ឈមណ្ឌលតំបន់សម្រាប់ភាពប្រសើររបស់វេជ្ជសាស្ត្រ និងការអប់រំ។"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="bg-purple-50 p-4 rounded-2xl group-hover:bg-purple-100 transition-colors duration-300 flex-shrink-0">
                        <svg
                          className="w-8 h-8 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-2xl mb-3">
                          {currentLanguage === "en" ? "Values" : "តម្លៃ"}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {currentLanguage === "en"
                            ? "Compassion, Excellence, Integrity, Innovation, and Community. We treat every patient with dignity and respect while advancing medical science for all."
                            : "ការអាណិតស្រឡាញ់ ឧត្តមភាព ភាពស្មោះត្រង់ ភាពប្រសើរ និងសហគមន៍។ យើងព្យាបាលអ្នកជំងឺគ្រប់រូបដោយការគោរព និងការយកចិត្តទុកដាក់ ខណៈដែលរុញច្រានវិទ្យាសាស្ត្រវេជ្ជសាស្ត្រសម្រាប់មនុស្សគ្រប់គ្នា។"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center h-full">
                <div className="relative w-full max-w-2xl">
                  <div className="aspect-square rounded-4xl shadow-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-teal-400 border-8 border-white">
                    <img
                      src={ksfhImage}
                      alt="Khmer-Soviet Friendship Hospital"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>

                  <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl max-w-[320px] transform hover:scale-105 transition-all duration-500 border border-gray-100">
                    <div className="flex items-center space-x-6">
                      <div className="bg-blue-50 p-4 rounded-2xl flex-shrink-0">
                        <svg
                          className="w-10 h-10 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                          24/7
                        </p>
                        <p className="text-lg text-gray-600 font-medium">
                          {currentLanguage === "en"
                            ? "Emergency Service"
                            : "សេវាកម្មភ្លាមៗ"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 mb-1">30+</p>
                      <p className="text-sm text-gray-600 font-medium">
                        {currentLanguage === "en" ? "Specialties" : "ឯកទេស"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <ActivityRCP currentLanguage={currentLanguage} />
        </AnimatedSection>

        <AnimatedSection>
          <Announcement currentLanguage={currentLanguage} />
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {currentLanguage === "en"
                  ? "Our Medical Services"
                  : "សេវាកម្មវេជ្ជសាស្ត្ររបស់យើង"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {currentLanguage === "en"
                  ? "We offer comprehensive medical services with advanced technology and experienced healthcare professionals."
                  : "យើងផ្តល់នូវសេវាកម្មវេជ្ជសាស្ត្រពេញលេញជាមួយនឹងបច្ចេកវិទ្យាទំនើប និងគ្រូពេទ្យដែលមានបទពិសោធន៍។"}
              </p>
            </div>

            {/* Combined Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
              {medicalServices[currentLanguage].map((service, index) => (
                <div
                  key={`${service.name}-${index}`}
                  className={`
                    bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl 
                    transition-all duration-500 ease-out transform cursor-pointer
                    ${index >= 4 && !showAll
                      ? "opacity-0 scale-95 h-0 overflow-hidden -mt-6 -mb-6"
                      : "opacity-100 scale-100 h-auto"
                    }
                    hover:-translate-y-1
                  `}
                  style={{
                    transitionDelay: index >= 4 ? `${(index - 4) * 50}ms` : "0ms",
                  }}
                >
                  <div className="text-3xl mb-4 transform transition-transform duration-300 hover:scale-110">
                    {getServiceIcon(service.name)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {getServiceDescription(service.name, currentLanguage)}
                  </p>
                </div>
              ))}
            </div>

            {/* Show More/Less Button */}
            {medicalServices[currentLanguage].length > 4 && (
              <div className="text-center mt-8">
                <button
                  onClick={toggleShowAll}
                  className="
                    bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg 
                     transition-all duration-300 ease-in-out 
                    transform hover:scale-105 hover:shadow-lg
                    flex items-center justify-center gap-2 mx-auto
                    min-w-[140px]
                    cursor-pointer
                  "
                >
                  <span className="text-sm">
                    {showAll
                      ? currentLanguage === "en"
                        ? "Show Less"
                        : "បង្ហាញ់តិចជាងនេះ"
                      : currentLanguage === "en"
                        ? "Show More"
                        : "បង្ហាញ់បន្ថែម"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Departments Section */}
        <AnimatedSection id="departments" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {currentLanguage === "en"
                  ? "Medical Departments"
                  : "នាយកដ្ឋានវេជ្ជសាស្ត្រ"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {currentLanguage === "en"
                  ? "Specialized medical departments with expert doctors and modern facilities."
                  : "នាយកដ្ឋានវេជ្ជសាស្ត្រឯកទេសជាមួយគ្រូពេទ្យជំនាញ និងបរិក្ខារទំនើប។"}
              </p>
            </div>

            {/* Departments Grid - Show first 4 departments */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {medicalDepartments[currentLanguage]
                .slice(0, 4)
                .map((department, index) => (
                  <motion.div
                    key={`${department.name}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleDepartmentClick(department)}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl cursor-pointer group transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <span className="text-xl">
                        {getDepartmentIcon(department.name)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {department.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      {department.description}
                    </p>
                    <div className="mt-4 flex items-center text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>
                        {currentLanguage === "en"
                          ? "Click to explore"
                          : "ចុចដើម្បីមើល"}
                      </span>
                      <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* View All Departments Button */}
            {medicalDepartments[currentLanguage].length > 4 && (
              <div className="text-center mt-12">
                <motion.button
                  onClick={handleViewAllDepartments}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-sm flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  <span>
                    {currentLanguage === "en"
                      ? "Show More"
                      : "បង្ហាញ់បន្ថែម"}
                  </span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.button>
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <HospitalSponsors currentLanguage={currentLanguage} />
        </AnimatedSection>

        <AnimatedSection>
          <Footer currentLanguage={currentLanguage} />
        </AnimatedSection>
      </div>
      <ScrollToTopButton isVisible={isVisible} />
    </>
  );
};

export default React.memo(Home);
