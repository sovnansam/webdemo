import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import CardiologyHero from "./cardiology_hero";
import CardiologyService from "./cardiology_service";
import Footer from "../../../components/footer";

// Define API_URL here or import it from a config file
const API_URL = "/api/cardiology/blogs"; // Assuming a default API endpoint

// ==========================================
// 1. UTILITIES (Keeping your original utilities)
// ==========================================
// ... (Your utility functions remain here: getImageUrl, getYouTubeEmbedUrl, getCategoryData) ...
const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === "null" || imagePath === "undefined") {
    return "https://placehold.co/800x600/f3f4f6/9ca3af?text=No+Image";
  }
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath.substring(1);
  return `API/departments/cardiology/${imagePath}`;
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const getCategoryData = (sectionType) => {
  const key = sectionType?.toLowerCase();
  const baseStyle = "px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase";
  const categories = {
    blog: { label: { en: "Blog", km: "ប្លុក" }, style: "bg-blue-50 text-blue-600 border border-blue-100" },
    article: { label: { en: "Article", km: "អត្ថបទ" }, style: "bg-violet-50 text-violet-600 border border-violet-100" },
    news: { label: { en: "News", km: "ព័ត៌មាន" }, style: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
    technology: { label: { en: "Tech", km: "បច្ចេកវិទ្យា" }, style: "bg-sky-50 text-sky-600 border border-sky-100" },
    default: { label: { en: "Content", km: "មាតិកា" }, style: "bg-gray-50 text-gray-600 border border-gray-100" }
  };
  const data = categories[key] || categories.default;
  return { ...data, className: `${baseStyle} ${data.style}` };
};


// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

// Font utility function
const getFontClass = (language) => {
  return language === 'km'
    ? 'font-battambang khmer-font'
    : 'font-battambang english-font';
};

/**
 * Ultra Modern Scroll to Top Button Component
 * Features: Compact size, gradient background, strong shadow, and an interactive lift/shimmer effect.
 */
const ScrollToTopButton = ({ isVisible }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling effect
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-8 right-8 z-40  
                w-10 h-10 p-0 rounded-full     /* Compact size, back to circle */
                text-white 
                
                /* Gradient & Shadow */
                bg-gradient-to-br from-blue-500 to-indigo-600 
                shadow-xl shadow-blue-500/60
                
                /* Transition and Visibility */
                transition-all duration-300 transform 
                ${isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4 invisible'} 
                
                /* Hover Effects (Lift and Shimmer) */
                hover:scale-110 hover:shadow-2xl hover:shadow-blue-600/70
                focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
            `}
            aria-label="Scroll to top"
        >
            {/* The Arrow Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mx-auto" /* Slightly smaller arrow for compact button */
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5} /* Thicker stroke for more presence */
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    );
};

// ==========================================
// 5. MAIN PAGE COMPONENT
// ==========================================

const Cardiology = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("km");
  
  // New state for the ScrollToTopButton visibility
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(r => setTimeout(r, 600));
        // ... API fetching logic ...
        setBlogs([]); 
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Load language preference
    const savedLanguage = localStorage.getItem("preferredLanguage") || 'km';
    setCurrentLanguage(savedLanguage);
    applyLanguageStyles(savedLanguage);
    
    // --- SCROLL BUTTON LOGIC START ---
    const toggleVisibility = () => {
        // Show button if page Y offset is greater than 300px
        if (window.scrollY > 300) { 
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
    // --- SCROLL BUTTON LOGIC END ---

  }, []);

  // Apply language-specific styles
  const applyLanguageStyles = (language) => {
    document.documentElement.classList.remove('language-en', 'language-km');
    document.documentElement.classList.add(`language-${language}`);

    if (language === 'km') {
      document.body.style.fontFamily = "'Battambang', 'Khmer OS', system-ui, sans-serif";
      document.body.style.unicodeBidi = 'plaintext';
    } else {
      document.body.style.fontFamily = "system-ui, -apple-system, sans-serif";
      document.body.style.unicodeBidi = '';
    }
  };

  const handleLanguageChange = (lang) => {
    // Save to localStorage
    localStorage.setItem("preferredLanguage", lang);
    // Update state
    setCurrentLanguage(lang);
    // Apply styles
    applyLanguageStyles(lang);
  };

  const handleExpand = useCallback((index) => {
    setExpandedCardIndex(index);
    document.body.style.overflow = "auto";
  }, []);

  const handleCloseExpanded = useCallback(() => {
    setExpandedCardIndex(null);
    // Scroll to top when returning to grid view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fontClass = getFontClass(currentLanguage);

  // Expanded Blog view logic...
  if (expandedCardIndex !== null) {
     return <div className="p-8 text-center">Expanded view is not fully implemented in this file. <button onClick={handleCloseExpanded}>Go Back</button></div>
  }

  // Normal grid view
  return (
    <>
      <CardiologyHero currentLanguage={currentLanguage} />
      <CardiologyService currentLanguage={currentLanguage} />

      <Footer currentLanguage={currentLanguage}/>
      {/* Scroll to Top Button added here */}
      <ScrollToTopButton isVisible={isVisible} />
    </>
  );
};

export default Cardiology;