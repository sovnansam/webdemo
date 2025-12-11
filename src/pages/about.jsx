import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useLanguage } from '../contexts/LanguageContext';
import hero1 from "../images/hero/hero4.jpg";
import hero2 from "../images/hero/hero2.jpg";
import hero3 from "../images/hero/hero3.jpg";

const About = () => {
  const [showAll, setShowAll] = useState(false);
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

  // Hospital Statistics Data
  const hospitalStats = [
    { number: "500+", label: { en: "Medical Staff", km: "បុគ្គលិកវេជ្ជសាស្ត្រ" } },
    { number: "30+", label: { en: "Specialties", km: "ឯកទេស" } },
    { number: "50,000+", label: { en: "Patients Yearly", km: "អ្នកជំងឺក្នុងមួយឆ្នាំ" } },
    { number: "24/7", label: { en: "Emergency Service", km: "សេវាកម្មភ្លាមៗ" } }
  ];

  // Hospital History & Achievements
  const hospitalHistory = [
    {
      year: "1992",
      title: { en: "Hospital Foundation", km: "ការបង្កើតមន្ទីរពេទ្យ" },
      description: { 
        en: "Established as a symbol of friendship between Cambodia and Soviet Union", 
        km: "បានបង្កើតឡើងជានិមិត្តសញ្ញានៃមិត្តភាពរវាងកម្ពុជា និងសូវៀត" 
      }
    },
    {
      year: "2000",
      title: { en: "Modernization Program", km: "កម្មវិធីទំនើបភាព" },
      description: { 
        en: "Major renovation and equipment upgrade to meet international standards", 
        km: "ការកែលម្អធំ និងធ្វើឱ្យទំនើបឧបករណ៍ដើម្បីបំពេញតាមស្តង់ដារអន្តរជាតិ" 
      }
    },
    {
      year: "2010",
      title: { en: "Teaching Hospital Status", km: "ស្ថានភាពមន្ទីរពេទ្យបង្រៀន" },
      description: { 
        en: "Recognized as a premier teaching hospital for medical education", 
        km: "ទទួលស្គាល់ជាមន្ទីរពេទ្យបង្រៀនដ៏ល្អឥតខ្ចោះសម្រាប់ការអប់រំវេជ្ជសាស្ត្រ" 
      }
    },
    {
      year: "2020",
      title: { en: "COVID-19 Response Center", km: "មជ្ឈមណ្ឌលតបតរ COVID-19" },
      description: { 
        en: "Designated as main COVID-19 treatment center in Phnom Penh", 
        km: "ត្រូវបានកំណត់ជាមជ្ឈមណ្ឌលព្យាបាល COVID-19 ចម្បងនៅក្នុងរាជធានីភ្នំពេញ" 
      }
    },
       {
      year: "2020",
      title: { en: "COVID-19 Response Center", km: "មជ្ឈមណ្ឌលតបតរ COVID-19" },
      description: { 
        en: "Designated as main COVID-19 treatment center in Phnom Penh", 
        km: "ត្រូវបានកំណត់ជាមជ្ឈមណ្ឌលព្យាបាល COVID-19 ចម្បងនៅក្នុងរាជធានីភ្នំពេញ" 
      }
    },
       {
      year: "2020",
      title: { en: "COVID-19 Response Center", km: "មជ្ឈមណ្ឌលតបតរ COVID-19" },
      description: { 
        en: "Designated as main COVID-19 treatment center in Phnom Penh", 
        km: "ត្រូវបានកំណត់ជាមជ្ឈមណ្ឌលព្យាបាល COVID-19 ចម្បងនៅក្នុងរាជធានីភ្នំពេញ" 
      }
    },
       {
      year: "2020",
      title: { en: "COVID-19 Response Center", km: "មជ្ឈមណ្ឌលតបតរ COVID-19" },
      description: { 
        en: "Designated as main COVID-19 treatment center in Phnom Penh", 
        km: "ត្រូវបានកំណត់ជាមជ្ឈមណ្ឌលព្យាបាល COVID-19 ចម្បងនៅក្នុងរាជធានីភ្នំពេញ" 
      }
    },
       {
      year: "2020",
      title: { en: "COVID-19 Response Center", km: "មជ្ឈមណ្ឌលតបតរ COVID-19" },
      description: { 
        en: "Designated as main COVID-19 treatment center in Phnom Penh", 
        km: "ត្រូវបានកំណត់ជាមជ្ឈមណ្ឌលព្យាបាល COVID-19 ចម្បងនៅក្នុងរាជធានីភ្នំពេញ" 
      }
    },
       {
      year: "2020",
      title: { en: "COVID-19 Response Center", km: "មជ្ឈមណ្ឌលតបតរ COVID-19" },
      description: { 
        en: "Designated as main COVID-19 treatment center in Phnom Penh", 
        km: "ត្រូវបានកំណត់ជាមជ្ឈមណ្ឌលព្យាបាល COVID-19 ចម្បងនៅក្នុងរាជធានីភ្នំពេញ" 
      }
    },
    
  ];

  // Medical Departments Data
  const medicalDepartments = [
    { 
      name: { en: "Cardiology", km: "ជំងឺបេះដូង" },
      icon: "❤️",
      description: { 
        en: "Comprehensive heart care and cardiovascular treatments", 
        km: "ការថែទាំបេះដូង និងជំងឺបេះដូងពេញលេញ" 
      }
    },
    { 
      name: { en: "Neurology", km: "ប្រព័ន្ធប្រសាទ" },
      icon: "🧠",
      description: { 
        en: "Advanced neurological diagnosis and treatment", 
        km: "ការវាយតម្លៃ និងការព្យាបាលប្រព័ន្ធប្រសាទទំនើប" 
      }
    },
    { 
      name: { en: "Pediatrics", km: "ជំងឺកុមារ" },
      icon: "👶",
      description: { 
        en: "Specialized care for children and infants", 
        km: "ការថែទាំឯកទេសសម្រាប់កុមារ និងទារក" 
      }
    },
    { 
      name: { en: "Orthopedics", km: "ឆ្អឹង និងគ្រោះថ្នាក់" },
      icon: "🦴",
      description: { 
        en: "Bone, joint, and musculoskeletal treatments", 
        km: "ការព្យាបាលឆ្អឹង របុំឆ្អឹង និងគ្រោះថ្នាក់" 
      }
    },
    { 
      name: { en: "Oncology", km: "ជំងឺមហារីក" },
      icon: "🎗️",
      description: { 
        en: "Cancer diagnosis, treatment, and care", 
        km: "ការវាយតម្លៃ ការព្យាបាល និងការថែទាំជំងឺមហារីក" 
      }
    },
    { 
      name: { en: "Emergency Medicine", km: "វេជ្ជសាស្ត្រសង្គ្រោះបន្ទាន់" },
      icon: "🚑",
      description: { 
        en: "24/7 emergency and critical care services", 
        km: "សេវាកម្មសង្គ្រោះបន្ទាន់ និងថែទាំសំខាន់ ២៤/៧" 
      }
    }
  ];

  // Updated Doctors Data with Avatar Links
const doctors = [
  {
    id: 1,
    name: "Dr. Samnang Chea",
    title: { en: "Chief of Cardiology", km: "ប្រធានផ្នែកជំងឺបេះដូង" },
    specialty: { en: "Cardiology", km: "ជំងឺបេះដូង" },
    experience: "15 years",
    education: { en: "MD, University of Health Sciences", km: "បណ្ឌិតវេជ្ជសាស្ត្រ សកលវិទ្យាល័យវិទ្យាសាស្ត្រសុខភាព" },
    languages: ["English", "Khmer", "French"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    achievements: { 
      en: "Pioneered minimally invasive heart procedures in Cambodia", 
      km: "ជាអ្នកដំបូងគេបង្កើតនូវបច្ចេកទេសវះកាត់បេះដូងតូចបំផុតនៅកម្ពុជា" 
    }
  },
  {
    id: 2,
    name: "Dr. Sopheak Tan",
    title: { en: "Head of Neurology", km: "ប្រធានផ្នែកប្រព័ន្ធប្រសាទ" },
    specialty: { en: "Neurology", km: "ប្រព័ន្ធប្រសាទ" },
    experience: "12 years",
    education: { en: "MD, PhD in Neurology", km: "បណ្ឌិតវេជ្ជសាស្ត្រ, បណ្ឌិតផ្នែកប្រព័ន្ធប្រសាទ" },
    languages: ["English", "Khmer", "Russian"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    achievements: { 
      en: "Developed stroke rehabilitation program for Cambodian patients", 
      km: "បានបង្កើតកម្មវិធីស្តរសុខភាពអ្នកជំងឺដាច់សរសៃឈាមខួរក្បាលសម្រាប់អ្នកជំងឺកម្ពុជា" 
    }
  },
  {
    id: 3,
    name: "Dr. Malis Heng",
    title: { en: "Senior Pediatrician", km: "គ្រូពេទ្យកុមារជាន់ខ្ពស់" },
    specialty: { en: "Pediatrics", km: "ជំងឺកុមារ" },
    experience: "18 years",
    education: { en: "MD, Pediatric Specialist", km: "បណ្ឌិតវេជ្ជសាស្ត្រ, ឯកទេសជំងឺកុមារ" },
    languages: ["English", "Khmer", "Vietnamese"],
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=300&fit=crop&crop=face",
    achievements: { 
      en: "Child vaccination advocacy leader in Cambodia", 
      km: "អ្នកដឹកនាំការតស៊ូវៃក់សាំងកុមារនៅកម្ពុជា" 
    }
  },
  {
    id: 4,
    name: "Dr. Vannak Kong",
    title: { en: "Orthopedic Surgeon", km: "សះត្រាឆ្អឹង" },
    specialty: { en: "Orthopedics", km: "ឆ្អឹង និងគ្រោះថ្នាក់" },
    experience: "10 years",
    education: { en: "MD, Orthopedic Surgery", km: "បណ្ឌិតវេជ្ជសាស្ត្រ, វេជ្ជសាស្ត្រវះកាត់ឆ្អឹង" },
    languages: ["English", "Khmer", "Chinese"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
    achievements: { 
      en: "Expert in joint replacement and sports injuries", 
      km: "អ្នកជំនាញក្នុងការផ្លាស់ប្តូររបុំឆ្អឹង និងរបួសកីឡា" 
    }
  },
  {
    id: 5,
    name: "Dr. Bopha Sok",
    title: { en: "Oncology Specialist", km: "ឯកទេសជំងឺមហារីក" },
    specialty: { en: "Oncology", km: "ជំងឺមហារីក" },
    experience: "14 years",
    education: { en: "MD, Oncology Fellowship", km: "បណ្ឌិតវេជ្ជសាស្ត្រ, វគ្គបណ្តុះបណ្តាលឯកទេសជំងឺមហារីក" },
    languages: ["English", "Khmer", "Japanese"],
    image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=300&h=300&fit=crop&crop=face",
    achievements: { 
      en: "Leading researcher in cancer treatment in Southeast Asia", 
      km: "អ្នកស្រាវជ្រាវដឹកនាំក្នុងការព្យាបាលជំងឺមហារីកនៅអាស៊ីអាគ្នេយ៍" 
    }
  },
  {
    id: 6,
    name: "Dr. Rithy Chan",
    title: { en: "Emergency Medicine Director", km: "អគ្គនាយកវេជ្ជសាស្ត្រសង្គ្រោះបន្ទាន់" },
    specialty: { en: "Emergency Medicine", km: "វេជ្ជសាស្ត្រសង្គ្រោះបន្ទាន់" },
    experience: "16 years",
    education: { en: "MD, Emergency Medicine Specialist", km: "បណ្ឌិតវេជ្ជសាស្ត្រ, ឯកទេសវេជ្ជសាស្ត្រសង្គ្រោះបន្ទាន់" },
    languages: ["English", "Khmer", "Thai"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    achievements: { 
      en: "Developed emergency response protocols for mass casualties", 
      km: "បានបង្កើតគោលការណ៍តបតរសង្គ្រោះបន្ទាន់សម្រាប់អ្នករងគ្រោះច្រើននាក់" 
    }
  }
];

  const displayedDoctors = showAll ? doctors : doctors.slice(0, 3);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <AnimatedSection className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-teal-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 2xl:py-32 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-28 items-stretch min-h-[70vh]">
            <div className="flex flex-col justify-center space-y-10 md:space-y-12 h-full">
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-blue-700 px-5 py-3 rounded-2xl text-sm font-medium border border-blue-100 shadow-sm w-fit mx-auto lg:mx-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="font-medium text-sm sm:text-base">
                  {currentLanguage === "en" ? "Trusted Healthcare Since 1992" : "សេវាកម្មសុខភាពដែលទុកចិត្តចាប់ពីឆ្នាំ ១៩៩២"}
                </span>
              </div>

              <div className="space-y-6 text-center lg:text-left">
                <h1 className="text-2xl xs:text-6xl sm:text-6xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                  <span className="block">
                    {currentLanguage === "en" ? "Khmer-Soviet Friendship Hospital" : "មន្ទីរពេទ្យមិត្តភាពខ្មែរសូវៀត"}
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

              {/* Hospital Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {hospitalStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">{stat.number}</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {currentLanguage === "en" ? stat.label.en : stat.label.km}
                    </p>
                  </div>
                ))}
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
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

{/* Even More Compact with Maximum Text Space */}
<AnimatedSection className="py-12 md:py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {currentLanguage === "en" ? "Our History & Legacy" : "ប្រវត្តិ និងមរតករបស់យើង"}
      </h2>
      <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">
        {currentLanguage === "en" 
          ? "Three decades of excellence in healthcare and medical education" 
          : "បីទសវត្សរ៍នៃឧត្តមភាពក្នុងការថែទាំសុខភាព និងការអប់រំវេជ្ជសាស្ត្រ"}
      </p>
    </div>

    <div className="relative">
      {/* Main Timeline line */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full"></div>
      
      {/* Mobile: Single column */}
      <div className="md:hidden space-y-8">
        {hospitalHistory.map((item, index) => (
          <div key={index} className="flex justify-center">
            <div className="w-full max-w-xl">
              <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-blue-600 text-lg font-semibold mb-3">{item.year}</div>
                <h3 className="text-md font-bold text-gray-900 mb-4">
                  {currentLanguage === "en" ? item.title.en : item.title.km}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {currentLanguage === "en" ? item.description.en : item.description.km}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Ultra Compact with Maximum Text Space */}
      <div className="hidden md:block">
        <div className="space-y-8">
          {Array.from({ length: Math.ceil(hospitalHistory.length / 2) }).map((_, rowIndex) => (
            <div key={rowIndex} className="relative flex items-center justify-between">
              
              {/* Left Item */}
              <div className="w-[48%] relative">
                {/* Minimal curved connection */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-4 border-t-2 border-r-2 border-blue-300 rounded-tr-md"></div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-right mr-8"> {/* Minimal margin */}
                  <div className="text-blue-600 text-lg font-semibold mb-3">
                    {hospitalHistory[rowIndex * 2]?.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {currentLanguage === "en" 
                      ? hospitalHistory[rowIndex * 2]?.title.en 
                      : hospitalHistory[rowIndex * 2]?.title.km}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-md">
                    {currentLanguage === "en" 
                      ? hospitalHistory[rowIndex * 2]?.description.en 
                      : hospitalHistory[rowIndex * 2]?.description.km}
                  </p>
                </div>
              </div>

              {/* Center Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg z-20"></div>

              {/* Right Item */}
              <div className="w-[48%] relative">
                {/* Minimal curved connection */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-4 border-t-2 border-l-2 border-blue-300 rounded-tl-md"></div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-left ml-8"> {/* Minimal margin */}
                  <div className="text-blue-600 text-lg font-semibold mb-3">
                    {hospitalHistory[rowIndex * 2 + 1]?.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {currentLanguage === "en" 
                      ? hospitalHistory[rowIndex * 2 + 1]?.title.en 
                      : hospitalHistory[rowIndex * 2 + 1]?.title.km}
                  </h3>
                  <p className="text-gray-600 leading-relaxed md">
                    {currentLanguage === "en" 
                      ? hospitalHistory[rowIndex * 2 + 1]?.description.en 
                      : hospitalHistory[rowIndex * 2 + 1]?.description.km}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</AnimatedSection>
{/* Modern Mission, Vision & Values Section */}
<section className="py-24 bg-white relative overflow-hidden">
  {/* Background Elements */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-40"></div>
  <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-indigo-100 rounded-full opacity-30"></div>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section Header */}
    <AnimatedSection delay={0.1}>
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          {currentLanguage === "en" ? "Our Foundation" : "មូលដ្ឋានគ្រឹះរបស់យើង"}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {currentLanguage === "en" ? "Guiding " : "គោលការណ៍ "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {currentLanguage === "en" ? "Principles" : "ណែនាំ"}
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {currentLanguage === "en" 
            ? "The core beliefs that shape our approach to healthcare and define our commitment to excellence"
            : "ជំនឿជាមូលដ្ឋានដែលរចនាវិធីសាស្ត្រថែទាំសុខភាពរបស់យើង និងកំណត់ការប្តេជ្ញាចិត្តរបស់យើងចំពោះភាពអស្ចារ្យ"}
        </p>
      </div>
    </AnimatedSection>

    {/* Mission - Image Left, Text Right */}
    <AnimatedSection delay={0.2}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        {/* Image on Left */}
        <motion.div 
          className="relative group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={hero1}
              alt={currentLanguage === "en" ? "Medical Mission" : "បេសកកម្មវេជ្ជសាស្ត្រ"}
              className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
            <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {currentLanguage === "en" ? "Mission" : "បេសកកម្ម"}
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-60"></div>
        </motion.div>

        {/* Text on Right */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-3 rounded-2xl text-lg font-semibold border border-blue-200">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            {currentLanguage === "en" ? "Our Mission" : "បេសកកម្មរបស់យើង"}
          </div>

          <h3 className="text-4xl font-bold text-gray-900 leading-tight">
            {currentLanguage === "en" 
              ? "Delivering Exceptional Healthcare Through Innovation and Compassion"
              : "ការផ្តល់នូវការថែទាំសុខភាពដ៏ល្អឥតខ្ចោះតាមរយៈនវានុវត្តន៍ និងការអាណិតស្រឡាញ់"}
          </h3>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            {currentLanguage === "en" 
              ? "To provide exceptional healthcare through advanced medical services, education, and research while maintaining the highest standards of compassion and excellence."
              : "ផ្តល់នូវការថែទាំសុខភាពដ៏ល្អឥតខ្ចោះតាមរយៈសេវាកម្មវេជ្ជសាស្ត្រទំនើប ការអប់រំ និងការស្រាវជ្រាវ ខណៈដែលរក្សាស្តង់ដារខ្ពស់បំផុតនៃការអាណិតស្រឡាញ់ និងឧត្តមភាព។"}
          </p>

          <div className="space-y-4">
            {[
              {
                en: "Advanced medical technology and research",
                km: "បច្ចេកវិទ្យាវេជ្ជសាស្ត្រទំនើប និងការស្រាវជ្រាវ"
              },
              {
                en: "Compassionate patient-centered care",
                km: "ការថែទាំដែលផ្តោតលើអ្នកជម្ងឺដោយមានការអាណិតស្រឡាញ់"
              },
              {
                en: "Medical education and professional development",
                km: "ការអប់រំវេជ្ជសាស្ត្រ និងការអភិវឌ្ឍវិជ្ជាជីវៈ"
              },
              {
                en: "Community health initiatives",
                km: "គំរោងសុខភាពសហគមន៍"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className="text-gray-700">
                  {currentLanguage === "en" ? item.en : item.km}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>

    {/* Vision - Text Left, Image Right */}
    <AnimatedSection delay={0.3}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        {/* Text on Left */}
        <div className="space-y-6 lg:order-1 order-2">
          <div className="inline-flex items-center gap-3 bg-cyan-50 text-cyan-700 px-4 py-3 rounded-2xl text-lg font-semibold border border-cyan-200">
            <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            {currentLanguage === "en" ? "Our Vision" : "ចក្ខុវិស័យរបស់យើង"}
          </div>

          <h3 className="text-4xl font-bold text-gray-900 leading-tight">
            {currentLanguage === "en" 
              ? "Leading Medical Excellence in Cambodia and Beyond"
              : "ដឹកនាំភាពអស្ចារ្យវេជ្ជសាស្ត្រនៅកម្ពុជា"}
          </h3>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            {currentLanguage === "en" 
              ? "To be Cambodia's leading medical institution, setting new standards in healthcare excellence and becoming a regional center for medical innovation and education. We envision a future where quality healthcare is accessible to all."
              : "ក្លាយជាស្ថាប័នវេជ្ជសាស្ត្រឈានមុខគេនៅកម្ពុជា កំណត់ស្តង់ដារថ្មីនៃឧត្តមភាពថែទាំសុខភាព និងក្លាយជាមជ្ឈមណ្ឌលតំបន់សម្រាប់នវានុវត្តន៍វេជ្ជសាស្ត្រ និងការអប់រំ។ យើងមើលឃើញអនាគតដែលការថែទាំសុខភាពដែលមានគុណភាពអាចទទួលបានដោយទាំងអស់គ្នា។"}
          </p>

          <div className="space-y-4">
            {[
              {
                en: "Regional center for medical excellence",
                km: "មជ្ឈមណ្ឌលតំបន់សម្រាប់ឧត្តមភាពវេជ្ជសាស្ត្រ"
              },
              {
                en: "Pioneer in medical research and innovation",
                km: "ជាអ្នកដើរតួនាទីជំនាញក្នុងការស្រាវជ្រាវវេជ្ជសាស្ត្រ និងនវានុវត្តន៍"
              },
              {
                en: "Leader in healthcare education",
                km: "អ្នកដឹកនាំក្នុងការអប់រំថែទាំសុខភាព"
              },
              {
                en: "Model for sustainable healthcare",
                km: "គំរូសម្រាប់ការថែទាំសុខភាពប្រកបដោយចីរភាព"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className="text-gray-700">
                  {currentLanguage === "en" ? item.en : item.km}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Image on Right */}
        <motion.div 
          className="relative group lg:order-2 order-1"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={hero2}
              alt={currentLanguage === "en" ? "Hospital Vision" : "ចក្ខុវិស័យមន្ទីរពេទ្យ"}
              className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-600/20 to-transparent"></div>
            <div className="absolute top-6 right-6 bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {currentLanguage === "en" ? "Our Vision" : "ចក្ខុវិស័យរបស់យើង"}
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-cyan-100 rounded-full opacity-60"></div>
        </motion.div>
      </div>
    </AnimatedSection>

    {/* Values - Centered Layout */}
    <AnimatedSection delay={0.4}>
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-indigo-50 text-indigo-700 px-4 py-3 rounded-2xl text-lg font-semibold border border-indigo-200 mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          {currentLanguage === "en" ? "Our Values" : "តម្លៃរបស់យើង"}
        </div>
        <h3 className="text-4xl font-bold text-gray-900 mb-6">
          {currentLanguage === "en" 
            ? "The Heart of Everything We Do"
            : "ចិត្តនៃអ្វីៗទាំងអស់ដែលយើងធ្វើ"}
        </h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {currentLanguage === "en" 
            ? "Our values guide every decision we make and every interaction we have. They are the foundation of our commitment to exceptional healthcare and community service."
            : "តម្លៃរបស់យើងណែនាំរាល់ការសម្រេចចិត្តដែលយើងធ្វើ និងរាល់អន្តរកម្មដែលយើងមាន។ ពួកគេគឺជាមូលដ្ឋាននៃការប្តេជ្ញាចិត្តរបស់យើងចំពោះការថែទាំសុខភាពដ៏ល្អឥតខ្ចោះ និងសេវាកម្មសហគមន៍។"}
        </p>
      </div>

      {/* Centered Image */}
      <motion.div 
        className="relative max-w-4xl mx-auto mb-12 group"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={hero3}
            alt={currentLanguage === "en" ? "Hospital Values" : "តម្លៃមន្ទីរពេទ្យ"}
            className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/30 to-transparent"></div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold">
            {currentLanguage === "en" ? "Our Core Values" : "តម្លៃគោលរបស់យើង"}
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  </div>
</section>


<AnimatedSection className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        {currentLanguage === "en" ? "Our Medical Experts" : "គ្រូពេទ្យឯកទេសរបស់យើង"}
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        {currentLanguage === "en" 
          ? "Meet our team of highly qualified and experienced medical professionals" 
          : "ស្គាល់ក្រុមគ្រូពេទ្យឯកទេសដែលមានគុណភាព និងបទពិសោធន៍ខ្ពស់របស់យើង"}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayedDoctors.map((doctor) => (
        <motion.div 
          key={doctor.id} 
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer"
          whileHover={{ 
            scale: 1.05,
            y: -10,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Circular Avatar Only - No Header Color */}
          <div className="relative pt-8 pb-4 flex items-center justify-center">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-2xl overflow-hidden group-hover:border-blue-500 group-hover:shadow-blue-200 transition-all duration-500">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* Online Status Indicator */}
              <motion.div 
                className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 rounded-full border-2 border-white"
                whileHover={{ scale: 1.2 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              
              {/* Speciality Badge */}
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentLanguage === "en" ? doctor.specialty.en : doctor.specialty.km}
              </motion.div>
            </motion.div>
          </div>

          {/* Doctor Information */}
          <div className="pb-6 px-6 text-center">
            <motion.h3 
              className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {doctor.name}
            </motion.h3>
            
            <motion.p 
              className="text-blue-600 font-semibold mb-3 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              {currentLanguage === "en" ? doctor.title.en : doctor.title.km}
            </motion.p>
            
            {/* Experience & Education */}
            <motion.div 
              className="space-y-2 text-sm text-gray-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 group-hover:text-gray-800 transition-colors duration-300">
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  🏥
                </motion.span>
                <span>{doctor.experience} {currentLanguage === "en" ? "experience" : "បទពិសោធន៍"}</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 group-hover:text-gray-800 transition-colors duration-300">
                <motion.span
                  whileHover={{ scale: 1.2 }}
                >
                  🎓
                </motion.span>
                <span className="text-xs">{currentLanguage === "en" ? doctor.education.en : doctor.education.km}</span>
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-gray-500">🗣️</span>
                <span className="text-xs text-gray-500">{currentLanguage === "en" ? "Languages" : "ភាសា"}:</span>
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {doctor.languages.map((lang, idx) => (
                  <motion.span 
                    key={idx} 
                    className="bg-gray-100 px-2 py-1 rounded text-xs group-hover:bg-blue-100 group-hover:text-blue-700 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "#dbeafe"
                    }}
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Achievements - Appears on Hover */}
            <motion.div 
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              whileHover={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                <p className="text-sm text-blue-800 font-medium text-left">
                  {currentLanguage === "en" ? doctor.achievements.en : doctor.achievements.km}
                </p>
              </div>
            </motion.div>

            {/* Action Buttons with Hover Effects */}
            <motion.div 
              className="flex gap-2 mt-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2 group/btn"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  📅
                </motion.span>
                {currentLanguage === "en" ? "Book" : "ការណាត់ជួប"}
              </motion.button>
              
              <motion.button 
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors duration-300 flex items-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#dbeafe"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  👤
                </motion.span>
                {currentLanguage === "en" ? "Profile" : "ប្រវត្តិ"}
              </motion.button>
            </motion.div>

            {/* Hover Effect Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </motion.div>
      ))}
    </div>

    {doctors.length > 3 && (
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          onClick={() => setShowAll(!showAll)}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 relative overflow-hidden group"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">
            {showAll 
              ? (currentLanguage === "en" ? "Show Less" : "បង្ហាញតិចជាងនេះ")
              : (currentLanguage === "en" ? "View All Doctors" : "មើលគ្រូពេទ្យទាំងអស់")
            }
          </span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.1 }}
          ></motion.div>
        </motion.button>
      </motion.div>
    )}
  </div>
</AnimatedSection>

      {/* Hospital Facilities Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {currentLanguage === "en" ? "World-Class Facilities" : "បរិក្ខារល្អឥតខ្ចោះ"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentLanguage === "en" 
                ? "State-of-the-art medical equipment and comfortable patient facilities" 
                : "ឧបករណ៍វេជ្ជសាស្ត្រទំនើប និងបរិក្ខារសម្រាប់អ្នកជំងឺដ៏ស្រួលបំផុត"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🏥", name: { en: "Modern Operation Theaters", km: "បន្ទប់វះកាត់ទំនើប" } },
              { icon: "🔬", name: { en: "Advanced Laboratories", km: "មន្ទីរពិសោធន៍ទំនើប" } },
              { icon: "📡", name: { en: "MRI & CT Scan", km: "ម៉ាស៊ីន MRI និង CT Scan" } },
              { icon: "💊", name: { en: "24/7 Pharmacy", km: "ផាម៉ាស៊ី ២៤/៧" } },
              { icon: "🛌", name: { en: "Private Rooms", km: "បន្ទប់ឯកជន" } },
              { icon: "👶", name: { en: "Neonatal ICU", km: "បន្ទប់ថែទាំទារក" } },
              { icon: "❤️", name: { en: "Cardiac ICU", km: "បន្ទប់ថែទាំបេះដូង" } },
              { icon: "🚗", name: { en: "Ambulance Service", km: "សេវាឡានពេទ្យ" } }
            ].map((facility, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors duration-300">
                <div className="text-4xl mb-3">{facility.icon}</div>
                <h3 className="font-semibold text-gray-900">
                  {currentLanguage === "en" ? facility.name.en : facility.name.km}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Emergency Services Banner */}
      <AnimatedSection className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-2xl">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">
                  {currentLanguage === "en" ? "24/7 Emergency Services" : "សេវាកម្មសង្គ្រោះបន្ទាន់ ២៤/៧"}
                </h3>
                <p className="text-red-100">
                  {currentLanguage === "en" 
                    ? "Immediate medical attention for critical conditions. Our emergency department is staffed with specialized doctors and equipped with advanced life-saving equipment." 
                    : "ការព្យាបាលវេជ្ជសាស្ត្រភ្លាមៗសម្រាប់ស្ថានភាពសំខាន់ៗ។ ផ្នែកសង្គ្រោះបន្ទាន់របស់យើងមានគ្រូពេទ្យឯកទេស និងបរិក្ខារសង្គ្រោះជីវិតទំនើប។"}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-red-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300">
                {currentLanguage === "en" ? "Call Emergency" : "ទូរស័ព្ទសង្គ្រោះបន្ទាន់"}
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors duration-300">
                {currentLanguage === "en" ? "Get Directions" : "ស្វែងរកទីតាំង"}
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default About;