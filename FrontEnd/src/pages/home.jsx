// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import HeroSlideshow from "../components/hero";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentLanguage, setCurrentLanguage] = useState("km");
    const navigate = useNavigate();
  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Listen for language changes (you can also use context or props from parent)
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem("preferredLanguage");
      if (savedLanguage && savedLanguage !== currentLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    };

    // Check for language changes every second (or use a more efficient method)
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

  const [showAll, setShowAll] = useState(false);

  const getServiceIcon = (serviceName, language) => {
    const iconMap = {
      // MRI & Imaging
      'MRI Scan': '🔍',
      'ថ្នាំងរូបភាពដោយម៉ាញេទិក': '🔍',
      'X-Ray': '📷',
      'អេក្រុង': '📷',
      'CT Scan': '🖥️',
      'ជកតាស្គេន': '🖥️',

      // Laboratory & Tests
      'Laboratory Tests': '🧪',
      'ការធ្វើតេស្តមន្ទីរពិសោធន៍': '🧪',
      'Ultrasound': '👶',
      'អ៊ុលត្រាសោន': '👶',

      // Cardiology
      'ECG & ECHO': '💓',
      'អេសអេសជី និង អេកូ': '💓',

      // Endoscopy
      'Endoscopy': '🔬',
      'អង់ដោសកូប': '🔬',

      // Blood & Emergency
      'Blood Bank': '🩸',
      'ធនាគារឈាម': '🩸',
      'Emergency Services': '🚨',
      'សេវាកម្មភ្លាមៗ': '🚨',
      'Ambulance': '🚑',
      'ឡានពេទ្យ': '🚑'
    };

    return iconMap[serviceName] || '🏥';
  };

  const getServiceDescription = (serviceName, language) => {
    const descriptionMap = {
      'MRI Scan': 'Advanced magnetic resonance imaging for detailed diagnosis',
      'ថ្នាំងរូបភាពដោយម៉ាញេទិក': 'ការថ្នាំងរូបភាពដោយម៉ាញេទិកទំនើបសម្រាប់ការវិនិច្ឆ័យលម្អិត',

      'X-Ray': 'Digital X-ray services for bone and internal imaging',
      'អេក្រុង': 'សេវាកម្មអេក្រុងឌីជីថលសម្រាប់ថ្នាំងឆ្អឹង និងរូបភាពខាងក្នុង',

      'CT Scan': 'Computed tomography for cross-sectional body imaging',
      'ជកតាស្គេន': 'ការថ្នាំងរូបភាពឆ្លុះរាងកាយដោយកុំព្យូទ័រ',

      'Laboratory Tests': 'Comprehensive blood tests and laboratory analysis',
      'ការធ្វើតេស្តមន្ទីរពិសោធន៍': 'ការធ្វើតេស្តឈាម និងការវិភាគមន្ទីរពិសោធន៍ពេញលេញ',

      'Ultrasound': 'Ultrasound imaging for pregnancy and abdominal examination',
      'អ៊ុលត្រាសោន': 'ការថ្នាំងរូបភាពអ៊ុលត្រាសោនសម្រាប់ការមើលគភ៌ និងការពិនិត្យពោះ',

      'ECG & ECHO': 'Heart monitoring and echocardiography services',
      'អេសអេសជី និង អេកូ': 'សេវាកម្មតាមដានបេះដូង និងអេកូកាត់ឌីហ្គារំ',

      'Endoscopy': 'Minimally invasive internal examination procedure',
      'អង់ដោសកូប': 'និតិវិធីពិនិត្យខាងក្នុងដោយមិនចាំបាច់កាត់',

      'Blood Bank': 'Safe blood storage and transfusion services',
      'ធនាគារឈាម': 'សេវាកម្មផ្ទុកឈាមដែលសុវត្ថិភាព និងការផ្លាស់ប្តូរឈាម',

      'Emergency Services': '24/7 emergency medical care and treatment',
      'សេវាកម្មភ្លាមៗ': 'ការថែទាំ និងព្យាបាលវេជ្ជសាស្ត្របន្ទាន់ ២៤/៧',

      'Ambulance': 'Emergency ambulance services with medical staff',
      'ឡានពេទ្យ': 'សេវាកម្មឡានពេទ្យបន្ទាន់ជាមួយបុគ្គលិកវេជ្ជសាស្ត្រ'
    };

    return descriptionMap[serviceName] ||
      (language === 'en'
        ? 'Professional medical service with expert care'
        : 'សេវាកម្មវេជ្ជសាស្ត្រវិជ្ជាជីវៈជាមួយការថែទាំដោយអ្នកជំនាញ'
      );
  };

  const medicalServices = {
    en: [
      { name: 'MRI Scan', href: '#mri' },
      { name: 'X-Ray', href: '#xray' },
      { name: 'CT Scan', href: '#ctscan' },
      { name: 'Laboratory Tests', href: '#lab' },
      { name: 'Ultrasound', href: '#ultrasound' },
      { name: 'ECG & ECHO', href: '#ecg' },
      { name: 'Endoscopy', href: '#endoscopy' },
      { name: 'Blood Bank', href: '#bloodbank' },
      { name: 'Emergency Services', href: '#emergency' },
      { name: 'Ambulance', href: '#ambulance' },
    ],
    km: [
      { name: 'ថ្នាំងរូបភាពដោយម៉ាញេទិក', href: '#mri' },
      { name: 'អេក្រុង', href: '#xray' },
      { name: 'ជកតាស្គេន', href: '#ctscan' },
      { name: 'ការធ្វើតេស្តមន្ទីរពិសោធន៍', href: '#lab' },
      { name: 'អ៊ុលត្រាសោន', href: '#ultrasound' },
      { name: 'អេសអេសជី និង អេកូ', href: '#ecg' },
      { name: 'អង់ដោសកូប', href: '#endoscopy' },
      { name: 'ធនាគារឈាម', href: '#bloodbank' },
      { name: 'សេវាកម្មភ្លាមៗ', href: '#emergency' },
      { name: 'ឡានពេទ្យ', href: '#ambulance' },
    ]
  }

  const [showAllDepartments, setShowAllDepartments] = useState(false);

