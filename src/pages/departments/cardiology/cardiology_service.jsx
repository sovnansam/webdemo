import React, { useState, useEffect } from "react";

const API_URL = "API/departments/cardiology/cardiology_service.php";

// ==========================================
// 1. UTILITIES
// ==========================================

const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    return "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath.substring(1);
  return `API/departments/cardiology/${imagePath}`;
};

const getFontClass = (language) => {
  return language === 'km' 
    ? 'font-battambang khmer-font'
    : 'font-battambang english-font';
};

// ==========================================
// 2. LOADING SKELETON COMPONENT
// ==========================================

const LoadingSkeleton = ({ currentLanguage }) => {
  const fontClass = getFontClass(currentLanguage);
  
  return (
    <div className="py-8 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="inline-block mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse mx-auto"></div>
          </div>
          
          <div className="h-10 md:h-12 bg-gray-200 rounded-lg w-3/4 md:w-1/2 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-full md:w-3/4 mx-auto mb-8 animate-pulse"></div>
          
          {/* Stats Skeleton */}
          <div className="flex justify-center gap-6 md:gap-8 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="h-8 md:h-10 bg-gray-200 rounded-lg w-16 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-20 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Skeleton */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className="h-12 w-24 md:w-32 bg-gray-200 rounded-full animate-pulse"
            ></div>
          ))}
        </div>

        {/* Service Cards Skeleton */}
        <div className="space-y-8 md:space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 p-4 md:p-6">
                {/* Content Side */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-32 animate-pulse"></div>
                  </div>
                  
                  <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-4 animate-pulse"></div>
                  <div className="space-y-3 mb-6">
                    <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-4/6 animate-pulse"></div>
                  </div>
                  
                  {/* Quick Info Skeleton */}
                  <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Buttons Skeleton */}
                  <div className="flex gap-3 md:gap-4">
                    <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                    <div className="h-12 bg-gray-200 rounded-lg w-36 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Image Side */}
                <div className="lg:col-span-5 relative">
                  <div className="h-48 md:h-64 lg:h-full bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. SERVICE DETAIL MODAL COMPONENT (Responsive)
// ==========================================

