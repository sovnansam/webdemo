import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import PulmologyHero from "./pulmology_hero";
import PulmologyService from "./pulmology_service";
import Footer from "../../../components/footer";
import ScrollToTopButton from "../../../contexts/scrollTop";
import { useLocation } from "react-router-dom";

// Font utility function
const getFontClass = (language) => {
  return language === 'km'
    ? 'font-battambang khmer-font'
    : 'font-battambang english-font';
};

const Pulmology = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("km");
  
  // New state for the ScrollToTopButton visibility
  const [isVisible, setIsVisible] = useState(false);
  
  const location = useLocation(); // Get current location

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

  useEffect(() => {
    // Define toggleVisibility for scroll-to-top button
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);

    // Fetch data
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

    // Cleanup function
    return () => {
      // Remove event listeners
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [location.pathname]); // Re-run when pathname changes

  const fontClass = getFontClass(currentLanguage);

  return (
    <>
      <PulmologyHero currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
      <PulmologyService currentLanguage={currentLanguage} />
      <Footer currentLanguage={currentLanguage}/>
      <ScrollToTopButton isVisible={isVisible} />
    </>
  );
};

export default Pulmology;
