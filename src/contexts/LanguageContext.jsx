// src/contexts/LanguageContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Initialize from localStorage or default to 'km'
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'km';
  });

  // Apply language-specific styles to entire document
  useEffect(() => {
    const updateDocumentFont = () => {
      const html = document.documentElement;
      const body = document.body;
      
      if (currentLanguage === 'km') {
        // Apply Khmer font globally
        html.classList.add('font-khmer');
        html.classList.remove('font-english');
        body.classList.add('font-khmer');
        body.classList.remove('font-english');
        
        // Set Khmer-specific CSS custom properties
        html.style.setProperty('--font-family', "'Battambang', 'Khmer OS', 'sans-serif'");
        html.style.setProperty('--font-weight', 'normal');
        html.style.setProperty('--letter-spacing', 'normal');
      } else {
        // Apply English font globally
        html.classList.add('font-english');
        html.classList.remove('font-khmer');
        body.classList.add('font-english');
        body.classList.remove('font-khmer');
        
        // Set English-specific CSS custom properties
        html.style.setProperty('--font-family', 'system-ui, -apple-system, sans-serif');
        html.style.setProperty('--font-weight', 'normal');
        html.style.setProperty('--letter-spacing', 'normal');
      }
    };

    updateDocumentFont();
    
    // Also update localStorage
    localStorage.setItem('preferredLanguage', currentLanguage);
    
    // Dispatch a custom event for components to listen to
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: currentLanguage } 
    }));

    return () => {
      // Cleanup
      const html = document.documentElement;
      html.style.removeProperty('--font-family');
      html.style.removeProperty('--font-weight');
      html.style.removeProperty('--letter-spacing');
    };
  }, [currentLanguage]);

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'preferredLanguage') {
        setCurrentLanguage(e.newValue || 'km');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'km' : 'en';
    setCurrentLanguage(newLang);
  };

  const setLanguage = (lang) => {
    if (['en', 'km'].includes(lang)) {
      setCurrentLanguage(lang);
    }
  };

  const value = {
    currentLanguage,
    toggleLanguage,
    setLanguage,
    isKhmer: currentLanguage === 'km',
    isEnglish: currentLanguage === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};