import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ObgyHero from "./obgy_hero";
import ObgyService from "./obgy_service";
import ObgySection1 from "./ObgySection1";
import ObgySection2 from "./ObgySection2";
import ObgySection3 from "./ObgySection3";
import ObgySection4 from "./ObgySection4";
import ObgySection5 from "./ObgySection5";
import ObgySection6 from "./ObgySection6";
import ObgySection7 from "./ObgySection7";
import ObgySection8 from "./ObgySection8";
import ObgySection9 from "./ObgySection9";
import ObgySection10 from "./ObgySection10";
import Footer from "../../../components/footer";
import ScrollToTopButton from "../../../contexts/scrollTop"

const getFontClass = (language) => {
  return language === 'km'
    ? 'font-battambang khmer-font'
    : 'font-battambang english-font';
};



// ==========================================
// 5. MAIN PAGE COMPONENT
// ==========================================

const Obgy = () => {
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
      <ObgyHero currentLanguage={currentLanguage} />
      <ObgyService currentLanguage={currentLanguage} />

      <Footer currentLanguage={currentLanguage}/>
      {/* Scroll to Top Button added here */}
      <ScrollToTopButton isVisible={isVisible} />
    </>
  );
};

export default Obgy;