const getDepartmentIcon = (departmentName, language) => {
  const iconMap = {
    // Cardiology & Heart
    'Cardiology': '💓',
    'ជំងឺបេះដូង': '💓',
    
    // Gastroenterology & Stomach
    'Gastroenterology': '🩺',
    'ជំងឺក្រពះ': '🩺',
    
    // Oncology & Cancer
    'Oncology': '🎗️',
    'ជំងឺមហារីក': '🎗️',
    
    // Pulmonology & Lungs
    'Pulmonology': '🫁',
    'ជំងឺសួត': '🫁',
    
    // Dermatology & Skin
    'Dermatology': '🤚',
    'ជំងឺស្បែក': '🤚',
    
    // Ophthalmology & Eyes
    'Ophthalmology': '👁️',
    'ជំងឺភ្នែក': '👁️',
    
    // Surgery
    'Surgery': '🔪',
    'ការវះកាត់': '🔪',
    
    // Orthopedics & Bones
    'Orthopedics': '🦴',
    'ឆ្អឹងជំនី': '🦴',
    
    // Neurology & Brain
    'Neurology': '🧠',
    'ប្រសាទ': '🧠',
    
    // Neurosurgery & Brain Surgery
    'Neurosurgery': '⚡',
    'វះកាត់ខួរក្បាល': '⚡',
    
    // Pediatrics & Children
    'Pediatrics': '👶',
    'ជំងឺកុមារ': '👶',
    
    // OB-GYN & Women
    'OB-GYN': '👩',
    'ស្ត្រីធំ': '👩',
    
    // Urology & Urinary
    'Urology': '🚽',
    'ផ្លូវនោម': '🚽',
    
    // Nephrology & Kidney
    'Nephrology': '🥩',
    'តម្រងនោម': '🥩',
    
    // Emergency & Critical Care
    'Emergency': '🚨',
    'ភ្លាមៗ': '🚨',
    
    // ICU & Critical
    'ICU': '🏥',
    'ថែទាំធ្ងន់': '🏥',
    
    // Anesthesia & Pain
    'Anesthesia': '💤',
    'ដេកលក់': '💤',
    
    // ENT & Ear Nose Throat
    'ENT': '👂',
    'ត្រចៀកក': '👂',
    
    // Psychiatry & Mental
    'Psychiatry': '🧠',
    'ចិត្តវិទ្យា': '🧠',
    
    // Dentistry & Teeth
    'Dentistry': '🦷',
    'ធ្មេញ': '🦷',
    
    // Physiotherapy & Rehab
    'Physiotherapy': '💪',
    'រោគព្យាបាល': '💪',
  };
  
  return iconMap[departmentName] || '🏥';
};
const medicalDepartments = {
    en: [
      // Major Clinical Departments
      { name: 'Cardiology', href: '#cardiology', description: 'Heart Care' },
      { name: 'Gastroenterology', href: '#gastro', description: 'Digestive' },
      { name: 'Oncology', href: '/oncology', description: 'Cancer' },
      { name: 'Pulmonology', href: '#pulmonology', description: 'Lungs' },
      { name: 'Dermatology', href: '#dermatology', description: 'Skin' },
      { name: 'Ophthalmology', href: '/optamo', description: 'Eyes' },
      
      // Surgical Departments
      { name: 'Surgery', href: '#surgery', description: 'General' },
      { name: 'Orthopedics', href: '#orthopedics', description: 'Bones' },
      { name: 'Neurology', href: '#neurology', description: 'Brain' },
      { name: 'Neurosurgery', href: '#neurosurgery', description: 'Brain Surg' },
      
      // Specialized Medicine
      { name: 'Pediatrics', href: '#pediatrics', description: 'Children' },
      { name: 'OB-GYN', href: '#obgyn', description: "Women's" },
      { name: 'Urology', href: '#urology', description: 'Urinary' },
      { name: 'Nephrology', href: '#nephrology', description: 'Kidney' },
      
      // Emergency & Critical Care
      { name: 'Emergency', href: '#emergency-med', description: '24/7 Care' },
      { name: 'ICU', href: '#icu', description: 'Critical' },
      { name: 'Anesthesia', href: '#anesthesia', description: 'Pain' },
      
      // Additional Specialties
      { name: 'ENT', href: '#ent', description: 'Ear Nose' },
      { name: 'Psychiatry', href: '#psychiatry', description: 'Mental' },
      { name: 'Dentistry', href: '#dentistry', description: 'Teeth' },
      { name: 'Physiotherapy', href: '#physio', description: 'Rehab' },
    ],
    km: [
      // Major Clinical Departments
      { name: 'ជំងឺបេះដូង', href: '#cardiology', description: 'បេះដូង' },
      { name: 'ជំងឺក្រពះ', href: '#gastro', description: 'ក្រពះ' },
      { name: 'ជំងឺមហារីក', href: '/oncology', description: 'មហារីក' },
      { name: 'ជំងឺសួត', href: '#pulmonology', description: 'សួត' },
      { name: 'ជំងឺស្បែក', href: '#dermatology', description: 'ស្បែក' },
      { name: 'ជំងឺភ្នែក', href: '/optamo', description: 'ភ្នែក' },
      
      // Surgical Departments
      { name: 'ការវះកាត់', href: '#surgery', description: 'ទូទៅ' },
      { name: 'ឆ្អឹងជំនី', href: '#orthopedics', description: 'ឆ្អឹង' },
      { name: 'ប្រសាទ', href: '#neurology', description: 'ខួរក្បាល' },
      { name: 'វះកាត់ខួរក្បាល', href: '#neurosurgery', description: 'ខួរក្បាល' },
      
      // Specialized Medicine
      { name: 'ជំងឺកុមារ', href: '#pediatrics', description: 'កុមារ' },
      { name: 'ស្ត្រីធំ', href: '#obgyn', description: 'ស្ត្រី' },
      { name: 'ផ្លូវនោម', href: '#urology', description: 'នោម' },
      { name: 'តម្រងនោម', href: '#nephrology', description: 'តម្រង' },
      
      // Emergency & Critical Care
      { name: 'ភ្លាមៗ', href: '#emergency-med', description: '២៤/៧' },
      { name: 'ថែទាំធ្ងន់', href: '#icu', description: 'ធ្ងន់' },
      { name: 'ដេកលក់', href: '#anesthesia', description: 'ឈឺ' },
      
      // Additional Specialties
      { name: 'ត្រចៀកក', href: '#ent', description: 'ត្រចៀក' },
      { name: 'ចិត្តវិទ្យា', href: '#psychiatry', description: 'ចិត្ត' },
      { name: 'ធ្មេញ', href: '#dentistry', description: 'ធ្មេញ' },
      { name: 'រោគព្យាបាល', href: '#physio', description: 'ស្តារ' },
    ]
  };

   const handleDepartmentClick = (department) => {
    console.log('Navigating to:', department.href); // Debug log
    navigate(department.href);
  };

  return (
    <div className="pt-16">
      {
        // In your Home component
        <HeroSlideshow currentLanguage={currentLanguage} />
      }

      {/* Announcement Section */}
      <section id="Announcement" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {currentLanguage === 'en' ? 'Announcements' : 'សេចក្តីជូនដំណឹង'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentLanguage === 'en'
                ? 'Stay updated with our latest news and important information'
                : 'សូមតាមដានព័ត៌មានថ្មីៗ និងព័ត៌មានសំខាន់របស់យើងខ្ញុំ'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              {
                title: {
                  en: "New Clinic Opening",
                  km: "ការបើកដំណើរការគ្លីនិកថ្មី"
                },
                date: {
                  en: "December 15, 2024",
                  km: "ថ្ងៃទី ១៥ ខែធ្នូ ឆ្នាំ២០២៤"
                },
                description: {
                  en: "We are excited to announce the opening of our new branch in Phnom Penh city center.",
                  km: "យើងខ្ញុំរីករាយដឹងជូនដំណឹងថា យើងនឹងបើកដំណើរការសាខាថ្មីនៅក្នុងទីក្រុងភ្នំពេញ។"
                },
                image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                type: {
                  en: "News",
                  km: "ព័ត៌មាន",
                  color: "blue"
                }
              },
              {
                title: {
                  en: "Holiday Schedule",
                  km: "កាលវិភាគថ្ងៃឈប់សម្រាក"
                },
                date: {
                  en: "December 20-25, 2024",
                  km: "ថ្ងៃទី ២០ ដល់ ២៥ ខែធ្នូ ឆ្នាំ២០២៤"
                },
                description: {
                  en: "Please note our clinic will be closed during the Christmas holidays.",
                  km: "សូមជម្រាបជូនថា គ្លីនិករបស់យើងនឹងបិទក្នុងអំឡុងថ្ងៃឈប់សម្រាកណូអែល។"
                },
                image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                type: {
                  en: "Holiday",
                  km: "ថ្ងៃឈប់សម្រាក",
                  color: "orange"
                }
              },
              {
                title: {
                  en: "New Medical Equipment",
                  km: "បរិក្ខារវេជ្ជសាស្ត្រថ្មី"
                },
                date: {
                  en: "January 5, 2025",
                  km: "ថ្ងៃទី ០៥ ខែមករា ឆ្នាំ២០២៥"
                },
                description: {
                  en: "We have upgraded our medical equipment with the latest technology for better service.",
                  km: "យើងខ្ញុំបានធ្វើឱ្យប្រសើរឡើងនូវបរិក្ខារវេជ្ជសាស្ត្រដោយបច្ចេកវិទ្យាចុងក្រោយសម្រាប់សេវាកម្មដែលប្រសើរជាងមុន។"
                },
                image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                type: {
                  en: "Update",
                  km: "ការអាប់ដេត",
                  color: "green"
                }
              }
            ].map((announcement, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={announcement.image}
                  alt={announcement.title[currentLanguage]}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {announcement.title[currentLanguage]}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${announcement.type.color === 'blue'
                        ? 'bg-blue-100 text-blue-800'
                        : announcement.type.color === 'orange'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                      {announcement.type[currentLanguage]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {announcement.date[currentLanguage]}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {announcement.description[currentLanguage]}
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200">
                    {currentLanguage === 'en' ? 'Read More' : 'អានបន្ថែម'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
              {currentLanguage === 'en' ? 'View All Announcements' : 'មើលសេចក្តីជូនដំណឹងទាំងអស់'}
            </button>
          </div>
        </div>
      </section>
      <section id="home" class="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center relative overflow-hidden">

        <div class="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-70"></div>
        <div class="absolute bottom-0 left-0 w-1/4 h-1/4 bg-teal-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-60"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 2xl:py-32 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">

            <div class="text-center lg:text-left space-y-6 md:space-y-8">
              <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>{currentLanguage === 'en' ? 'Trusted Healthcare Since 1992' : 'សេវាកម្មសុខភាពដែលទុកចិត្តចាប់ពីឆ្នាំ ១៩៩២'}</span>
              </div>

              <h1 class="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                <span class="block">{currentLanguage === 'en' ? 'Your Health,' : 'សុខភាពរបស់អ្នក,'}</span>
                <span class="block mt-2 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  {currentLanguage === 'en' ? 'Our Commitment' : 'ការប្តេជ្ញាចិត្តរបស់យើង'}
                </span>
              </h1>

              <p class="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {currentLanguage === 'en'
                  ? 'Experience healthcare reimagined with cutting-edge technology, compassionate professionals, and personalized treatment plans designed for your wellbeing.'
                  : 'ស្វែងយល់ពីសេវាថែទាំសុខភាពដែលបានកែលម្អឡើងវិញជាមួយនឹងបច្ចេកវិទ្យាទំនើប គ្រូពេទ្យដែលមានការយកចិត្តទុកដាក់ និងផែនការព្យាបាលដែលបម្រុងទុកសម្រាប់សុខភាពល្អរបស់អ្នក។'
                }
              </p>

              <div class="flex flex-col xs:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-4">
                <button class="group bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <span>{currentLanguage === 'en' ? 'Emergency Care' : 'ការថែទាំភ្លាមៗ'}</span>
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
                <button class="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  <span>{currentLanguage === 'en' ? 'Book Appointment' : 'ការណាត់ជួប'}</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>

              <div class="pt-6 flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8">
                <div class="flex items-center gap-3">
                  <div class="bg-blue-100 p-2 rounded-full">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 text-lg">50+</p>
                    <p class="text-sm text-gray-600">{currentLanguage === 'en' ? 'Specialists' : 'គ្រូពេទ្យឯកទេស'}</p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div class="bg-green-100 p-2 rounded-full">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 text-lg">100K+</p>
                    <p class="text-sm text-gray-600">{currentLanguage === 'en' ? 'Patients Treated' : 'អ្នកជំងឺដែលបានព្យាបាល'}</p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div class="bg-purple-100 p-2 rounded-full">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 text-lg">35</p>
                    <p class="text-sm text-gray-600">{currentLanguage === 'en' ? 'Medical Centers' : 'មជ្ឈមណ្ឌលវេជ្ជសាស្ត្រ'}</p>
                  </div>
                </div>
              </div>
            </div>


            <div class="relative order-first lg:order-last">
              <div class="relative aspect-square md:aspect-video lg:aspect-square xl:aspect-video 2xl:aspect-auto 2xl:h-[600px]">
                <img
                  src="src/images/KSFH.jpg"
                  alt="Modern Hospital"
                  class="rounded-3xl shadow-2xl w-full h-full object-cover"
                />
                <div class="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>


              <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[300px] transform hover:scale-105 transition-transform duration-300">
                <div class="flex items-center space-x-4">
                  <div class="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-gray-900">24/7</p>
                    <p class="text-base text-gray-600">
                      {currentLanguage === 'en' ? 'Emergency Service' : 'សេវាកម្មភ្លាមៗ'}
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>


     {/* Services Section */}
<section id="services" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {currentLanguage === 'en' ? 'Our Medical Services' : 'សេវាកម្មវេជ្ជសាស្ត្ររបស់យើង'}
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto ">
        {currentLanguage === 'en' 
          ? "We offer comprehensive medical services with advanced technology and experienced healthcare professionals."
          : "យើងផ្តល់នូវសេវាកម្មវេជ្ជសាស្ត្រពេញលេញជាមួយនឹងបច្ចេកវិទ្យាទំនើប និងគ្រូពេទ្យដែលមានបទពិសោធន៍។"
        }
      </p>
    </div>
    
    {/* Combined Services Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8 ">
      {medicalServices[currentLanguage].map((service, index) => (
        <div
          key={index}
          className={`
            bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl 
            transition-all duration-500 ease-out transform cursor-pointer
            ${index >= 4 && !showAll 
              ? 'opacity-0 scale-95 h-0 overflow-hidden -mt-6 -mb-6' 
              : 'opacity-100 scale-100 h-auto'
            }
            hover:-translate-y-1
          `}
          style={{
            transitionDelay: index >= 4 ? `${(index - 4) * 50}ms` : '0ms'
          }}
        >
          <div className="text-3xl mb-4 transform transition-transform duration-300 hover:scale-110 ">
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
              ? (currentLanguage === 'en' ? 'Show Less' : 'បង្ហាញតិចជាងនេះ')
              : (currentLanguage === 'en' ? 'Show More' : 'បង្ហាញបន្ថែម')
            }
          </span>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    )}
  </div>
</section>


{/* Departments Section */}
<section id="departments" className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {currentLanguage === 'en' ? 'Medical Departments' : 'នាយកដ្ឋានវេជ្ជសាស្ត្រ'}
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        {currentLanguage === 'en' 
          ? "Specialized medical departments with expert doctors and modern facilities."
          : "នាយកដ្ឋានវេជ្ជសាស្ត្រឯកទេសជាមួយគ្រូពេទ្យជំនាញ និងបរិក្ខារទំនើប។"
        }
      </p>
    </div>

    {/* Departments Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-6">
      {medicalDepartments[currentLanguage].slice(0, 12).map((department, index) => (
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
            <span>{currentLanguage === 'en' ? 'Click to explore' : 'ចុចដើម្បីមើល'}</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>
      ))}
      
      {/* Additional departments that appear on show more */}
      {showAllDepartments && medicalDepartments[currentLanguage].slice(4).map((department, index) => (
        <motion.div
          key={index + 4}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
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
            <span>{currentLanguage === 'en' ? 'Click to explore' : 'ចុចដើម្បីមើល'}</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Show More/Less Button */}
    {medicalDepartments[currentLanguage].length > 4 && (
      <div className="text-center mt-6">
        <motion.button
          onClick={() => setShowAllDepartments(!showAllDepartments)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
        >
          <span>
            {showAllDepartments 
              ? (currentLanguage === 'en' ? 'Show Less' : 'បង្ហាញតិចជាងនេះ')
              : (currentLanguage === 'en' ? 'Show More Departments' : 'បង្ហាញនាយកដ្ឋានបន្ថែម')
            }
          </span>
          <motion.svg 
            animate={{ rotate: showAllDepartments ? 180 : 0 }}
            className="w-4 h-4"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      </div>
    )}
  </div>
</section>



      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                We're here to help you with all your healthcare needs. Contact
                us for appointments, inquiries, or emergency services.
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
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-300">
                      123 Medical Center, Phnom Penh, Cambodia
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
                    <p className="font-semibold">Emergency</p>
                    <p className="text-gray-300">(023) 456-7890</p>
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
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">info@medicalcenter.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
