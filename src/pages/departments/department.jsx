// src/pages/Departments.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const [currentLanguage, setCurrentLanguage] = useState("km");
  const navigate = useNavigate();

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

  const getDepartmentIcon = (departmentName, language) => {
    const iconMap = {
      // Cardiology & Heart
      "Cardiology": "💓",
      "ជំងឺបេះដូង": "💓",

      // Gastroenterology & Stomach
      "Gastroenterology": "🩺",
      "ជំងឺក្រពះ": "🩺",

      // Oncology & Cancer
      "Oncology": "🎗️",
      "ជំងឺមហារីក": "🎗️",

      // Pulmonology & Lungs
      "Pulmonology": "🫁",
      "ជំងឺសួត": "🫁",

      // Dermatology & Skin
      "Dermatology": "🤚",
      "ជំងឺស្បែក": "🤚",

      // Ophthalmology & Eyes
      "Ophthalmology": "👁️",
      "ជំងឺភ្នែក": "👁️",

      // Surgery
      "Surgery": "🔪",
      "ការវះកាត់": "🔪",

      // Orthopedics & Bones
      "Orthopedics": "🦴",
      "ឆ្អឹងជំនី": "🦴",

      // Neurology & Brain
      "Neurology": "🧠",
      "ប្រសាទ": "🧠",

      // Neurosurgery & Brain Surgery
      "Neurosurgery": "⚡",
      "វះកាត់ខួរក្បាល": "⚡",

      // Pediatrics & Children
      "Pediatrics": "👶",
      "ជំងឺកុមារ": "👶",

      // OB-GYN & Women
      "OB-GYN": "👩",
      "ស្ត្រីធំ": "👩",

      // Urology & Urinary
      "Urology": "🚽",
      "ផ្លូវនោម": "🚽",

      // Nephrology & Kidney
      "Nephrology": "🥩",
      "តម្រងនោម": "🥩",

      // Emergency & Critical Care
      "Emergency": "🚨",
      "ភ្លាមៗ": "🚨",

      // ICU & Critical
      "ICU": "🏥",
      "ថែទាំធ្ងន់": "🏥",

      // Anesthesia & Pain
      "Anesthesia": "💤",
      "ដេកលក់": "💤",

      // ENT & Ear Nose Throat
      "ENT": "👂",
      "ត្រចៀកក": "👂",

      // Psychiatry & Mental
      "Psychiatry": "🧠",
      "ចិត្តវិទ្យា": "🧠",

      // Dentistry & Teeth
      "Dentistry": "🦷",
      "ធ្មេញ": "🦷",

      // Physiotherapy & Rehab
      "Physiotherapy": "💪",
      "រោគព្យាបាល": "💪",
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
      { name: "Neurosurgery", href: "#neurosurgery", description: "Brain Surg" },

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
      { name: "វះកាត់ខួរក្បាល", href: "#neurosurgery", description: "ខួរក្បាល" },

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
    if (department.href.startsWith('/')) {
      // Navigate to internal page
      navigate(department.href);
    } else if (department.href.startsWith('#')) {
      // Navigate to home and scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(department.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              {currentLanguage === "en" 
                ? "All Medical Departments" 
                : "នាយកដ្ឋានវេជ្ជសាស្ត្រទាំងអស់"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {currentLanguage === "en"
                ? "Comprehensive list of all our specialized medical departments and services."
                : "បញ្ជីពេញលេញនៃនាយកដ្ឋានវេជ្ជសាស្ត្រឯកទេស និងសេវាកម្មរបស់យើង។"}
            </motion.p>
          </div>
        </div>
      </section>

      {/* All Departments Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {medicalDepartments[currentLanguage].map((department, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                onClick={() => handleDepartmentClick(department)}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl cursor-pointer group transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                  <span className="text-2xl">
                    {getDepartmentIcon(department.name, currentLanguage)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {department.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {department.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>
                    {currentLanguage === "en"
                      ? "Learn more"
                      : "ស្វែងយល់បន្ថែម"}
                  </span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
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

          {/* Back to Home Button */}
          <div className="text-center mt-16">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleBackToHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transition-all duration-300"
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>
                {currentLanguage === "en"
                  ? "Back to Home"
                  : "ត្រឡប់ទៅផ្ទះ"}
              </span>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Departments;