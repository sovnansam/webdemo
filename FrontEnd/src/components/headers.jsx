// src/components/Header.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('km')
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage')
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'km' : 'en'
    setCurrentLanguage(newLanguage)
    localStorage.setItem('preferredLanguage', newLanguage)
  }

  const handleLogoClick = () => {
    navigate('/')
    setIsMenuOpen(false)
    // Scroll to top when clicking logo
    window.scrollTo(0, 0)
  }

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      // Handle anchor links
      if (location.pathname !== '/') {
        // If we're not on home page, navigate to home first
        navigate('/')
        // Wait for navigation then scroll to section
        setTimeout(() => {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        // We're already on home page, just scroll
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      // Handle regular page navigation
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
        { name: 'Blog', href: '/blog' },
        { name: 'Announcement', href: '#Announcement' },
        { name: 'Contact', href: '#contact' },
      ],
      servicesLabel: 'Services',
      departmentsLabel: 'Departments',
      emergency: '(123) 456-7890',
      bookAppointment: 'Book Now',
      medicalServicesTitle: 'SERVICES',
      departmentsTitle: 'DEPARTMENTS'
    },
    km: {
      navItems: [
        { name: 'ទំព័រដើម', href: '/' },
        { name: 'អំពីយើង', href: '/about' },
        { name: 'ប្លុក', href: '/blog' },
        { name: 'សេចក្តីជូនដំណឹង', href: '#Announcement' },
        { name: 'ទំនាក់ទំនង', href: '#contact' },
      ],
      servicesLabel: 'សេវាកម្ម',
      departmentsLabel: 'ផ្នែក',
      emergency: '(១២៣) ៤៥៦-៧៨៩០',
      bookAppointment: 'ការណាត់ជួប',
      medicalServicesTitle: 'សេវាកម្ម',
      departmentsTitle: 'ផ្នែកវេជ្ជសាស្ត្រ'
    }
  }

  // Medical Services (Diagnostic & Testing)
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

  // Medical Departments (Clinical Specialties)
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
  }

  const t = translations[currentLanguage]

  return (
    <header className={`
      fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'}
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
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`font-medium transition-colors duration-200 cursor-pointer text-sm xl:text-base ${
                  location.pathname === item.href 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Departments Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('departments')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center cursor-pointer text-sm xl:text-base">
                {t.departmentsLabel}
                <svg className="w-3 h-3 md:w-4 md:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute top-full left-0 mt-2 w-80 lg:w-96 bg-white rounded-lg shadow-lg border transition-all duration-300 ${
                activeDropdown === 'departments' ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                <div className="p-3 lg:p-4">
                  <h3 className="text-sm lg:text-base font-semibold text-gray-800 mb-2 lg:mb-3">{t.departmentsTitle}</h3>
                  <div className="grid grid-cols-2 gap-2 lg:gap-3 max-h-80 lg:max-h-96 overflow-y-auto">
                    {medicalDepartments[currentLanguage].map((dept) => (
                      <button
                        key={dept.name}
                        onClick={() => handleNavClick(dept.href)}
                        className="block p-2 lg:p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 border border-transparent hover:border-blue-100 cursor-pointer text-left w-full"
                      >
                        <div className="font-medium text-gray-800 text-xs lg:text-sm">{dept.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{dept.description}</div>
                      </button>
                    ))}
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
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center cursor-pointer text-sm xl:text-base">
                {t.servicesLabel}
                <svg className="w-3 h-3 md:w-4 md:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute top-full left-0 mt-2 w-56 lg:w-64 bg-white rounded-lg shadow-lg border transition-all duration-300 ${
                activeDropdown === 'services' ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                <div className="p-3">
                  <h3 className="text-sm lg:text-base font-semibold text-gray-800 mb-2">{t.medicalServicesTitle}</h3>
                  <div className="space-y-1">
                    {medicalServices[currentLanguage].map((service) => (
                      <button
                        key={service.name}
                        onClick={() => handleNavClick(service.href)}
                        className="block px-2 lg:px-3 py-1.5 lg:py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-200 text-xs lg:text-sm cursor-pointer text-left w-full"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 ml-2 lg:ml-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-2 lg:px-3 py-1.5 lg:py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 border border-gray-300 rounded-lg hover:border-blue-600 cursor-pointer text-sm"
              >
                <span className={`${currentLanguage === 'km' ? 'font-bold text-blue-600' : ''}`}>
                  ខ្មែរ
                </span>
                <span className="text-gray-300">|</span>
                <span className={`${currentLanguage === 'en' ? 'font-bold text-blue-600' : ''}`}>
                  EN
                </span>
              </button>
            </div>
          </nav>

          {/* CTA Buttons - Desktop */}
   {/* CTA Buttons - Desktop */}
{/* Desktop & iPad Call Icon */}
<div className="hidden md:flex items-center space-x-3 lg:space-x-4 self-center">
  <a href="tel:+1234567890" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 text-sm lg:text-base">
    <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-1.5 lg:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
    <span className="hidden md:inline">{t.emergency}</span>
  </a>
</div>



          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2 py-1 text-gray-700 border border-gray-300 rounded-md text-xs cursor-pointer"
            >
              <span className={currentLanguage === 'km' ? 'font-bold text-blue-600' : ''}>ខ្មែរ</span>
              <span className="text-gray-300">|</span>
              <span className={currentLanguage === 'en' ? 'font-bold text-blue-600' : ''}>EN</span>
            </button>

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
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen pb-4' : 'max-h-0'}`}>
          <nav className="flex flex-col space-y-3">
            {t.navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`font-medium py-2 transition-colors duration-200 text-left cursor-pointer text-sm ${
                  location.pathname === item.href 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Departments in Mobile */}
            <div className="border-t pt-3">
              <h3 className="text-gray-500 text-xs font-semibold mb-2">{t.departmentsTitle}</h3>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {medicalDepartments[currentLanguage].slice(0, 21).map((dept) => (
                  <button
                    key={dept.name}
                    onClick={() => handleNavClick(dept.href)}
                    className="text-gray-700 hover:text-blue-600 text-xs p-2 border border-gray-200 rounded-lg transition-colors duration-200 text-left cursor-pointer"
                  >
                    <div className="font-medium">{dept.name}</div>
                    <div className="text-gray-500 mt-0.5">{dept.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Medical Services in Mobile */}
            <div className="border-t pt-3">
              <h3 className="text-gray-500 text-xs font-semibold mb-2">{t.medicalServicesTitle}</h3>
              <div className="grid grid-cols-2 gap-1">
                {medicalServices[currentLanguage].map((service) => (
                  <button
                    key={service.name}
                    onClick={() => handleNavClick(service.href)}
                    className="text-gray-700 hover:text-blue-600 text-xs py-1.5 transition-colors duration-200 text-left cursor-pointer"
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-3 space-y-2">
      <a href="tel:+1234567890" className="flex items-center text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200 text-sm">
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