import React, { useState, useEffect, useRef } from "react";

const API_URL = "API/departments/cardiology/cardiology_hero.php";

// ==========================================
// 1. UTILITIES
// ==========================================

const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    return "https://placehold.co/800x600/1a1a1a/333333?text=Cardiology+Image";
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
// 2. COMPACT IMAGE SLIDESHOW COMPONENT (Right Side)
// ==========================================

const CompactImageSlideshow = ({ currentLanguage }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const slideIntervalRef = useRef(null);
  const containerRef = useRef(null);

  const slideDuration = 5000; // 5 seconds per slide

  const fontClass = getFontClass(currentLanguage);

  // Language-specific content
  const content = {
    en: {
      loading: "Loading images...",
      error: "Error loading gallery",
      retry: "Retry",
      noContent: "No images available",
      gallery: "Cardiology Gallery"
    },
    km: {
      loading: "កំពុងទាញយករូបភាព...",
      error: "កំហុសក្នុងការទាញយកវិចិត្រសាល",
      retry: "ព្យាយាមម្តងទៀត",
      noContent: "គ្មានរូបភាពទេ",
      gallery: "វិចិត្រសាលបេះដូង"
    }
  };

  const langContent = content[currentLanguage] || content.en;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        const data = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
        setBlogs(data.map((b, i) => ({ ...b, uniqueId: i })));
      } catch (e) {
        console.error("Fetch error:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter blogs with valid images
  const slides = blogs
    .filter(blog => blog.image_path && blog.image_path !== "null")
    .slice(0, 4); // Limit to 4 slides for compact display

  // Start/Stop slideshow
  useEffect(() => {
    if (isPlaying && slides.length > 1) {
      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, slideDuration);
    } else {
      clearInterval(slideIntervalRef.current);
    }

    return () => {
      clearInterval(slideIntervalRef.current);
    };
  }, [isPlaying, slides.length]);

  const handleNext = () => {
    clearInterval(slideIntervalRef.current);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    clearInterval(slideIntervalRef.current);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(true);
  };

  const handleSlideSelect = (index) => {
    clearInterval(slideIntervalRef.current);
    setCurrentSlide(index);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (loading) {
    return (
      <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-3 border-transparent border-t-red-500 rounded-full animate-spin mb-4"></div>
          <p className={`text-gray-300 ${fontClass}`}>{langContent.loading}</p>
        </div>
      </div>
    );
  }

  if (error || slides.length === 0) {
    return (
      <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className={`text-lg font-bold text-white mb-2 ${fontClass}`}>
            {error ? langContent.error : langContent.noContent}
          </h3>
          {error && (
            <button 
              onClick={() => window.location.reload()}
              className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors mt-2 ${fontClass}`}
            >
              {langContent.retry}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="-mt-40 relative h-full bg-black rounded-3xl overflow-hidden shadow-2xl group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Main Slideshow */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const imageUrl = getImageUrl(slide.image_path);
          const isActive = index === currentSlide;
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Image with Ken Burns Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={imageUrl}
                  alt={currentLanguage === "en" ? slide.title_en || slide.title : slide.title || slide.title_en}
                  className={`w-full h-full object-cover transition-transform duration-[15000ms] ease-linear ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              {/* Slide Info Overlay */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-500 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <h4 className={`text-sm font-bold text-white mb-1 ${fontClass}`}>
                    {currentLanguage === "en" ? slide.title_en || slide.title : slide.title || slide.title_en}
                  </h4>
                  <p className={`text-xs text-white/80 line-clamp-2 ${fontClass}`}>
                    {currentLanguage === "en" ? slide.subTitle_en || slide.subTitle : slide.subTitle || slide.subTitle_en}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideSelect(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-8 bg-red-500' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className={`absolute inset-0 flex items-center justify-between p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <button
          onClick={handlePrev}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={handlePlayPause}
          className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="3" height="12" rx="1" />
              <rect x="15" y="6" width="3" height="12" rx="1" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        
        <button
          onClick={handleNext}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Gallery Label */}
      <div className="absolute top-4 right-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className={`text-xs font-medium text-white ${fontClass}`}>
            {langContent.gallery}
          </span>
        </div>
      </div>

      {/* Current Slide Indicator */}
      <div className="absolute top-4 left-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="text-xs font-mono text-white">
            {currentSlide + 1}/{slides.length}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN CARDIOLOGY HERO COMPONENT (Text Left, Image Right)
// ==========================================

const CardiologyHero = ({ currentLanguage, onLanguageChange }) => {
  const fontClass = getFontClass(currentLanguage);
  
  // Language-specific content for the hero section
  const heroContent = {
    en: {
      title: "Department",
      titleHighlight: "Cardiology",
      description: "Welcome to the Cardiovascular and Geriatric Center of Khmer-Soviet Friendship Hospital. Our center is divided into two parts: the Geriatric Center, which was established on August 6, 2015, and the Cardiovascular Center, which was launched on October 18, 2018.  We have many specialized physicians and nurses with many years of working experience that graduated from prestigious institutions abroad, including in France, Korea, Thailand, Indonesia, Taiwan, China, and Vietnam, and also have received professional training in providing effective, efficient, and high-quality patient care. No less than 15 cardiovascular and geriatric physicians seeing patients daily. All laboratory and diagnostic procedures are available to serve these patients.",
      description2: "We are committed to providing comprehensive cardiovascular care with a strong emphasis on both primary prevention and management of cardiovascular critical conditions such as: coronary artery disease, peripheral artery disease, cardiac arrhythmia, heart failure, valvular heart disease, primary hypertension and its complication…etc.",
      description3: "Our goal is to help patient, especially those at high risk for cardiovascular diseases to reduce risk factors, manage their health, and prevent the onset of further complications. We are dedicated to supporting our patients' long-term health and well-being, offering continuous care throughout their health journey",
      quickStart: "Operating Hours",
      schedule: {
        opd: { label: "OPD", days: "Monday - Friday", hours: "7:35 AM - 5:00 PM" },
        ipd: { label: "IPD", days: "24h / 7 Days" },
        emergency: { label: "Emergency", days: "24h / 7 Days" },
        contact: { label: "Contact:", number: " +(855) 76 800 5808" }
      },
      features: {
        advancedTech: "Advanced Technology",
        expertTeam: "Expert Medical Team",
        patientCentered: "Patient-Centered Approach",
        research: "Research & Innovation"
      },
      emergency: "Emergency Services Available 24/7",
      emergencyNumber: "Call 119 for immediate assistance"
    },
    km: {
      title: "ផ្នែក",
      titleHighlight: "បេះដូង",
      description: "សូមស្វាគមន៍មកកាន់មជ្ឈមណ្ឌលបេះដូងនិងមជ្ឈមណ្ឌលវ័យចំណាស់ នៃមន្ទីរពេទ្យមិត្តភាពខ្មែរ-សូវៀត។ មជ្ឈមណ្ឌលរបស់យើងត្រូវបានបែងចែកជាពីរផ្នែក គឺ មជ្ឈមណ្ឌលវ័យចំណាស់ ដែលត្រូវបានបង្កើតឡើងនៅថ្ងៃទី ៦ ខែសីហា ឆ្នាំ ២០១៥ និងមជ្ឈមណ្ឌលបេះដូង ដែលបានចាប់ផ្តើមនៅថ្ងៃទី ១៨ ខែតុលា ឆ្នាំ ២០១៨។ យើងមានគ្រូពេទ្យនិងបុគ្គលិកសុខាភិបាលជាច្រើនដែលមានបទពិសោធន៍ការងារជាច្រើនឆ្នាំ ដែលបានបញ្ចប់ការសិក្សាពីស្ថាប័នឯកទេសនៅបរទេស រួមមាន ប្រទេសបារាំង កូរ៉េ ថៃ ឥណ្ឌូនេស៊ី តៃវ៉ាន់ ចិន និងវៀតណាម ហើយក៏បានទទួលការបណ្តុះបណ្តាលវិជ្ជាជីវៈក្នុងការផ្តល់ការថែទាំអ្នកជំងឺដែលមានប្រសិទ្ធភាព ប្រសិទ្ធភាព និងគុណភាពខ្ពស់។ មានគ្រូពេទ្យបេះដូងនិងវ័យចំណាស់មិនតិចជាង ១៥ នាក់ ដែលពិនិត្យអ្នកជំងឺប្រចាំថ្ងៃ។ រួមទាំងនឹងមាននូវនីតិវិធីពិសោធន៍ និងវិនិច្ឆ័យទាំងអស់ ដើម្បីបម្រើអ្នកជំងឺទាំងនេះ។",
      description2: "ពួកយើងខិតខំផ្តល់ការថែទាំបេះដូងយ៉ាងទូលំទូលាយ ដោយផ្តោតសំខាន់លើការពារជាមុន និងការគ្រប់គ្រងស្ថានភាពបេះដូងវឹកវរ ដូចជា៖ ជំងឺសរសៃឈាមកូរ៉ូណារី ជំងឺសរសៃឈាមប៉េរីហ្វេរី ការរំខានចលនាបេះដូង បេះដូងបរាជ័យ ជំងឺស្លាប់បេះដូង សម្ពាធឈាមលើ និងស្មុគស្មាញរបស់វា...។",
      description3: "គោលបំណងរបស់យើងគឺជួយអ្នកជំងឺ ជាពិសេសអ្នកដែលមានហានិភ័យខ្ពស់សម្រាប់ជំងឺបេះដូង ដើម្បីកាត់បន្ថយហានិភ័យ គ្រប់គ្រងសុខភាពរបស់ពួកគេ និងទប់ស្កាត់ការកើតមាននៃស្មុគស្មាញបន្ថែមទៀត។ យើងបានឧទ្ទិសខ្លួនក្នុងការគាំទ្រសុខភាព និងសុភមង្គលរយៈពេលវែងរបស់អ្នកជំងឺរបស់យើង ដោយផ្តល់ការថែទាំបន្តរយៈពេលពួកគេនៅក្នុងដំណើរការសុខភាពរបស់ពួកគេ។",
      quickStart: "ពេលវេលាធ្វើការ",
      schedule: {
        opd: { label: "OPD", days: "ថ្ងៃច័ន្ទ - ថ្ងៃសុក្រ", hours: "៧:៣៥ ព្រឹក - ៥:០០ ល្ងាច" },
        ipd: { label: "IPD", days: "២៤ម៉ោង / ៧ថ្ងៃ" },
        emergency: { label: "សេវាអាសន្ន", days: "២៤ម៉ោង / ៧ថ្ងៃ" },
        contact: { label: "ទំនាក់ទំនង៖", number: " +(៨៥៥) ៧៦ ៨០០ ៥៨០៨" }
      },
      features: {
        advancedTech: "បច្ចេកវិទ្យាទាន់សម័យ",
        expertTeam: "ក្រុមគ្រូពេទ្យជំនាញ",
        patientCentered: "ផ្តោតលើសេវ៉ាកម្ម និងការព្យាបាល",
        research: "ការស្រាវជ្រាវ និងការច្នៃប្រឌិត"
      },
      emergency: "សេវាអាសន្នមាន២៤ម៉ោង",
      emergencyNumber: "ទូរស័ព្ទ១១៩សម្រាប់ជំនួយបន្ទាន់"
    }
  };

  const langContent = heroContent[currentLanguage] || heroContent.en;

  return (
    <div className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Main Content Section */}
      <div className="relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-50 to-transparent rounded-full blur-3xl"></div>
        
        {/* Main Grid Layout */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 xl:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN - TEXT CONTENT */}
            <div className="space-y-8">
              {/* Department Title with Badge */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full"></div>
                  </div>
                  <span className={`text-sm font-semibold tracking-wider uppercase text-red-600 ${fontClass}`}>
                    {currentLanguage === 'en' ? 'Specialized Center' : 'មជ្ឈមណ្ឌលឯកទេស'}
                  </span>
                </div>
                
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight ${fontClass}`}>
                  {langContent.title}{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                      {langContent.titleHighlight}
                    </span>
                    <span className="absolute -bottom-2 left-0 w-full h-2 bg-red-100 blur-sm rounded-full"></span>
                  </span>
                </h1>
                
                <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className={`text-lg text-gray-700 leading-relaxed ${fontClass}`}>
                    {langContent.description}
                  </p>
                  <p className={`text-lg text-gray-700 leading-relaxed ${fontClass}`}>
                    {langContent.description2}
                  </p>
                  <p className={`text-lg text-gray-700 leading-relaxed ${fontClass}`}>
                    {langContent.description3}
                  </p>
                </div>
                
                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { 
                      title: langContent.features.advancedTech,
                      icon: "⚡",
                      color: "from-blue-500 to-blue-600",
                      bg: "from-blue-50 to-blue-100"
                    },
                    { 
                      title: langContent.features.expertTeam,
                      icon: "👨‍⚕️",
                      color: "from-emerald-500 to-emerald-600",
                      bg: "from-emerald-50 to-emerald-100"
                    },
                    { 
                      title: langContent.features.patientCentered,
                      icon: "❤️",
                      color: "from-red-500 to-red-600",
                      bg: "from-red-50 to-red-100"
                    },
                    { 
                      title: langContent.features.research,
                      icon: "🔬",
                      color: "from-purple-500 to-purple-600",
                      bg: "from-purple-50 to-purple-100"
                    }
                  ].map((feature, idx) => (
                    <div 
                      key={idx} 
                      className={`group relative bg-gradient-to-br ${feature.bg} rounded-2xl p-4 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-md`}>
                          <span className="text-white text-lg">{feature.icon}</span>
                        </div>
                        <span className={`text-sm font-semibold text-gray-800 flex-1 ${fontClass}`}>
                          {feature.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operating Hours */}
              <div className="pt-6">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold text-gray-900 ${fontClass}`}>
                      {langContent.quickStart}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { ...langContent.schedule.opd, icon: "🏥" },
                      { ...langContent.schedule.ipd, icon: "🛏️" },
                      { ...langContent.schedule.emergency, icon: "🚨" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <div className={`font-semibold text-gray-900 ${fontClass}`}>{item.label}</div>
                            <div className={`text-sm text-gray-600 ${fontClass}`}>{item.days}</div>
                          </div>
                        </div>
                        {item.hours && (
                          <div className={`text-sm font-medium text-gray-700 ${fontClass}`}>{item.hours}</div>
                        )}
                      </div>
                    ))}
                    
                    {/* Contact Info */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className={`font-semibold text-gray-900 ${fontClass}`}>
                          {langContent.schedule.contact.label}
                        </div>
                        <a 
                          href={`tel:${langContent.schedule.contact.number.replace(/\D/g, '')}`}
                          className={`text-lg font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent hover:from-red-700 hover:to-red-800 transition-all ${fontClass}`}
                        >
                          {langContent.schedule.contact.number}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - IMAGE SLIDESHOW */}
            <div className="relative h-[500px] lg:h-[600px]">
              {/* Decorative Background Element */}
              <div className="absolute -inset-4 bg-gradient-to-br from-red-100 via-transparent to-blue-100 rounded-3xl blur-xl"></div>
              
              {/* Main Slideshow Container */}
              <div className="relative h-full">
                <CompactImageSlideshow currentLanguage={currentLanguage} />
              </div>
              
              {/* Emergency Notice Overlay */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-20 w-5/6">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">🚨</span>
                      </div>
                      <div>
                        <p className={`text-sm font-bold text-white ${fontClass}`}>
                          {langContent.emergency}
                        </p>
                        <p className={`text-xs text-white/90 ${fontClass}`}>
                          {langContent.emergencyNumber}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
};

export default CardiologyHero;