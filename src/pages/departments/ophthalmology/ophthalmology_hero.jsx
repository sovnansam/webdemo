import React, { useState, useEffect, useRef } from "react";
import { Activity } from "lucide-react";

const API_URL = "API/departments/optamology/optamology_hero.php";

// ==========================================
// 1. UTILITIES
// ==========================================

const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    return "https://placehold.co/800x600/1a1a1a/333333?text=Ophthalmology+Image";
  }
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath.substring(1);
  return `API/departments/optamology/${imagePath}`;
};

const getFontClass = (language) => {
  return language === "km"
    ? "font-battambang khmer-font"
    : "font-battambang english-font";
};

// ==========================================
// 2. COMPACT IMAGE SLIDESHOW COMPONENT
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
      gallery: "Ophthalmology Gallery",
    },
    km: {
      loading: "កំពុងទាញយករូបភាព...",
      error: "កំហុសក្នុងការទាញយកវិចិត្រសាល",
      retry: "ព្យាយាមម្តងទៀត",
      noContent: "គ្មានរូបភាពទេ",
      gallery: "វិចិត្រសាលជំងឺភ្នែក",
    },
  };

  const langContent = content[currentLanguage] || content.en;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        const data = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json)
          ? json
          : [];
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
    .filter((blog) => blog.image_path && blog.image_path !== "null")
    .slice(0, 4); // Limit to 4 slides for compact display

  // Start/Stop slideshow
  useEffect(() => {
    if (isPlaying && slides.length > 1) {
      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
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
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
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
      className="relative h-full bg-black rounded-3xl overflow-hidden shadow-2xl group"
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
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Image with Ken Burns Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={imageUrl}
                  alt={
                    currentLanguage === "en"
                      ? slide.title_en || slide.title
                      : slide.title || slide.title_en
                  }
                  className={`w-full h-full object-cover transition-transform duration-[15000ms] ease-linear ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Slide Info Overlay */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-500 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <h4
                    className={`text-sm font-bold text-white mb-1 ${fontClass}`}
                  >
                    {currentLanguage === "en"
                      ? slide.title_en || slide.title
                      : slide.title || slide.title_en}
                  </h4>
                  <p
                    className={`text-xs text-white/80 line-clamp-2 ${fontClass}`}
                  >
                    {currentLanguage === "en"
                      ? slide.subTitle_en || slide.subTitle
                      : slide.subTitle || slide.subTitle_en}
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
                ? "w-8 bg-red-500"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div
        className={`absolute inset-0 flex items-center justify-between p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={handlePrev}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label="Previous slide"
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
              d="M15 19l-7-7 7-7"
            />
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
              d="M9 5l7 7-7 7"
            />
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
// 3. OPERATING HOURS COMPONENT (Compact)
// ==========================================

const OperatingHours = ({ currentLanguage }) => {
  const fontClass = getFontClass(currentLanguage);

  const content = {
    en: {
      quickStart: "Operating Hours",
      schedule: {
        opd: {
          label: "OPD",
          days: "Monday - Friday",
          hours: "7:35 AM - 5:00 PM",
        },
        ipd: { label: "IPD", days: "24h / 7 Days" },
        therapy: {label: "Therapy", days: "Monday - Friday",
          hours: "7:35 AM - 5:00 PM",},
        contact: { label: "Contact:", number: " + (855) 76 800 5808" },
      },
    },
    km: {
      quickStart: "ពេលវេលាធ្វើការ",
      schedule: {
        opd: {
          label: "OPD",
          days: "ថ្ងៃច័ន្ទ - ថ្ងៃសុក្រ",
          hours: "៧:៣៥ ព្រឹក - ៥:០០ ល្ងាច",
        },
        ipd: { label: "IPD", days: "២៤ម៉ោង / ៧ថ្ងៃ" },
       therapy: {
          label: "ការព្យាបាលដោយកាំរស្មី",
          days: "ថ្ងៃច័ន្ទ - ថ្ងៃសុក្រ",
          hours: "៧:៣៥ ព្រឹក - ៥:០០ ល្ងាច",
        },
        contact: { label: "ទំនាក់ទំនង៖", number: " +(៨៥៥) ៧៦​ ៨០០ ៥៨០៨" },
      },
    },
  };

  const langContent = content[currentLanguage] || content.en;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-6 border border-gray-200 shadow-xl h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h3
          className={`text-xl md:text-lg font-bold text-gray-900 ${fontClass}`}
        >
          {langContent.quickStart}
        </h3>
        <div className="w-10 h-10 -mt-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-4 flex-grow">
        {[
          {
            ...langContent.schedule.opd,
            icon: "🏥",
            color: "from-blue-500 to-blue-600",
          },
          {
            ...langContent.schedule.ipd,
            icon: "🛏️",
            color: "from-green-500 to-green-600",
          },
          {
            ...langContent.schedule.therapy,
            icon: "🚨",
            color: "from-red-500 to-red-600",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}
              >
                <span className="text-lg">{item.icon}</span>
              </div>
              <div>
                <div className={`font-semibold text-gray-900 ${fontClass}`}>
                  {item.label}
                </div>
                <div className={`text-sm text-gray-600 ${fontClass}`}>
                  {item.days}
                </div>
                {/* Hours moved here, under days */}
                {item.hours && (
                  <div
                    className={`text-xs font-medium text-gray-700 mt-1 ${fontClass}`}
                  >
                    {item.hours}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Contact Info - Compact */}
        <div className="pt-4 border-t border-gray-300/50 mt-4">
          <div className={`font-semibold text-sm text-gray-900 ${fontClass}`}>
            {langContent.schedule.contact.label}
          </div>
        </div>
        <div className="mt-2 text-sm font-medium text-gray-800">
          {langContent.schedule.contact.number}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN OPHTHALMOLOGY HERO COMPONENT (NEW LAYOUT)
// ==========================================

const OphthalmologyHero = ({ currentLanguage, onLanguageChange }) => {
  const fontClass = getFontClass(currentLanguage);

  // Language-specific content for the hero section
  const heroContent = {
    en: {
      title: "Department Of ",
      titleHighlight: "Ophthalmology",
      description:
        "Our Ophthalmology Department is dedicated to providing comprehensive eye care with a patient-centered approach. We specialize in diagnosing and treating eye conditions, utilizing advanced medical technologies and evidence-based therapies.",
    },
    km: {
      title: "ផ្នែក",
      titleHighlight: "ជំងឺភ្នែក",
      description:
        "នាយកដ្ឋានជំងឺភ្នែករបស់យើងប្ដេជ្ញាផ្ដល់ការថែទាំភ្នែកដ៏ទូលំទូលាយជាមួយនឹងវិធីសាស្រ្តផ្តោតលើអ្នកជំងឺ។ យើងមានជំនាញក្នុងការធ្វើរោគវិនិច្ឆ័យ និងព្យាបាលជំងឺភ្នែក ដោយប្រើប្រាស់បច្ចេកវិទ្យាវេជ្ជសាស្ត្រទំនើប និងការព្យាបាលដែលមានមូលដ្ឋានលើភស្តុតាង។",
    },
  };

  const langContent = heroContent[currentLanguage] || heroContent.en;

  return (
    <div className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Main Content Section */}
      <div className="relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-50 to-transparent rounded-full blur-3xl"></div>

        {/* Main Content Layout with max-width 7xl */}
        <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 xl:py-24">
          {/* TOP SECTION - FULL WIDTH DESCRIPTION TEXT */}
          <div className="mb-16">
            {/* Department Title with Badge */}
            <div className="space-y-6 mb-12">
              <div className="inline-flex items-center gap-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <span
                  className={`text-sm font-semibold tracking-wider uppercase text-blue-600 ${fontClass}`}
                >
                  {currentLanguage === "en"
                    ? "Specialized Center"
                    : "មជ្ឈមណ្ឌលឯកទេស"}
                </span>
              </div>

              <h1
                className={`text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight ${fontClass}`}
              >
                {langContent.title}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    {langContent.titleHighlight}
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-red-100 blur-sm rounded-full"></span>
                </span>
              </h1>

              <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-blue-600 rounded-full"></div>
            </div>

            {/* Full Width Description Text */}
            <div className="space-y-8">
              <div className="relative">
                <span className="absolute left-3">•</span>
                <p
                  className={`text-md lg:text-lg md:text-lg text-gray-700 leading-relaxed ${fontClass} pl-8`}
                >
                  {langContent.description}
                </p>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION - IMAGE & OPERATING HOURS IN SAME ROW WITH DIFFERENT SIZES */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* LARGER IMAGE SLIDESHOW - Takes 3 columns */}
            <div className="lg:col-span-3">
              <div className="relative h-[200px] lg:h-[500px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl">
                <div className="absolute -inset-4 bg-gradient-to-br from-red-100 via-transparent to-blue-100 rounded-3xl blur-xl"></div>
                <div className="relative h-full">
                  <CompactImageSlideshow currentLanguage={currentLanguage} />
                </div>
              </div>
            </div>

            {/* SMALLER OPERATING HOURS - Takes 1 column */}
            <div className="lg:col-span-1">
              <div className="h-full">
                <OperatingHours currentLanguage={currentLanguage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OphthalmologyHero;
