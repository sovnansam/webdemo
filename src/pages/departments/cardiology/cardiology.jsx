import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import CardiologyHero from "./cardiology_hero";
import CardiologyService from "./cardiology_service";
import CardiologyDoctors from "./cardiology_doctor";



// ==========================================
// 1. UTILITIES
// ==========================================

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


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(r => setTimeout(r, 600)); 
        const res = await fetch(API_URL);
        const json = await res.json();
        const data = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
        setBlogs(data.map((b, i) => ({ ...b, uniqueId: i })));
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

  // If a blog is expanded, show only the expanded section
  if (expandedCardIndex !== null) {
    const expandedBlog = blogs[expandedCardIndex];
    return (
      <ExpandedBlogSection 
        blog={expandedBlog}
        currentLanguage={currentLanguage}
        utils={utils}
        onClose={handleCloseExpanded}
        onImageClick={setFullImage}
      />
    );
  }

  // Normal grid view
  return (
<>

 <CardiologyHero currentLanguage={currentLanguage}/>
  <CardiologyService currentLanguage={currentLanguage}/>
  <CardiologyDoctors currentLanguage={currentLanguage} />
  
       </>
  );
};

export default Cardiology;