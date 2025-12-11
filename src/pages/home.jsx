// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSlideshow from "../components/hero";
import { useNavigate } from "react-router-dom";
import ActivityRCP from "../components/activity";
import Announcement from "../components/announcement";
import ContactForm from "../components/contact_form";
import { useInView } from "react-intersection-observer";
import TelegramQR from "../images/Telegram.png";

const Home = () => {
  const [currentLanguage, setCurrentLanguage] = useState("km");
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const API_URL = "API/message/message.php";

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        // Retry after mount
        setTimeout(scrollToHash, 300);
      }
    };

    scrollToHash();
  }, []);

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

  const getServiceIcon = (serviceName, language) => {
    const iconMap = {
      // MRI & Imaging
      "MRI Scan": "🔍",
      ថ្នាំងរូបភាពដោយម៉ាញេទិក: "🔍",
      "X-Ray": "📷",
      អេក្រុង: "📷",
      "CT Scan": "🖥️",
      ជកតាស្គេន: "🖥️",

      // Laboratory & Tests
      "Laboratory Tests": "🧪",
      ការធ្វើតេស្តមន្ទីរពិសោធន៍: "🧪",
      Ultrasound: "👶",
      អ៊ុលត្រាសោន: "👶",

      // Cardiology
      "ECG & ECHO": "💓",
      "អេសអេសជី និង អេកូ": "💓",

      // Endoscopy
      Endoscopy: "🔬",
      អង់ដោសកូប: "🔬",

      // Blood & Emergency
      "Blood Bank": "🩸",
      ធនាគារឈាម: "🩸",
      "Emergency Services": "🚨",
      សេវាកម្មភ្លាមៗ: "🚨",
      Ambulance: "🚑",
      ឡានពេទ្យ: "🚑",
    };

    return iconMap[serviceName] || "🏥";
  };

  const getServiceDescription = (serviceName, language) => {
    const descriptionMap = {
      "MRI Scan": "Advanced magnetic resonance imaging for detailed diagnosis",
      ថ្នាំងរូបភាពដោយម៉ាញេទិក:
        "ការថ្នាំងរូបភាពដោយម៉ាញេទិកទំនើបសម្រាប់ការវិនិច្ឆ័យលម្អិត",

      "X-Ray": "Digital X-ray services for bone and internal imaging",
      អេក្រុង: "សេវាកម្មអេក្រុងឌីជីថលសម្រាប់ថ្នាំងឆ្អឹង និងរូបភាពខាងក្នុង",

      "CT Scan": "Computed tomography for cross-sectional body imaging",
      ជកតាស្គេន: "ការថ្នាំងរូបភាពឆ្លុះរាងកាយដោយកុំព្យូទ័រ",

      "Laboratory Tests": "Comprehensive blood tests and laboratory analysis",
      ការធ្វើតេស្តមន្ទីរពិសោធន៍:
        "ការធ្វើតេស្តឈាម និងការវិភាគមន្ទីរពិសោធន៍ពេញលេញ",

      Ultrasound: "Ultrasound imaging for pregnancy and abdominal examination",
      អ៊ុលត្រាសោន:
        "ការថ្នាំងរូបភាពអ៊ុលត្រាសោនសម្រាប់ការមើលគភ៌ និងការពិនិត្យពោះ",

      "ECG & ECHO": "Heart monitoring and echocardiography services",
      "អេសអេសជី និង អេកូ": "សេវាកម្មតាមដានបេះដូង និងអេកូកាត់ឌីហ្គារំ",

      Endoscopy: "Minimally invasive internal examination procedure",
      អង់ដោសកូប: "និតិវិធីពិនិត្យខាងក្នុងដោយមិនចាំបាច់កាត់",

      "Blood Bank": "Safe blood storage and transfusion services",
      ធនាគារឈាម: "សេវាកម្មផ្ទុកឈាមដែលសុវត្ថិភាព និងការផ្លាស់ប្តូរឈាម",

      "Emergency Services": "24/7 emergency medical care and treatment",
      សេវាកម្មភ្លាមៗ: "ការថែទាំ និងព្យាបាលវេជ្ជសាស្ត្របន្ទាន់ ២៤/៧",

      Ambulance: "Emergency ambulance services with medical staff",
      ឡានពេទ្យ: "សេវាកម្មឡានពេទ្យបន្ទាន់ជាមួយបុគ្គលិកវេជ្ជសាស្ត្រ",
    };

    return (
      descriptionMap[serviceName] ||
      (language === "en"
        ? "Professional medical service with expert care"
        : "សេវាកម្មវេជ្ជសាស្ត្រវិជ្ជាជីវៈជាមួយការថែទាំដោយអ្នកជំនាញ")
    );
  };

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

  const getDepartmentIcon = (departmentName, language) => {
    const iconMap = {
      // Cardiology & Heart
      Cardiology: "💓",
      ជំងឺបេះដូង: "💓",

      // Gastroenterology & Stomach
      Gastroenterology: "🩺",
      ជំងឺក្រពះ: "🩺",

      // Oncology & Cancer
      Oncology: "🎗️",
      ជំងឺមហារីក: "🎗️",

      // Pulmonology & Lungs
      Pulmonology: "🫁",
      ជំងឺសួត: "🫁",

      // Dermatology & Skin
      Dermatology: "🤚",
      ជំងឺស្បែក: "🤚",

      // Ophthalmology & Eyes
      Ophthalmology: "👁️",
      ជំងឺភ្នែក: "👁️",

      // Surgery
      Surgery: "🔪",
      ការវះកាត់: "🔪",

      // Orthopedics & Bones
      Orthopedics: "🦴",
      ឆ្អឹងជំនី: "🦴",

      // Neurology & Brain
      Neurology: "🧠",
      ប្រសាទ: "🧠",

      // Neurosurgery & Brain Surgery
      Neurosurgery: "⚡",
      វះកាត់ខួរក្បាល: "⚡",

      // Pediatrics & Children
      Pediatrics: "👶",
      ជំងឺកុមារ: "👶",

      // OB-GYN & Women
      "OB-GYN": "👩",
      ស្ត្រីធំ: "👩",

      // Urology & Urinary
      Urology: "🚽",
      ផ្លូវនោម: "🚽",

      // Nephrology & Kidney
      Nephrology: "🥩",
      តម្រងនោម: "🥩",

      // Emergency & Critical Care
      Emergency: "🚨",
      ភ្លាមៗ: "🚨",

      // ICU & Critical
      ICU: "🏥",
      ថែទាំធ្ងន់: "🏥",

      // Anesthesia & Pain
      Anesthesia: "💤",
      ដេកលក់: "💤",

      // ENT & Ear Nose Throat
      ENT: "👂",
      ត្រចៀកក: "👂",

      // Psychiatry & Mental
      Psychiatry: "🧠",
      ចិត្តវិទ្យា: "🧠",

      // Dentistry & Teeth
      Dentistry: "🦷",
      ធ្មេញ: "🦷",

      // Physiotherapy & Rehab
      Physiotherapy: "💪",
      រោគព្យាបាល: "💪",
    };

    return iconMap[departmentName] || "🏥";
  };

  const medicalDepartments = {
    en: [
      // Major Clinical Departments
      { name: "Cardiology", href: "#cardiology", description: "Heart Care" },
      { name: "Gastroenterology", href: "#gastro", description: "Digestive" },
      { name: "Oncology", href: "/oncology", description: "Cancer" },
      { name: "Pulmonology", href: "#pulmonology", description: "Lungs" },
      { name: "Dermatology", href: "#dermatology", description: "Skin" },
      { name: "Ophthalmology", href: "/optamo", description: "Eyes" },

      // Surgical Departments
      { name: "Surgery", href: "#surgery", description: "General" },
      { name: "Orthopedics", href: "#orthopedics", description: "Bones" },
      { name: "Neurology", href: "#neurology", description: "Brain" },
      {
        name: "Neurosurgery",
        href: "#neurosurgery",
        description: "Brain Surg",
      },

      // Specialized Medicine
      { name: "Pediatrics", href: "#pediatrics", description: "Children" },
      { name: "OB-GYN", href: "#obgyn", description: "Women's" },
      { name: "Urology", href: "#urology", description: "Urinary" },
      { name: "Nephrology", href: "#nephrology", description: "Kidney" },

      // Emergency & Critical Care
      { name: "Emergency", href: "#emergency-med", description: "24/7 Care" },
      { name: "ICU", href: "#icu", description: "Critical" },
      { name: "Anesthesia", href: "#anesthesia", description: "Pain" },

      // Additional Specialties
      { name: "ENT", href: "#ent", description: "Ear Nose" },
      { name: "Psychiatry", href: "#psychiatry", description: "Mental" },
      { name: "Dentistry", href: "#dentistry", description: "Teeth" },
      { name: "Physiotherapy", href: "#physio", description: "Rehab" },
    ],
    km: [
      // Major Clinical Departments
      { name: "ជំងឺបេះដូង", href: "#cardiology", description: "បេះដូង" },
      { name: "ជំងឺក្រពះ", href: "#gastro", description: "ក្រពះ" },
      { name: "ជំងឺមហារីក", href: "/oncology", description: "មហារីក" },
      { name: "ជំងឺសួត", href: "#pulmonology", description: "សួត" },
      { name: "ជំងឺស្បែក", href: "#dermatology", description: "ស្បែក" },
      { name: "ជំងឺភ្នែក", href: "/optamo", description: "ភ្នែក" },

      // Surgical Departments
      { name: "ការវះកាត់", href: "#surgery", description: "ទូទៅ" },
      { name: "ឆ្អឹងជំនី", href: "#orthopedics", description: "ឆ្អឹង" },
      { name: "ប្រសាទ", href: "#neurology", description: "ខួរក្បាល" },
      {
        name: "វះកាត់ខួរក្បាល",
        href: "#neurosurgery",
        description: "ខួរក្បាល",
      },

      // Specialized Medicine
      { name: "ជំងឺកុមារ", href: "#pediatrics", description: "កុមារ" },
      { name: "ស្ត្រីធំ", href: "#obgyn", description: "ស្ត្រី" },
      { name: "ផ្លូវនោម", href: "#urology", description: "នោម" },
      { name: "តម្រងនោម", href: "#nephrology", description: "តម្រង" },

      // Emergency & Critical Care
      { name: "ភ្លាមៗ", href: "#emergency-med", description: "២៤/៧" },
      { name: "ថែទាំធ្ងន់", href: "#icu", description: "ធ្ងន់" },
      { name: "ដេកលក់", href: "#anesthesia", description: "ឈឺ" },

      // Additional Specialties
      { name: "ត្រចៀកក", href: "#ent", description: "ត្រចៀក" },
      { name: "ចិត្តវិទ្យា", href: "#psychiatry", description: "ចិត្ត" },
      { name: "ធ្មេញ", href: "#dentistry", description: "ធ្មេញ" },
      { name: "រោគព្យាបាល", href: "#physio", description: "ស្តារ" },
    ],
  };

  const handleDepartmentClick = (department) => {
    console.log("Navigating to:", department.href);
    if (department.href.startsWith("/")) {
      // Navigate to internal page
      navigate(department.href);
    } else {
      // Scroll to section on same page
      const element = document.querySelector(department.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleViewAllDepartments = () => {
    // Navigate to departments page
    navigate("/departments");
  };

  return (
    <div className="pt-16">
      <AnimatedSection>
        {" "}
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
                <p className="text-sm sm:text-2xl text-gray-600 leading-relaxed tracking-wide">
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
                    src="src/images/KSFH.jpg"
                    alt="Khmer-Soviet Friendship Hospital"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
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
        {" "}
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
                key={index}
                className={`
                  bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl 
                  transition-all duration-500 ease-out transform cursor-pointer
                  ${
                    index >= 4 && !showAll
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
                  {getServiceIcon(service.name, currentLanguage)}
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

          {/* Show More/Less Button - Reduced spacing */}
          {medicalServices[currentLanguage].length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="
                  bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg 
                  font-semibold transition-all duration-300 ease-in-out 
                  transform hover:scale-105 hover:shadow-lg
                  flex items-center justify-center gap-2 mx-auto
                  min-w-[180px]
                  cursor-pointer
                "
              >
                <span className="text-base">
                  {showAll
                    ? currentLanguage === "en"
                      ? "Show Less"
                      : "បង្ហាញតិចជាងនេះ"
                    : currentLanguage === "en"
                    ? "Show More"
                    : "បង្ហាញបន្ថែម"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
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

          {/* Departments Grid - Show only first 8 departments */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {medicalDepartments[currentLanguage]
              .slice(0, 4)
              .map((department, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => handleDepartmentClick(department)}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl cursor-pointer group transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                    <span className="text-xl">
                      {getDepartmentIcon(department.name, currentLanguage)}
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
          {medicalDepartments[currentLanguage].length > 8 && (
            <div className="text-center mt-12">
              <motion.button
                onClick={handleViewAllDepartments}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>
                  {currentLanguage === "en"
                    ? "View All Departments"
                    : "មើលនាយកដ្ឋានទាំងអស់"}
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

export default Home;