const ServiceModal = ({ service, isOpen, onClose, currentLanguage }) => {
  const fontClass = getFontClass(currentLanguage);
  
  if (!isOpen || !service) return null;

  const content = {
    en: {
      close: "Close",
      serviceDetails: "Service Details",
      equipment: "Equipment Used",
      duration: "Duration",
      recovery: "Recovery Time",
      specialists: "Cardiology Specialists",
      contact: "Contact Us",
      bookNow: "Book Appointment",
      description: "Description"
    },
    km: {
      close: "បិទ",
      serviceDetails: "ព័ត៌មានលម្អិតសេវាកម្ម",
      equipment: "ឧបករណ៍ប្រើប្រាស់",
      duration: "រយៈពេល",
      recovery: "ពេលវេលាស្បែកឡើងវិញ",
      specialists: "អ្នកជំនាញខាងបេះដូង",
      contact: "ទំនាក់ទំនង",
      bookNow: "កក់ទុកណាត់",
      description: "ការពិពណ៌នា"
    }
  };

  const langContent = content[currentLanguage] || content.en;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div className="min-h-screen px-4 py-4 md:px-6 text-center">
        <div className="inline-block w-full max-w-6xl my-8 text-left align-middle transition-all transform">
          {/* Modal Content */}
          <div className="relative bg-white shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden">
            {/* Modal Header */}
            <div className="relative p-4 md:p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
              <div className="flex items-center justify-between">
                <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold pr-10 ${fontClass}`}>
                  {service[currentLanguage === 'en' ? 'title_en' : 'title'] || service.title || langContent.serviceDetails}
                </h3>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors active:scale-95"
                  aria-label={langContent.close}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Left Column - Details */}
                <div className="space-y-4 md:space-y-6">
                  <h4 className={`text-lg md:text-xl font-bold text-gray-800 ${fontClass}`}>
                    {langContent.serviceDetails}
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className={`font-semibold text-gray-700 mb-2 ${fontClass}`}>
                        {langContent.description}
                      </h5>
                      <p className={`text-gray-600 leading-relaxed ${fontClass}`}>
                        {service[currentLanguage === 'en' ? 'description_en' : 'description'] || 
                         service.description || 
                         "Detailed description of the cardiology service will appear here."}
                      </p>
                    </div>

                    {service.equipment && (
                      <div>
                        <h5 className={`font-semibold text-gray-700 mb-2 ${fontClass}`}>
                          {langContent.equipment}
                        </h5>
                        <p className={`text-gray-600 ${fontClass}`}>
                          {service.equipment}
                        </p>
                      </div>
                    )}

                    {service.specialists && (
                      <div>
                        <h5 className={`font-semibold text-gray-700 mb-2 ${fontClass}`}>
                          {langContent.specialists}
                        </h5>
                        <p className={`text-gray-600 ${fontClass}`}>
                          {service.specialists}
                        </p>
                      </div>
                    )}

                    {/* Quick Info Cards - Responsive Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-3 md:gap-4 pt-4">
                      <div className="bg-red-50 p-3 md:p-4 rounded-lg border border-red-100">
                        <div className="text-xs md:text-sm text-red-600 font-semibold mb-1">{langContent.duration}</div>
                        <div className={`text-base md:text-lg font-bold ${fontClass}`}>
                          {service.duration || "30-60 mins"}
                        </div>
                      </div>
                      <div className="bg-red-50 p-3 md:p-4 rounded-lg border border-red-100">
                        <div className="text-xs md:text-sm text-red-600 font-semibold mb-1">{langContent.recovery}</div>
                        <div className={`text-base md:text-lg font-bold ${fontClass}`}>
                          {service.recovery_time || "Immediate"}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Responsive Stack */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-6">
                      <button className={`flex-1 px-4 md:px-6 py-3 md:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 active:scale-95 transition-all ${fontClass}`}>
                        {langContent.bookNow}
                      </button>
                      <button className={`px-4 md:px-6 py-3 md:py-3 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 active:scale-95 transition-all ${fontClass}`}>
                        {langContent.contact}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Image */}
                <div className="relative">
                  <div className="rounded-xl overflow-hidden shadow-lg h-64 md:h-80 lg:h-full">
                    <img
                      src={getImageUrl(service.image_path)}
                      alt={service[currentLanguage === 'en' ? 'title_en' : 'title'] || service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-xl flex items-center justify-center">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. SERVICE CARD COMPONENT (Fully Responsive)
// ==========================================

const ServiceCard = ({ service, onClick, currentLanguage, index }) => {
  const fontClass = getFontClass(currentLanguage);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const title = service[currentLanguage === 'en' ? 'title_en' : 'title'] || service.title;
  const description = service[currentLanguage === 'en' ? 'description_en' : 'description'] || service.subTitle;
  const imageUrl = getImageUrl(service.image_path);

  const content = {
    en: {
      readMore: "Learn More",
      duration: "Duration:",
      contactSpecialist: "Contact Specialist"
    },
    km: {
      readMore: "ស្វែងយល់បន្ថែម",
      duration: "រយៈពេល:",
      contactSpecialist: "ទំនាក់ទំនងអ្នកជំនាញ"
    }
  };

  const langContent = content[currentLanguage] || content.en;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 p-4 md:p-6">
        {/* Left Side - Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* Index Badge - Responsive */}
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm md:text-base">
              {index + 1}
            </div>
            
            {/* Category */}
            {service.category && (
              <span className="px-3 py-1.5 bg-red-100 text-red-600 text-xs md:text-sm font-semibold rounded-full">
                {service.category}
              </span>
            )}
          </div>

          {/* Title - Responsive Typography */}
          <h3 className={`text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4 ${fontClass}`}>
            {title}
          </h3>
          
          {/* Description with Read More for Mobile */}
          <div className="relative mb-4 md:mb-6">
            <p className={`text-sm md:text-base text-gray-600 leading-relaxed ${fontClass} line-clamp-3 md:line-clamp-none`}>
              {description || "Comprehensive cardiology service description will appear here."}
            </p>
          </div>

          {/* Quick Info - Responsive Layout */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`text-xs md:text-sm font-medium ${fontClass}`}>
                {langContent.duration} {service.duration || "30-60 mins"}
              </span>
            </div>
            
            {service.specialists && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className={`text-xs md:text-sm font-medium truncate max-w-[150px] md:max-w-none ${fontClass}`}>
                  {service.specialists.split(',')[0]}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons - Responsive Layout */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              onClick={() => onClick(service)}
              className={`px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-95 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base ${fontClass}`}
            >
              {langContent.readMore}
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <button className={`px-4 md:px-6 py-2.5 md:py-3 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 active:scale-95 transition-all text-sm md:text-base ${fontClass}`}>
              {langContent.contactSpecialist}
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="lg:col-span-5 relative order-first lg:order-last">
          <div className="rounded-xl overflow-hidden shadow-lg h-48 md:h-64 lg:h-full aspect-video lg:aspect-auto">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
            )}
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Floating Icon - Responsive Positioning */}
          <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-white rounded-full shadow-xl flex items-center justify-center">
            <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. MAIN CARDIOLOGY SERVICES COMPONENT
// ==========================================

const CardiologyService = ({ currentLanguage, onLanguageChange }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const fontClass = getFontClass(currentLanguage);

  const content = {
    en: {
      title: "Cardiology Services & Treatments",
      subtitle: "Comprehensive heart care with advanced diagnostics, interventional procedures, and preventive cardiology",
      all: "All Services",
      diagnosis: "Diagnostics",
      treatment: "Treatments",
      surgery: "Cardiac Surgery",
      prevention: "Prevention",
      procedures: "Procedures",
      noServices: "No cardiology services available",
      error: "Failed to load cardiology services",
      retry: "Try Again",
      servicesFound: "cardiology services found",
      loading: "Loading cardiology services...",
      ctaTitle: "Expert Cardiac Care",
      ctaDescription: "Our team of cardiologists and cardiac surgeons provide comprehensive heart care with state-of-the-art technology",
      ctaButton: "Schedule Heart Consultation",
      totalServices: "Total Services",
      specialties: "Specialties",
      servicesFoundCount: "Services Found"
    },
    km: {
      title: "សេវាកម្ម និងការព្យាបាលខាងបេះដូង",
      subtitle: "ការថែទាំបេះដូងទូលំទូលាយជាមួយការធ្វើរោគវិនិច្ឆ័យទាន់សម័យ វិធីសាស្រ្តអន្តរាគមន៍ និងវិទ្យាសាស្ត្របេះដូងការពារ",
      all: "សេវាកម្មទាំងអស់",
      diagnosis: "រោគវិនិច្ឆ័យ",
      treatment: "ការព្យាបាល",
      surgery: "វះកាត់បេះដូង",
      prevention: "ការពារ",
      procedures: "វិធីសាស្រ្ត",
      noServices: "គ្មានសេវាកម្មបេះដូងទេ",
      error: "មិនអាចទាញយកសេវាកម្មបេះដូងបាន",
      retry: "ព្យាយាមម្តងទៀត",
      servicesFound: "សេវាកម្មបេះដូងត្រូវបានរកឃើញ",
      loading: "កំពុងទាញយកសេវាកម្មបេះដូង...",
      ctaTitle: "ការថែទាំបេះដូងដោយអ្នកជំនាញ",
      ctaDescription: "ក្រុមអ្នកឯកទេសបេះដូង និងវេជ្ជបណ្ឌិតវះកាត់បេះដូងរបស់យើងផ្តល់ការថែទាំបេះដូងទូលំទូលាយជាមួយបច្ចេកវិទ្យាទំនើបបំផុត",
      ctaButton: "កក់ណាត់ពិគ្រោះយោបល់បេះដូង",
      totalServices: "សេវាកម្មសរុប",
      specialties: "ឯកទេស",
      servicesFoundCount: "បានរកឃើញ"
    }
  };

  const langContent = content[currentLanguage] || content.en;


  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const servicesData = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
        setServices(servicesData);
        setError(null);
      } catch (err) {
        console.error("Error fetching cardiology services:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = filter === "all" 
    ? services 
    : services.filter(service => service.category === filter);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return <LoadingSkeleton currentLanguage={currentLanguage} />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
        <div className="text-center bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className={`text-xl font-bold text-gray-800 mb-2 ${fontClass}`}>
            {langContent.error}
          </h3>
          <p className={`text-gray-600 mb-6 ${fontClass}`}>
            Unable to load cardiology services. Please check your connection.
          </p>
          <button
            onClick={() => window.location.reload()}
            className={`px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-95 text-white font-semibold rounded-lg transition-all ${fontClass}`}
          >
            {langContent.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header Section - Responsive */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="inline-block mb-4 md:mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          
          {/* Responsive Typography */}
          <h1 className={`text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 md:mb-4 ${fontClass}`}>
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              {langContent.title}
            </span>
          </h1>
          <p className={`text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-6 md:mb-8 px-4 ${fontClass}`}>
            {langContent.subTitle}
          </p>
          
       
        </div>

  
        {/* Services List - Responsive Grid */}
        <div className="space-y-6 md:space-y-8 lg:space-y-12">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <ServiceCard
                key={service.id || index}
                service={service}
                onClick={handleServiceClick}
                currentLanguage={currentLanguage}
                index={index}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className={`text-lg md:text-xl font-bold text-gray-800 mb-2 ${fontClass}`}>
                {langContent.noServices}
              </h3>
              <p className={`text-gray-600 text-sm md:text-base ${fontClass}`}>
                {filter === "all" 
                  ? "Cardiology services will be available soon." 
                  : `No ${filter} services found.`}
              </p>
            </div>
          )}
        </div>

        {/* CTA Section - Responsive */}
        {services.length > 0 && (
          <div className="mt-12 md:mt-16 lg:mt-20">
            <div className="bg-gradient-to-r from-red-50 via-white to-red-50 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 border border-red-100 shadow-lg">
              <div className="inline-block w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-xl">
                <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4 ${fontClass}`}>
                {langContent.ctaTitle}
              </h3>
              <p className={`text-gray-600 mb-6 md:mb-8 text-sm md:text-base lg:text-lg max-w-2xl mx-auto ${fontClass}`}>
                {langContent.ctaDescription}
              </p>
              <button className={`px-6 md:px-8 lg:px-10 py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-95 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all text-sm md:text-base ${fontClass}`}>
                {langContent.ctaButton}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default CardiologyService;