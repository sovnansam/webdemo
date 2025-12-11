import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitch from './LanguageSwitch/LanguageSwitch'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Use language context
  const { currentLanguage, isKhmer, isEnglish, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      // If we're already on home page, reload to top
      window.scrollTo(0, 0)
      window.location.reload()
    } else {
      // Navigate to home and scroll to top
      navigate('/')
      window.scrollTo(0, 0)
    }
    setIsMenuOpen(false)
  }

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      // If we're already on home page, reload to top
      window.scrollTo(0, 0)
      window.location.reload()
    } else {
      // Navigate to home and scroll to top
      navigate('/')
      window.scrollTo(0, 0)
    }
    setIsMenuOpen(false)
  }

  const handleNavClick = (href) => {
    if (href === '/') {
      handleHomeClick()
      return
    }
    
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      navigate(href)
    }
    setIsMenuOpen(false)
  }

  // Translation content
  const translations = {
    en: {
      navItems: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { 
          name: 'News & Events', 
          href: '#',
          dropdown: [
            { name: 'Blog', href: '/blog' },
            { name: 'Announcement', href: '/announcement' },
            { name: 'Event', href: '/activity' }
          ]
        },
        { name: 'Contact', href: '/contact' },
      ],
      servicesLabel: 'Services',
      departmentsLabel: 'Departments',
      emergency: '(+855)95 998 953',
      bookAppointment: 'Book Now',
      medicalServicesTitle: 'MEDICAL SERVICES',
      departmentsTitle: 'MEDICAL DEPARTMENTS',
      viewAll: 'View All Departments',
      clinicalDepartments: 'Clinical Departments',
      surgicalDepartments: 'Surgical Departments',
      specializedCare: 'Specialized Care',
      diagnosticServices: 'Diagnostic Services',
      newsEventsLabel: 'News & Events'
    },
    km: {
      navItems: [
        { name: 'ទំព័រដើម', href: '/' },
        { name: 'អំពីយើង', href: '/about' },
        { 
          name: 'ព័ត៌មាន & សកម្មភាព', 
          href: '#',
          dropdown: [
            { name: 'ប្លុក', href: '/blog' },
            { name: 'សេចក្តីជូនដំណឹង', href: '/announcement' },
            { name: 'សកម្មភាព', href: '/activity' }
          ]
        },
        { name: 'ទំនាក់ទំនង', href: '/contact' },
      ],
      servicesLabel: 'សេវាកម្ម',
      departmentsLabel: 'ផ្នែក',
      emergency: '(+855)95 998 953',
      bookAppointment: 'ការណាត់ជួប',
      medicalServicesTitle: 'សេវាកម្មវេជ្ជសាស្ត្រ',
      departmentsTitle: 'ផ្នែកវេជ្ជសាស្ត្រ',
      viewAll: 'មើលផ្នែកទាំងអស់',
      clinicalDepartments: 'ផ្នែកវេជ្ជសាស្ត្រ',
      surgicalDepartments: 'ផ្នែកវះកាត់',
      specializedCare: 'ការថែទាំពិសេស',
      diagnosticServices: 'សេវាកម្មវិនិច្ឆ័យ',
      newsEventsLabel: 'ព័ត៌មាន & សកម្មភាព'
    }
  }

  // Organized Medical Departments with categories
  const medicalDepartments = {
    en: {
      clinical: [
        { name: 'Cardiology', href: '/cardiology', icon: '❤️' },
        { name: 'Gastroenterology', href: '#gastro', icon: '🩺'},
        { name: 'Pulmonology', href: '#pulmonology', icon: '🫁'},
        { name: 'Neurology', href: '#neurology', icon: '🧠' },
        { name: 'Dermatology', href: '#dermatology', icon: '🌟'},
        { name: 'Oncology', href: '/oncology', icon: '🎗️'}
      ],
      surgical: [
        { name: 'General Surgery', href: '#surgery', icon: '🔪'},
        { name: 'Orthopedics', href: '#orthopedics', icon: '🦴'},
        { name: 'Neurosurgery', href: '#neurosurgery', icon: '⚡'},
        { name: 'Cardiac Surgery', href: '#cardiac-surgery', icon: '💓'}
      ],
      specialized: [
        { name: 'Pediatrics', href: '#pediatrics', icon: '👶'},
        { name: 'OB-GYN', href: '#obgyn', icon: '🤰'},
        { name: 'Urology', href: '#urology', icon: '💧'},
        { name: 'ENT', href: '#ent', icon: '👂'},
        { name: 'Ophthalmology', href: '/optamo', icon: '👁️'},
        { name: 'Dentistry', href: '#dentistry', icon: '🦷'}
      ],
      emergency: [
        { name: 'Emergency Medicine', href: '#emergency-med', icon: '🚑'},
        { name: 'ICU', href: '#icu', icon: '🏥' },
        { name: 'Anesthesiology', href: '#anesthesia', icon: '💤'}
      ]
    },
    km: {
      clinical: [
        { name: 'ជំងឺបេះដូង', href: '/cardiology', icon: '❤️' },
        { name: 'ជំងឺក្រពះ', href: '#gastro', icon: '🩺' },
        { name: 'ជំងឺសួត', href: '#pulmonology', icon: '🫁' },
        { name: 'ប្រសាទ', href: '#neurology', icon: '🧠'},
        { name: 'ជំងឺស្បែក', href: '#dermatology', icon: '🌟'},
        { name: 'ជំងឺមហារីក', href: '/oncology', icon: '🎗️' }
      ],
      surgical: [
        { name: 'ការវះកាត់ទូទៅ', href: '#surgery', icon: '🔪' },
        { name: 'ឆ្អឹងជំនី', href: '#orthopedics', icon: '🦴'},
        { name: 'វះកាត់ខួរក្បាល', href: '#neurosurgery', icon: '⚡'},
        { name: 'វះកាត់បេះដូង', href: '#cardiac-surgery', icon: '💓'}
      ],
      specialized: [
        { name: 'ជំងឺកុមារ', href: '#pediatrics', icon: '👶'},
        { name: 'ស្ត្រីធំ', href: '#obgyn', icon: '🤰'},
        { name: 'ផ្លូវនោម', href: '#urology', icon: '💧'},
        { name: 'ត្រចៀកក', href: '#ent', icon: '👂' },
        { name: 'ជំងឺភ្នែក', href: '/optamo', icon: '👁️'},
        { name: 'ធ្មេញ', href: '#dentistry', icon: '🦷'}
      ],
      emergency: [
        { name: 'ភ្លាមៗ', href: '#emergency-med', icon: '🚑' },
        { name: 'ថែទាំធ្ងន់', href: '#icu', icon: '🏥'},
        { name: 'ដេកលក់', href: '#anesthesia', icon: '💤'}
      ]
    }
  }

  // Medical Services (unchanged)
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

  const t = translations[currentLanguage]

  // Font classes based on language
  const fontClasses = {
    nav: isKhmer ? 'font-[Battambang] font-normal' : 'font-sans font-medium',
    dropdown: isKhmer ? 'font-[Battambang] font-normal' : 'font-sans font-medium',
    heading: isKhmer ? 'font-[Battambang] font-normal' : 'font-sans font-medium',
    text: isKhmer ? 'font-[Battambang] font-normal' : 'font-sans font-medium'
  }

  return (
    <header className={`
      fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-lg' : 'bg-white shadow-sm'}
      ${isKhmer ? 'font-[Battambang]' : 'font-sans'}
    `}>
      <div className="max-w-9xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-40 md:w-48 lg:w-52 h-8 md:h-10 flex items-center">
              <button 
                onClick={handleLogoClick}
                className="cursor-pointer"
              >
                <img 
                  src='src/images/Logo.png' 
                  alt='Logo' 
                  className="w-32 md:w-36 lg:w-40 h-auto"
                />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            {t.navItems.map((item) => (
              item.dropdown ? (
                // News & Events Dropdown
                <div 
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown('news-events')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className={`transition-colors duration-200 flex items-center cursor-pointer text-sm xl:text-base ${fontClasses.nav} ${
                    location.pathname === item.href || 
                    (item.dropdown && item.dropdown.some(dropItem => location.pathname === dropItem.href))
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}>
                    {item.name}
                    <svg className={`w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform duration-200 ${activeDropdown === 'news-events' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* News & Events Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 ${
                    activeDropdown === 'news-events' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <div className="p-2">
                      <h3 className={`text-xs text-gray-500 mb-2 px-2 ${fontClasses.dropdown}`}>{t.newsEventsLabel}</h3>
                      <div className="space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <button
                            key={dropdownItem.name}
                            onClick={() => handleNavClick(dropdownItem.href)}
                            className={`flex items-center w-full px-3 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-200 cursor-pointer text-sm ${fontClasses.dropdown} ${
                              location.pathname === dropdownItem.href
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-700'
                            }`}
                          >
                            {dropdownItem.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Regular navigation items - Special handling for Home
                <button
                  key={item.name}
                  onClick={() => item.href === '/' ? handleHomeClick() : handleNavClick(item.href)}
                  className={`transition-colors duration-200 cursor-pointer text-sm xl:text-base ${fontClasses.nav} ${
                    location.pathname === item.href 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              )
            ))}
            
            {/* Departments Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('departments')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center cursor-pointer text-sm xl:text-base ${fontClasses.nav}`}>
                {t.departmentsLabel}
                <svg className={`w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform duration-200 ${activeDropdown === 'departments' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Enhanced Dropdown Menu */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-300 ${
                activeDropdown === 'departments' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-lg text-gray-900 ${fontClasses.heading}`}>{t.departmentsTitle}</h3>
                    <button 
                      onClick={() => handleNavClick('/departments')}
                      className={`text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200 cursor-pointer ${fontClasses.dropdown}`}
                    >
                      {t.viewAll} →
                    </button>
                  </div>

                  {/* Grid Layout with Categories */}
                  <div className="grid grid-cols-4 gap-6">
                    {/* Clinical Departments */}
                    <div>
                      <h4 className={`text-sm text-gray-700 mb-3 flex items-center ${fontClasses.dropdown}`}>
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {t.clinicalDepartments}
                      </h4>
                      <div className="space-y-2">
                        {medicalDepartments[currentLanguage].clinical.map((dept) => (
                          <button
                            key={dept.name}
                            onClick={() => handleNavClick(dept.href)}
                            className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100 cursor-pointer text-left w-full group"
                          >
                            <span className="text-lg mr-3">{dept.icon}</span>
                            <div>
                              <div className={`text-gray-800 text-sm group-hover:text-blue-600 ${fontClasses.dropdown}`}>{dept.name}</div>
                              <div className={`text-xs text-gray-500 mt-0.5 ${fontClasses.dropdown}`}>{dept.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Surgical Departments */}
                    <div>
                      <h4 className={`text-sm text-gray-700 mb-3 flex items-center ${fontClasses.dropdown}`}>
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {t.surgicalDepartments}
                      </h4>
                      <div className="space-y-2">
                        {medicalDepartments[currentLanguage].surgical.map((dept) => (
                          <button
                            key={dept.name}
                            onClick={() => handleNavClick(dept.href)}
                            className="flex items-center p-2 rounded-lg hover:bg-green-50 transition-all duration-200 border border-transparent hover:border-green-100 cursor-pointer text-left w-full group"
                          >
                            <span className="text-lg mr-3">{dept.icon}</span>
                            <div>
                              <div className={`text-gray-800 text-sm group-hover:text-green-600 ${fontClasses.dropdown}`}>{dept.name}</div>
                              <div className={`text-xs text-gray-500 mt-0.5 ${fontClasses.dropdown}`}>{dept.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Specialized Care */}
                    <div>
                      <h4 className={`text-sm text-gray-700 mb-3 flex items-center ${fontClasses.dropdown}`}>
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        {t.specializedCare}
                      </h4>
                      <div className="space-y-2">
                        {medicalDepartments[currentLanguage].specialized.map((dept) => (
                          <button
                            key={dept.name}
                            onClick={() => handleNavClick(dept.href)}
                            className="flex items-center p-2 rounded-lg hover:bg-purple-50 transition-all duration-200 border border-transparent hover:border-purple-100 cursor-pointer text-left w-full group"
                          >
                            <span className="text-lg mr-3">{dept.icon}</span>
                            <div>
                              <div className={`text-gray-800 text-sm group-hover:text-purple-600 ${fontClasses.dropdown}`}>{dept.name}</div>
                              <div className={`text-xs text-gray-500 mt-0.5 ${fontClasses.dropdown}`}>{dept.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Emergency & Critical Care */}
                    <div>
                      <h4 className={`text-sm text-gray-700 mb-3 flex items-center ${fontClasses.dropdown}`}>
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {t.diagnosticServices}
                      </h4>
                      <div className="space-y-2">
                        {medicalDepartments[currentLanguage].emergency.map((dept) => (
                          <button
                            key={dept.name}
                            onClick={() => handleNavClick(dept.href)}
                            className="flex items-center p-2 rounded-lg hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-100 cursor-pointer text-left w-full group"
                          >
                            <span className="text-lg mr-3">{dept.icon}</span>
                            <div>
                              <div className={`text-gray-800 text-sm group-hover:text-red-600 ${fontClasses.dropdown}`}>{dept.name}</div>
                              <div className={`text-xs text-gray-500 mt-0.5 ${fontClasses.dropdown}`}>{dept.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center cursor-pointer text-sm xl:text-base ${fontClasses.nav}`}>
                {t.servicesLabel}
                <svg className="w-3 h-3 md:w-4 md:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute top-full left-0 mt-2 w-56 lg:w-64 bg-white rounded-lg shadow-lg border transition-all duration-300 ${
                activeDropdown === 'services' ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                <div className="p-3">
                  <h3 className={`text-sm lg:text-base text-gray-800 mb-2 ${fontClasses.dropdown}`}>{t.medicalServicesTitle}</h3>
                  <div className="space-y-1">
                    {medicalServices[currentLanguage].map((service) => (
                      <button
                        key={service.name}
                        onClick={() => handleNavClick(service.href)}
                        className={`block px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-200 text-xs lg:text-sm cursor-pointer text-left w-full ${fontClasses.dropdown} ${
                          location.pathname === service.href
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700'
                        }`}
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Language Switcher - Using LanguageSwitch Component */}
            <div className="flex items-center ml-2 lg:ml-4">
              <LanguageSwitch variant="minimal" />
            </div>
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 self-center">
            <a href="tel:+85595998953" className={`flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base ${fontClasses.text}`}>
              <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-1.5 lg:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden md:inline">{t.emergency}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Language Switch - Using Component */}
            <LanguageSwitch variant="minimal" />

            <button
              className="flex flex-col w-8 h-8 md:w-10 md:h-10 justify-center items-center gap-1 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={`w-5 h-0.5 md:w-6 md:h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5 md:translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 md:w-6 md:h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-5 h-0.5 md:w-6 md:h-0.5 bg-gray-700 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5 md:-translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMenuOpen 
            ? 'max-h-[80vh] overflow-y-auto pb-4 border-t border-gray-200 mt-2' 
            : 'max-h-0 overflow-hidden'
        }`}>
          <nav className="flex flex-col space-y-4 pt-4">
            {t.navItems.map((item) => (
              item.dropdown ? (
                // Mobile News & Events Dropdown
                <div key={item.name} className="border-b pb-3">
                  <h3 className={`text-gray-700 mb-2 text-sm ${fontClasses.nav} ${
                    location.pathname === item.href || 
                    (item.dropdown && item.dropdown.some(dropItem => location.pathname === dropItem.href))
                      ? 'text-blue-600'
                      : ''
                  }`}>
                    {item.name}
                  </h3>
                  <div className="space-y-2 pl-3">
                    {item.dropdown.map((dropdownItem) => (
                      <button
                        key={dropdownItem.name}
                        onClick={() => handleNavClick(dropdownItem.href)}
                        className={`block w-full text-left hover:text-blue-600 py-1 transition-colors duration-200 cursor-pointer text-sm ${fontClasses.dropdown} ${
                          location.pathname === dropdownItem.href
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {dropdownItem.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // Regular mobile navigation items - Special handling for Home
                <button
                  key={item.name}
                  onClick={() => item.href === '/' ? handleHomeClick() : handleNavClick(item.href)}
                  className={`py-2 transition-colors duration-200 text-left cursor-pointer text-sm ${fontClasses.nav} ${
                    location.pathname === item.href 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              )
            ))}
            
            {/* Enhanced Mobile Departments */}
            <div className="border-t pt-4">
              <h3 className={`text-gray-700 text-sm mb-3 ${fontClasses.heading}`}>{t.departmentsTitle}</h3>
              
              {/* Clinical Departments */}
              <div className="mb-4">
                <h4 className={`text-xs text-gray-600 mb-2 ${fontClasses.dropdown}`}>{t.clinicalDepartments}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {medicalDepartments[currentLanguage].clinical.map((dept) => (
                    <button
                      key={dept.name}
                      onClick={() => handleNavClick(dept.href)}
                      className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-left cursor-pointer"
                    >
                      <span className="text-base mr-2">{dept.icon}</span>
                      <div>
                        <div className={`text-gray-800 text-xs ${fontClasses.dropdown}`}>{dept.name}</div>
                        <div className={`text-gray-500 text-xs ${fontClasses.dropdown}`}>{dept.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Surgical Departments */}
              <div className="mb-4">
                <h4 className={`text-xs text-gray-600 mb-2 ${fontClasses.dropdown}`}>{t.surgicalDepartments}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {medicalDepartments[currentLanguage].surgical.map((dept) => (
                    <button
                      key={dept.name}
                      onClick={() => handleNavClick(dept.href)}
                      className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-green-50 transition-colors duration-200 text-left cursor-pointer"
                    >
                      <span className="text-base mr-2">{dept.icon}</span>
                      <div>
                        <div className={`text-gray-800 text-xs ${fontClasses.dropdown}`}>{dept.name}</div>
                        <div className={`text-gray-500 text-xs ${fontClasses.dropdown}`}>{dept.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* View All Button */}
              <button 
                onClick={() => handleNavClick('/departments')}
                className={`w-full py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors duration-200 cursor-pointer text-sm ${fontClasses.dropdown}`}
              >
                {t.viewAll}
              </button>
            </div>

            {/* Medical Services in Mobile */}
            <div className="border-t pt-4">
              <h3 className={`text-gray-500 text-xs mb-2 ${fontClasses.dropdown}`}>{t.medicalServicesTitle}</h3>
              <div className="grid grid-cols-2 gap-1">
                {medicalServices[currentLanguage].map((service) => (
                  <button
                    key={service.name}
                    onClick={() => handleNavClick(service.href)}
                    className={`hover:text-blue-600 text-xs py-1.5 transition-colors duration-200 text-left cursor-pointer ${fontClasses.dropdown} ${
                      location.pathname === service.href
                        ? 'text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-3 space-y-2">
              <a href="tel:+85595998953" className={`flex items-center text-gray-700 hover:text-blue-600 py-2 transition-colors duration-200 text-sm ${fontClasses.text}`}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t.emergency}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header