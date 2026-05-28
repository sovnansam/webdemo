import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Footer from "../../../components/footer";
import ScrollToTopButton from "../../../contexts/scrollTop";
import { useLocation } from "react-router-dom";
import MriHero from "./MriHero";
import MriService from "./Mri_Service";
import MriSection1 from "./MriSection1";

// Font utility function
const getFontClass = (language) => {
  return language === 'km'
    ? 'font-battambang khmer-font'
    : 'font-battambang english-font';
};

const MriPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("km");
  
  
  const [isVisible, setIsVisible] = useState(false);
  
  const location = useLocation(); 

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
    
    localStorage.setItem("preferredLanguage", lang);
  
    setCurrentLanguage(lang);

    applyLanguageStyles(lang);
  };

  useEffect(() => {
   
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);


    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(r => setTimeout(r, 600));
     
        setBlogs([]); 
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();


    const savedLanguage = localStorage.getItem("preferredLanguage") || 'km';
    setCurrentLanguage(savedLanguage);
    applyLanguageStyles(savedLanguage);

    
    return () => {
      
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [location.pathname]); 

  const fontClass = getFontClass(currentLanguage);

  return (
    <>
    <MriHero currentLanguage={currentLanguage}/>
    <MriService currentLanguage={currentLanguage}/>
      <Footer currentLanguage={currentLanguage}/>
   
      <ScrollToTopButton isVisible={isVisible} />
    </>
  );
};

export default MriPage;